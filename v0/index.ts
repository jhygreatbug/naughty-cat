const PARAMETERS = {
  ballSpeed: 1000,
};

enum Item {
  wall = '#',
  ground = '.',
  space = 'x',
  goal = 'G',

  cat = 'C',
  ball = 'B',
}

// https://zh.wikipedia.org/zh-cn/%E6%96%B9%E6%A1%86%E7%BB%98%E5%88%B6%E5%AD%97%E7%AC%A6
enum PathCharacter {
  'p0000' = ' ',
  'p0011' = '╗',
  'p0101' = '═',
  'p0110' = '╔',
  'p1001' = '╝',
  'p1010' = '║',
  'p1100' = '╚',
}

const getPathCharacter = (code1: typeof moveCode[number], code2: typeof moveCode[number]) => {
  const flag = [0, 0, 0, 0];
  const index1 = moveCode.indexOf(code1);
  const index2 = moveCode.indexOf(code2);
  flag[index1] = 1;
  flag[index2] = 1;
  return PathCharacter['p' + flag.join('')];
}

type Coordinate = [number, number];
function coordEq(a: Coordinate, b: Coordinate) {
  return a[0] === b[0] && a[1] === b[1];
}

const moveCode = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'] as const;

const moveOffset = {
  ArrowUp: [-1, 0],
  ArrowDown: [1, 0],
  ArrowLeft: [0, -1],
  ArrowRight: [0, 1],
}

const revertMoveDirection = (code: typeof moveCode[number]) => {
  const index = moveCode.indexOf(code);
  const newIndex = (index + 2) % 4;
  return moveCode[newIndex];
}

// 地图
class GameMap {
  data: Item[][]
  width: number;
  height: number;
  length: number;
  constructor(params: {
    data: Item[][]
    width: number;
    height: number;
  }) {
    Object.assign(this, params);
  }
}

abstract class BaseItem {
  coord: Coordinate;
}

class Cat implements BaseItem {
  coord: Coordinate;
  constructor(params: {
    coord: Coordinate;
  }) {
    Object.assign(this, params);
  }
}

class Ball implements BaseItem {
  coord: Coordinate;
  constructor(params: {
    coord: Coordinate;
  }) {
    Object.assign(this, params);
  }
}

class Goal implements BaseItem {
  coord: Coordinate;
  constructor(params: {
    coord: Coordinate;
  }) {
    Object.assign(this, params);
  }
}

class PathSet {
  flag: boolean[][];
  length = 0;
  catPoint: Path;
  ballPoint: Path;

  constructor(params: { width: number; height: number }) {
    this.flag = Array.from({ length: params.height })
      .map(_ => Array.from({ length: params.width }).fill(false) as boolean[]);
  }

  has(coord: Coordinate) {
    return this.flag[coord[0]][coord[1]];
  }

  getData() {
    const path: Array<{ char: PathCharacter; coord: Coordinate}> = [];
    let head = this.catPoint;
    for (let i = 0; i < this.length; i ++) {
      const next = head.next;
      if (next === this.ballPoint) {
        break;
      }
      const char = getPathCharacter(next.prevCode, next.nextCode);
      const coord: Coordinate = [...next.coord];
      path.push({ char, coord });
      head = next;
    }
    return path;
  }

  moveCat(newCatCoord: Coordinate, code: typeof moveCode[number]) {
    this.flag[this.catPoint.coord[0]][this.catPoint.coord[1]] = true;

    const newCatPoint = new Path();
    newCatPoint.coord = [...newCatCoord];
    newCatPoint.next = this.catPoint;
    newCatPoint.nextCode = revertMoveDirection(code);
    this.catPoint.prev = newCatPoint;
    this.catPoint.prevCode = code;
    this.catPoint.char = getPathCharacter(this.catPoint.prevCode, this.catPoint.nextCode);
    this.catPoint = newCatPoint;

    this.length ++;
  }

  moveBall(newBallCoord: Coordinate, code: typeof moveCode[number]) {
    this.flag[this.ballPoint.coord[0]][this.ballPoint.coord[1]] = true;

    const newBallPoint = new Path();
    newBallPoint.coord = [...newBallCoord];
    newBallPoint.prev = this.ballPoint;
    newBallPoint.prevCode = revertMoveDirection(code);
    this.ballPoint.next = newBallPoint;
    this.ballPoint.nextCode = code;
    this.ballPoint.char = getPathCharacter(code, this.ballPoint.prevCode);
    this.ballPoint = newBallPoint;

    this.length ++;
  }
}

class Path {
  prev: Path | null;
  next: Path | null;
  char: PathCharacter;
  prevCode: typeof moveCode[number];
  nextCode: typeof moveCode[number];
  coord: Coordinate;
}

class Stage {
  map: GameMap;
  cat: Cat;
  ball: Ball;
  goal: Goal;
  path: PathSet;
  correct: boolean;
  private stop = false;
  private ballTimer: ReturnType<typeof setTimeout>;

  constructor(params: { map: string }) {
    const mapRows = params.map.trim().split('\n');
    const mapHeight = mapRows.length;
    const mapData = mapRows.map(row => row.trim().split(''));
    const mapWidth = mapData.reduce((prev, item) => Math.max(prev, item.length), 0);
    this.map = new GameMap({
      data: mapData as Item[][],
      width: mapWidth,
      height: mapHeight,
    })

    let correct = true;

    // 读取地图信息
    for (let x = 0, height = mapData.length; x < height; x ++) {
      for (let y = 0, width = mapData[x].length; y < width; y ++) {
        const item = mapData[x][y];
        const coord: Coordinate = [x, y];
        if (item === Item['cat']) {
          this.cat = new Cat({ coord });
        } else if (item === Item['ball']) {
          this.ball = new Ball({ coord });
        } else if (item === Item['goal']) {
          this.goal = new Goal({ coord });
        }
      }
    }

    // 初始化路径
    this.path = new PathSet({ width: this.map.width, height: this.map.height });
    this.path.ballPoint = new Path();
    this.path.catPoint = new Path();
    this.path.ballPoint.prev = this.path.catPoint;
    this.path.ballPoint.prevCode = moveCode[0]; // 临时写死
    this.path.ballPoint.coord = [...this.ball.coord];
    this.path.catPoint.next = this.path.ballPoint;
    this.path.catPoint.nextCode = moveCode[2]; // 临时写死
    this.path.catPoint.coord = [...this.cat.coord];

    this.correct = correct;
    if (this.correct) {
      Stage.draw(this);
    }
  }

  destroy() {
    clearTimeout(this.ballTimer);
  }

  private static draw(stage: Stage) {
    const $ground = document.querySelector('#ground') as HTMLElement;
    $ground.innerText = stage.map.data
      .map(row => row.join(''))
      .join('\n');
    const $path = document.querySelector('#path') as HTMLElement;
    $path.innerHTML = stage.path.getData()
      .map(p => `<li style="top: ${p.coord[0]}ch; left: ${p.coord[1]}ch">${p.char}</li>`)
      .join('\n');
  }

  private static checkStage(stage: Stage) {
    // todo: 关卡合法性检查
    return true;
  }

  moveCat(code: typeof moveCode[number]) {
    if (this.stop) {
      return
    }
    const [x, y] = moveOffset[code];
    const [cx, cy] = this.cat.coord;
    const [tx, ty] = [cx + x, cy + y];
    const target = this.map.data[tx][ty];
    if (target === Item['ground']) {
      if (this.path.has([tx, ty])) {
        console.warn('不能走毛线覆盖的路')
      } else {
        this.cat.coord = [tx, ty];
        this.map.data[tx][ty] = Item['cat'];
        this.map.data[cx][cy] = Item['ground'];
        this.path.moveCat(this.cat.coord, code);
      }
    } else if (target === Item['ball']) {
      this.moveBall(code);
    }
    Stage.draw(this);
  }

  moveBall(code: typeof moveCode[number]) {
    if (this.stop) {
      return
    }

    clearTimeout(this.ballTimer);
    const [x, y] = moveOffset[code];
    const [bx, by] = this.ball.coord;
    const [tx, ty] = [bx + x, by + y];

    if (coordEq(this.goal.coord, [tx, ty])) {
      this.map.data[tx][ty] = Item['ball'];
      this.map.data[bx][by] = Item['ground'];
      alert('win!');
      return;
    }

    if (coordEq(this.cat.coord, [tx, ty])) {
      return;
    }

    const target = this.map.data[tx][ty];

    if (target === Item['space']) {
      this.map.data[bx][by] = Item['ground'];
      this.stop = true;
      alert('fault.');
      return;
    }

    if (target === Item['ground']) {
      this.ball.coord = [tx, ty];
      this.map.data[tx][ty] = Item['ball'];
      this.map.data[bx][by] = Item['ground'];
      this.path.moveBall(this.ball.coord, code);
      this.ballTimer = setTimeout(() => {
        this.moveBall(code);
      }, PARAMETERS.ballSpeed);
    }
    Stage.draw(this);
  }
}

const command = (() => {
  let switcher = false;
  let stage: Stage;
  document.addEventListener('keydown', e => {
    if (!switcher || !stage) {
      return;
    }

    const code = e.code as typeof moveCode[number];
    if (moveCode.includes(code)) {
      stage.moveCat(code)
    }
  })
  return {
    bind(_stage: Stage) {
      switcher = true;
      stage = _stage;
    },
    off() {
      switcher = false;
    }
  }
})()


const controller = (() => {
  let stage: Stage
  return {
    start(stageStr: string) {
      if (stage) {
        stage.destroy();
      }
      stage = new Stage({ map: stageStr });
      if (!stage.correct) {
        alert('地图错误！');
        return;
      }
      command.bind(stage);
    }
  }
})()

const $text = document.querySelector('#text') as HTMLTextAreaElement
const $run = document.querySelector('#run') as HTMLButtonElement
$run.addEventListener('click', () => {
  controller.start($text.value);
});
$run.click();