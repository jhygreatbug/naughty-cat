const PARAMETERS = {
  blockSize: 40,
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

const getPathType = (code1: typeof moveCode[number], code2: typeof moveCode[number]) => {
  const flag = [0, 0, 0, 0];
  const index1 = moveCode.indexOf(code1);
  const index2 = moveCode.indexOf(code2);
  flag[index1] = 1;
  flag[index2] = 1;
  return flag.join('');
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

type CatStatus = 'up' | 'right' | 'down' | 'left' | 'win' | 'shuai';
class Cat implements BaseItem {
  coord: Coordinate;
  status: CatStatus = 'down';
  constructor(params: {
    coord: Coordinate;
  }) {
    Object.assign(this, params);
  }
}

type BallStatus = 'up' | 'right' | 'down' | 'left';
class Ball implements BaseItem {
  coord: Coordinate;
  status: BallStatus = 'down';
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
    const path: Array<{ type: string; coord: Coordinate}> = [];
    let head = this.catPoint;
    for (let i = 0; i < this.length; i ++) {
      const next = head.next;
      if (next === this.ballPoint) {
        break;
      }
      const type = getPathType(next.prevCode, next.nextCode);
      const coord: Coordinate = [...next.coord];
      path.push({ type, coord });
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
    this.catPoint.type = getPathType(this.catPoint.prevCode, this.catPoint.nextCode);
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
    this.ballPoint.type = getPathType(code, this.ballPoint.prevCode);
    this.ballPoint = newBallPoint;

    this.length ++;
  }
}

class Path {
  prev: Path | null;
  next: Path | null;
  type: string;
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
  private stop = true;
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
          mapData[x][y] = Item['ground'];
        } else if (item === Item['ball']) {
          this.ball = new Ball({ coord });
          mapData[x][y] = Item['ground'];
        } else if (item === Item['goal']) {
          this.goal = new Goal({ coord });
          mapData[x][y] = Item['ground'];
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
      setTimeout(() => {
        this.stop = false;
        Stage.draw(this);
      }, 1000)
    }
  }

  destroy() {
    clearTimeout(this.ballTimer);
  }

  private static draw(stage: Stage) {
    const $stage = document.querySelector('#stages .stage') as HTMLElement;
    $stage.style.height = stage.map.height * PARAMETERS.blockSize + 'px';
    $stage.style.width = stage.map.width * PARAMETERS.blockSize + 'px';

    const $scenes = document.querySelectorAll('#stages .scene') as NodeList;
    $scenes.forEach(($scene: HTMLElement) => {
      $scene.style.gridTemplateColumns = `repeat(${stage.map.width}, 1fr)`;
      $scene.style.gridAutoRows = `minmax(calc(100%/${stage.map.height}), calc(100%/${stage.map.height}))`
    });

    const $ground = document.querySelector('#stages .scene.ground') as HTMLElement;
    $ground.innerHTML = stage.map.data
      .map(
        (row, x) => row.map((i, y) => {
          const itemName = (() => {
            if (i === Item['wall']) return 'wall';
            if (i === Item['space']) return 'space';
            return 'ground';
          })();
          return `<div class="block i-${itemName}" style="grid-row: ${x + 1}; grid-column: ${y + 1}"></div>`
        }).join('\n')
      )
      .join('\n');

    const $path = document.querySelector('#stages .scene.path') as HTMLElement;
    $path.innerHTML = '';
    $path.innerHTML = stage.path.getData()
      .map(({ type, coord: [x, y] }) => `<div class="block i-path" data-status="${type}" style="grid-column: ${y + 1}; grid-row: ${x + 1};"></div>`)
      .join('\n');

    const $element = document.querySelector('#stages .scene.elements') as HTMLElement;
    $element.innerHTML = '';
    $element.innerHTML += `<div class="block i-goal" style="grid-row: ${stage.goal.coord[0] + 1}; grid-column: ${stage.goal.coord[1] + 1};"></div>`
    $element.innerHTML += `<div class="block i-cat" data-status="${stage.cat.status}" style="grid-row: ${stage.cat.coord[0] + 1}; grid-column: ${stage.cat.coord[1] + 1};"></div>`
    $element.innerHTML += `<div class="block i-ball" data-status="${stage.ball.status}" style="grid-row: ${stage.ball.coord[0] + 1}; grid-column: ${stage.ball.coord[1] + 1};"></div>`
  }

  private static checkStage(stage: Stage) {
    // todo: 关卡合法性检查
    return true;
  }

  moveCat(code: typeof moveCode[number]) {
    if (this.stop) {
      return
    }

    this.cat.status = code.toLowerCase().replace('arrow', '') as CatStatus;

    const [x, y] = moveOffset[code];
    const [cx, cy] = this.cat.coord;
    const [tx, ty] = [cx + x, cy + y];
    const target = this.map.data[tx][ty];
    if (coordEq([tx, ty], this.ball.coord)) {
      if (coordEq(this.goal.coord, this.ball.coord)) {
        this.stop = true;
        this.cat.coord = [tx, ty];
        this.cat.status = 'win';
        this.path.moveCat(this.cat.coord, code);
        Stage.draw(this);
        setTimeout(() => {
          alert('耶！你赢了✌️');
        }, 100);
        return;
      }
      this.moveBall(code);
    } else {
      if (target === Item['ground']) {
        if (this.path.has([tx, ty])) {
          this.cat.status = 'shuai';
          this.stop = true;
        }
        this.cat.coord = [tx, ty];
        this.path.moveCat(this.cat.coord, code);
      }
    }

    Stage.draw(this);
  }

  moveBall(code: typeof moveCode[number]) {
    if (this.stop) {
      return
    }

    this.ball.status = code.toLowerCase().replace('arrow', '') as BallStatus;

    clearTimeout(this.ballTimer);
    const [x, y] = moveOffset[code];
    const [bx, by] = this.ball.coord;
    const [tx, ty] = [bx + x, by + y];

    if (coordEq(this.cat.coord, [tx, ty])) {
      if (coordEq(this.goal.coord, [tx, ty]) && coordEq(this.goal.coord, this.cat.coord)) {
        this.stop = true;
        this.cat.status = 'win';
        this.ball.coord = [tx, ty];
        this.path.moveBall(this.ball.coord, code);
        Stage.draw(this);
        setTimeout(() => {
          alert('耶！你赢了✌️');
        }, 100)
      }
      return;
    }

    const target = this.map.data[tx][ty];

    if (target === Item['space']) {
      this.stop = true;
      alert('毛线球掉进坑里了！');
      return;
    }

    if (target === Item['ground']) {
      this.ball.coord = [tx, ty];
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

class Page {
  constructor() {}
  destroy() {}
}

class PageHome extends Page {
  handleEnterClick: () => void;
  constructor() {
    super();
    this.handleEnterClick = () => {
      router.go('stages');
    }
    document.querySelector('#home .enter').addEventListener('click', this.handleEnterClick);
  }

  destroy() {
    document.querySelector('#home .enter').removeEventListener('click', this.handleEnterClick);
  }
}

class PageStages extends Page {
  handleExitClick: () => void;
  constructor() {
    super();
    this.handleExitClick = () => {
      router.go('home');
    }
    document.querySelector('#stages .exit').addEventListener('click', this.handleExitClick);

    document.querySelector('#stages .stage-list').innerHTML = '<wired-item value="0" role="option" class="wired-rendered stage-item">No. one</wired-item>'

    controller.start(`
      ############
      #....C.....#
      #....B.....#  
      #..........#
      #..........#
      #..........#  
      #.........G#
      #xx........#
      #xx........#
      ############
    `);
  }

  destroy() {
    document.querySelector('#stages .exit').removeEventListener('click', this.handleExitClick);
  }
}

const router = ((routeConfig: Record<string, typeof Page>) => {
  let currentPage: Page = null;
  let currentPageName: string = '';
  return {
    go(pageName: string) {
      if (currentPage) {
        currentPage.destroy();
        document.getElementById(currentPageName).style.display = 'none';
      }
      currentPage = new routeConfig[pageName]();
      currentPageName = pageName;
      document.getElementById(pageName).style.display = 'block';
    }
  }
})({
  'home': PageHome,
  'stages': PageStages,
})

router.go('stages');
