const PARAMETERS = {
  blockSize: 40,
  ballSpeed: 800,
};

enum Item {
  wall = '#',
  ground = '.',
  space = 'X',
  goal = 'G',

  cat = 'C',
  ball = 'B',
}

const getPathType = (num1: DirectionNumber, num2?: DirectionNumber) => {
  const flag = [0, 0, 0, 0];
  flag[num1] = 1;
  flag[typeof num2 === 'number' ? num2 : num1] = 1;
  return flag.join('');
}

type CoordinateData = [number, number];
class Coordinate {
  length = 2;
  '0': number;
  '1': number;
  x: number;
  y: number;
  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
  };
  constructor([x, y]: CoordinateData) {
    this.set([x, y]);
  }
  eq([x, y]: CoordinateData | Coordinate) {
    return this.x === x && this.y === y;
  }
  set([x, y]: CoordinateData) {
    this[0] = x;
    this[1] = y;
    this.x = x;
    this.y = y;
    return this;
  }
  add([x, y]: CoordinateData) {
    this.set([ this.x + x, this.y + y ]);
    return this;
  }
  clone() {
    return new Coordinate([this.x, this.y])
  }
};

const moveCode = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'] as const;
type DirectionNumber = 0 | 1 | 2 | 3;
const direction = ['up', 'right', 'down', 'left'] as const;
type Direction = typeof direction[number];

const moveOffset: CoordinateData[] = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
]

const revertDirection = (number: DirectionNumber) => (number + 2) % 4 as DirectionNumber;

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

type CatStatus = Direction | 'win' | 'shuai';
class Cat implements BaseItem {
  coord: Coordinate;
  status: CatStatus = 'down';
  constructor(params: {
    coord: Coordinate;
  }) {
    Object.assign(this, params);
  }
}

type BallStatus = Direction;
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

interface Path {
  type: string;
  coord: Coordinate;
  prevDirection?: DirectionNumber;
  nextDirection?: DirectionNumber;
}

class PathSet {
  flag: boolean[][];
  catPoint: Path;
  ballPoint: Path;
  data: Path[] = [];

  constructor(params: {
    width: number;
    height: number;
    catCoord: Coordinate;
    data: DirectionNumber[];
  }) {
    this.flag = Array.from({ length: params.height })
      .map(_ => Array.from({ length: params.width }).fill(false) as boolean[]);

    const firstDirection = params.data[0];
    this.catPoint = {
      type: getPathType(firstDirection),
      coord: params.catCoord.clone(),
      nextDirection: firstDirection,
    };

    this.ballPoint = {
      type: getPathType(revertDirection(firstDirection)),
      coord: params.catCoord
        .clone()
        .add(moveOffset[firstDirection]),
      prevDirection: revertDirection(firstDirection),
    };

    for (let i = 1; i < params.data.length; i ++) {
      this.moveBall(params.data[i], true);
    }
  }

  has(coord: CoordinateData) {
    return this.flag[coord[0]][coord[1]];
  }

  moveCat(directionNumber: DirectionNumber) {
    this.flag[this.catPoint.coord[0]][this.catPoint.coord[1]] = true;

    const newCatPoint: Path = {
      type: getPathType(directionNumber, directionNumber),
      coord: this.catPoint.coord
        .clone()
        .add(moveOffset[directionNumber]),
      nextDirection: revertDirection(directionNumber),
    }
    this.catPoint.prevDirection = directionNumber;
    this.catPoint.type = getPathType(this.catPoint.prevDirection, this.catPoint.nextDirection)

    this.data.unshift(this.catPoint);
    this.catPoint = newCatPoint;
  }

  moveBall(directionNumber: DirectionNumber, muted: boolean = false) {
    this.flag[this.ballPoint.coord[0]][this.ballPoint.coord[1]] = true;

    const newBallPoint: Path = {
      type: getPathType(directionNumber, directionNumber),
      coord: this.ballPoint.coord
        .clone()
        .add(moveOffset[directionNumber]),
      prevDirection: revertDirection(directionNumber),
    };
    this.ballPoint.nextDirection = directionNumber;
    this.ballPoint.type = getPathType(directionNumber, this.ballPoint.prevDirection);

    this.data.push(this.ballPoint);
    this.ballPoint = newBallPoint;

    if (!muted) {
      createjs.Sound.play('effect-ball');
    }
  }
}

class Stage {
  map: GameMap;
  cat: Cat;
  ball: Ball;
  goal: Goal;
  path: PathSet;
  correct: boolean;
  $target: HTMLElement;
  private stop = true;
  private ballTimer: ReturnType<typeof setTimeout>;

  constructor(params: { config: StageConfig, $target: HTMLElement }) {
    this.$target = params.$target

    const mapRows = params.config.map.trim().split('\n');
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
        const coord = new Coordinate([x, y]);
         if (item === Item['goal']) {
          this.goal = new Goal({ coord });
          mapData[x][y] = Item['ground'];
        }
      }
    }

    // 初始化路径
    this.path = new PathSet({
      width: this.map.width,
      height: this.map.height,
      catCoord: new Coordinate(params.config.catCoord),
      data: params.config.path,
    });
    this.cat = new Cat({ coord: new Coordinate(params.config.catCoord) });
    this.ball = new Ball({ coord: this.path.ballPoint.coord });

    this.correct = correct;
    if (this.correct) {
      this.stop = false;
      Stage.draw(this);
    }
  }

  destroy() {
    clearTimeout(this.ballTimer);
  }

  private static draw(stage: Stage) {
    const $stage = stage.$target;
    $stage.style.height = stage.map.height * PARAMETERS.blockSize + 'px';
    $stage.style.width = stage.map.width * PARAMETERS.blockSize + 'px';

    const $scenes = stage.$target.querySelectorAll('.scene') as NodeList;
    $scenes.forEach(($scene: HTMLElement) => {
      $scene.style.gridTemplateColumns = `repeat(${stage.map.width}, 1fr)`;
      $scene.style.gridAutoRows = `minmax(calc(100%/${stage.map.height}), calc(100%/${stage.map.height}))`
    });

    const $ground = stage.$target.querySelector('.scene.ground') as HTMLElement;
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

    const $path = stage.$target.querySelector('.scene.path') as HTMLElement;
    $path.innerHTML = '';
    $path.innerHTML = stage.path.data
      .map(({ type, coord: [x, y] }) => `<div class="block i-path" data-status="${type}" style="grid-column: ${y + 1}; grid-row: ${x + 1};"></div>`)
      .join('\n');

    const $element = stage.$target.querySelector('.scene.elements') as HTMLElement;
    $element.innerHTML = '';
    $element.innerHTML += `<div class="block i-goal" style="grid-row: ${stage.goal.coord[0] + 1}; grid-column: ${stage.goal.coord[1] + 1};"></div>`
    $element.innerHTML += `<div class="block i-ball" data-status="${stage.ball.status}" style="grid-row: ${stage.ball.coord[0] + 1}; grid-column: ${stage.ball.coord[1] + 1};"></div>`
    $element.innerHTML += `<div class="block i-cat" data-status="${stage.cat.status}" style="grid-row: ${stage.cat.coord[0] + 1}; grid-column: ${stage.cat.coord[1] + 1};"></div>`
  }

  moveCat(directionNumber: DirectionNumber) {
    if (this.stop) {
      return
    }

    this.cat.status = direction[directionNumber] as CatStatus;

    const [x, y] = moveOffset[directionNumber];
    const [cx, cy] = this.cat.coord;
    const [tx, ty] = [cx + x, cy + y];
    const target = this.map.data[tx][ty];

    if (
      tx >= this.map.height
      || tx < 0
      || ty >= this.map.width
      || ty < 0
    ) {
      return;
    }

    if (this.ball.coord.eq([tx, ty])) {
      if (this.goal.coord.eq(this.ball.coord)) {
        this.stop = true;
        this.cat.coord = new Coordinate([tx, ty]);
        this.cat.status = 'win';
        this.path.moveCat(directionNumber);
        Stage.draw(this);
        createjs.Sound.play('effect-meo-win');
        createjs.Sound.play('effect-win');
        setTimeout(() => {
          alert('耶！你赢了✌️');
        }, 100);
        return;
      }
      this.moveBall(directionNumber);
    } else {
      if (target === Item['ground']) {
        if (this.path.has([tx, ty])) {
          createjs.Sound.play('effect-meo-fail');
          this.cat.status = 'shuai';
          this.stop = true;
        }
        this.cat.coord = new Coordinate([tx, ty]);
        createjs.Sound.play('effect-move');
        this.path.moveCat(directionNumber);
      } else {
        createjs.Sound.play('effect-error');
      }
    }

    Stage.draw(this);
  }

  moveBall(directionNumber: DirectionNumber) {
    if (this.stop) {
      return
    }

    this.ball.status = direction[directionNumber] as BallStatus;

    clearTimeout(this.ballTimer);
    const [x, y] = moveOffset[directionNumber];
    const [bx, by] = this.ball.coord;
    const [tx, ty] = [bx + x, by + y];
    
    if (
      tx >= this.map.height
      || tx < 0
      || ty >= this.map.width
      || ty < 0
    ) {
      return;
    }

    if (this.cat.coord.eq([tx, ty])) {
      if (this.goal.coord.eq([tx, ty]) && this.goal.coord.eq(this.cat.coord)) {
        this.stop = true;
        this.cat.status = 'win';
        this.ball.coord = new Coordinate([tx, ty]);
        this.path.moveBall(directionNumber);
        Stage.draw(this);
        createjs.Sound.play('effect-meo-win');
        createjs.Sound.play('effect-win');
        setTimeout(() => {
          alert('耶！你赢了✌️');
        }, 100)
      }
      return;
    }

    const target = this.map.data[tx][ty];

    if (target === Item['space']) {
      this.ball.coord = new Coordinate([tx, ty]);
      this.path.moveBall(directionNumber);
      this.stop = true;
      alert('毛线球掉进坑里，你失败了！点击reset再来一次吧');
      return;
    }

    if (target === Item['ground']) {
      this.ball.coord = new Coordinate([tx, ty]);
      this.path.moveBall(directionNumber);
      this.ballTimer = setTimeout(() => {
        this.moveBall(directionNumber);
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
    const direction = moveCode.indexOf(code) as DirectionNumber;
    if (direction > -1) {
      stage.moveCat(direction)
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
    start(stageConfig: StageConfig) {
      if (stage) {
        stage.destroy();
      }
      stage = new Stage({
        config: stageConfig,
        $target: document.querySelector('#stages .stage')
      });
      if (!stage.correct) {
        alert('地图错误！');
        return;
      }
      command.bind(stage);
    }
  }
})()

class Page {
  constructor() {
  }
  destroy() {
  }
}

class PageHome extends Page {
  bgmId = 'bgm01-title';
  handleEnterClick: () => void;
  handleResetClick: (e: KeyboardEvent) => void;
  stage: Stage;
  constructor() {
    super();
    this.handleEnterClick = () => {
      createjs.Sound.play('effect-click');
      router.go('stages');
    };
    document.querySelector('#home .enter').addEventListener('click', this.handleEnterClick);
    document.addEventListener('keyup', this.handleResetClick = e => {
      if (e.key === 'r') {
        this.stage.destroy();
        this.stage = this.getHomeStage();
        command.bind(this.stage);
      }
    });

    sound.getPromise(this.bgmId).then(() => {
      if (router.getCurrentPage() === this) {
        createjs.Sound.play(this.bgmId, { loop: -1 });
      }
    });

    this.stage = this.getHomeStage();
    command.bind(this.stage);
  }

  getHomeStage() {
    return new Stage({
      config: {
        key: 'home',
        map: `
          ................
          ................
          ................
          ................
          ................
          ................
          ................
          ................
          ..........G.....
          ................
          ................
          ................
          ................
          ................
        `,
        catCoord: [2, 4],
        someWords: 'just free play',
        path: [3,3,3,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,3,3,3,3,3,3,3,3],
      },
      $target: document.querySelector('#home .stage')
    });
  }

  destroy() {
    document.querySelector('#home .enter').removeEventListener('click', this.handleEnterClick);
    document.removeEventListener('keyup', this.handleResetClick);
    createjs.Sound.stop(this.bgmId);
  }
}

class PageStages extends Page {
  bgmId = 'bgm02-stage';
  handleExitClick: () => void;
  handleResetClick: () => void;
  handleStageSelected: () => void;
  handleStageClick: () => void;
  handleKeyup: (e: KeyboardEvent) => void;
  currentStage = 0;
  constructor() {
    super();

    document.querySelector('#stages .exit').addEventListener('click', this.handleExitClick = () => {
      createjs.Sound.play('effect-click');
      router.go('home');
    });
    document.querySelector('#stages .reset').addEventListener('click', this.handleResetClick = () => {
      createjs.Sound.play('effect-click');
      controller.start(stages[this.currentStage]);
    });

    const stageSelect = document.querySelector('#stages .stage-select') as HTMLSelectElement;
    stageSelect.innerHTML = stages
      .map((v, i) => `<wired-item value="${i}">Level ${i + 1}</wired-item>`)
      .join('\n');
    (stageSelect as any).selected = '0';
    (stageSelect as any).firstUpdated();
    stageSelect.addEventListener('selected', this.handleStageSelected = () => {
      createjs.Sound.play('effect-click');
      this.loadStage((stageSelect as any).selected);
    });
    stageSelect.addEventListener('click', this.handleStageClick = () => {
      createjs.Sound.play('effect-click');
    });

    document.addEventListener('keyup', this.handleKeyup = e => {
      if (e.key === 'r') {
        createjs.Sound.play('effect-click');
        this.loadStage(this.currentStage);
      }
    })

    this.loadStage(0);

    sound.getPromise(this.bgmId).then(() => {
      if (router.getCurrentPage() === this) {
        createjs.Sound.play(this.bgmId, { loop: -1 });
      }
    })
  }

  destroy() {
    document.querySelector('#stages .exit').removeEventListener('click', this.handleExitClick);
    document.querySelector('#stages .reset').removeEventListener('click', this.handleResetClick);
    document.querySelector('#stages .stage-select').removeEventListener('selected', this.handleStageSelected);
    document.querySelector('#stages .stage-select').removeEventListener('click', this.handleStageClick);
    document.removeEventListener('keyup', this.handleKeyup);
    createjs.Sound.stop(this.bgmId);
  }

  loadStage(stageIndex: number) {
    this.currentStage = stageIndex;
    const stage = stages[stageIndex];
    controller.start(stage);
    document.querySelector('#stages .some-words').innerHTML = stage.someWords;
  }
}

interface StageConfig {
  key: string;
  map: string;
  catCoord: CoordinateData;
  someWords: string;
  path: DirectionNumber[];
}
const stages: StageConfig[] = [
  {
    key: '1',
    map: `
      ##########
      #........#
      #..G.....#
      #..##....#
      #........#
      #........#
      #....##..#
      #........#
      #........#
      ##########
    `,
    someWords: 'Don\'t touch the line, get to where the ball is',
    catCoord: [2, 7],
    path: [0,3,3,2,2,1,2,2,3,3,2,2,1,1,1,0,0,0,3,3,3,3,2,2,2,3,0,0,0,0,0,1],

  },
  {
    key: '2',
    map: `
      .....#####
      .....#G..#
      .....#...#
      .....#...#
      ######...#
      #......#.#
      #.####...#
      #........#
      ##########
    `,
    someWords: 'Push the ball to the flag and the cat will also reach the flag',
    catCoord: [5, 1],
    path: [1],
  },
  {
    key: '3',
    map: `
      ##########
      #........#
      #........#
      #........#
      #......G.#
      #........#
      #........#
      #........#
      #........#
      ##########
    `,
    someWords: 'A free stage',
    catCoord: [1, 5],
    path: [2],
  },
  {
    key: '4',
    map: `
      ###########
      #.........#
      #.........#
      #...#.#...#
      #..#...#..#
      #.........#
      #..#...#..#
      #...#.#...#
      #.........#
      #....G....#
      ###########
    `,
    someWords: 'Test your speed',
    catCoord: [6, 1],
    path: [2,2,2,1,0,0,0,0],
  },
  // {
  //   key: '5',
  //   map: `
  //     #########
  //     #....G..#
  //     #.......#
  //     #########
  //   `,
  //   someWords: 'Try to find the shortest route',
  //   catCoord: [1, 1],
  //   path: [1],
  // },
  {
    key: '6',
    map: `
      ###########
      #.........#
      #.........#
      #...#.#...#
      #..#...#..#
      #.........#
      #..#...#..#
      #...#.#...#
      #....G....#
      #....X....#
      ###########
    `,
    someWords: 'Be careful not to fall into the pit. Test your speed, again',
    catCoord: [6, 1],
    path: [2,2,2,1,0,0,0,0],
  },
  // {
  //   key: '8',
  //   map: `
  //     #############
  //     #.#.........#
  //     #...........#
  //     #.#.........#
  //     #.#.........#
  //     #.#.........#
  //     #........#..#
  //     #...........#
  //     #........#..#
  //     #...........#
  //     ###G#########
  //     ..###........
  //   `,
  //   someWords: '',
  //   catCoord: [2, 11],
  //   path: [3],
  // },
  {
    key: '7',
    map: `
      ############
      #..........#
      #..#.......#
      #..........#
      #.#........#
      #.#........#
      #.#........#
      #.......X..#
      #..........#
      ###G########
      ..###.......
    `,
    someWords: '',
    catCoord: [2, 10],
    path: [3],
  },
  {
    key: '9',
    map: `
      ###############
      #.............#
      #.............#
      #....##.##....#
      #....##.##....#
      #.#....G......#
      #...#######...#
      #...#######...#
      #.............#
      #..X..........#
      #.............#
      ###############
      .####.......
    `,
    someWords: '',
    catCoord: [5, 9],
    path: [3],
  },
];

const router = ((routeConfig: Record<string, typeof Page>) => {
  let currentPage: Page = null;
  let currentPageName: string = '';
  return {
    getCurrentPage() {
      return currentPage;
    },
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

declare const createjs: any;
const sound = (() => {
  let resolves: Record<string, Function> = {};
  let promises: Record<string, Promise<void>> = {};
  let resolveCount = 0;
  const sounds = [
    {
      src: 'bgm01-title.mp3',
      id: 'bgm01-title',
    },
    {
      src: 'bgm02-stage.mp3',
      id: 'bgm02-stage',
    },
    {
      src: 'effect-ball.mp3',
      id: 'effect-ball',
    },
    {
      src: 'effect-click.wav',
      id: 'effect-click',
    },
    {
      src: 'effect-error.wav',
      id: 'effect-error',
    },
    {
      src: 'effect-meo-fail.ogg',
      id: 'effect-meo-fail',
    },
    {
      src: 'effect-meo-win.mp3',
      id: 'effect-meo-win',
    },
    {
      src: 'effect-move.wav',
      id: 'effect-move',
    },
    {
      src: 'effect-win.mp3',
      id: 'effect-win',
    },
  ];
  sounds.forEach(({ id }) => {
    promises[id] = new Promise(resolve => {
      resolves[id] = resolve;
      resolveCount ++;
    });
  })
  createjs.Sound.registerSounds(sounds, 'https://jhygreatbug.github.io/naughty-cat/assets/sound/');
  createjs.Sound.on('fileload', function loadHandler({ id }) {
    resolves[id]();
  }, this);
  return {
    getPromise(id: string) {
      return promises[id];
    },
    allResolved() {
      return resolveCount >= sounds.length;
    },
  }
})();

router.go('home');
