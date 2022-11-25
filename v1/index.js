var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _this = this;
var PARAMETERS = {
    blockSize: 40,
    ballSpeed: 800
};
var Item;
(function (Item) {
    Item["wall"] = "#";
    Item["ground"] = ".";
    Item["space"] = "X";
    Item["goal"] = "G";
    Item["cat"] = "C";
    Item["ball"] = "B";
})(Item || (Item = {}));
var getPathType = function (num1, num2) {
    var flag = [0, 0, 0, 0];
    flag[num1] = 1;
    flag[typeof num2 === 'number' ? num2 : num1] = 1;
    return flag.join('');
};
var Coordinate = /** @class */ (function () {
    function Coordinate(_a) {
        var x = _a[0], y = _a[1];
        this.length = 2;
        this.set([x, y]);
    }
    Coordinate.prototype[Symbol.iterator] = function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.x];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, this.y];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
    ;
    Coordinate.prototype.eq = function (_a) {
        var x = _a[0], y = _a[1];
        return this.x === x && this.y === y;
    };
    Coordinate.prototype.set = function (_a) {
        var x = _a[0], y = _a[1];
        this[0] = x;
        this[1] = y;
        this.x = x;
        this.y = y;
        return this;
    };
    Coordinate.prototype.add = function (_a) {
        var x = _a[0], y = _a[1];
        this.set([this.x + x, this.y + y]);
        return this;
    };
    Coordinate.prototype.clone = function () {
        return new Coordinate([this.x, this.y]);
    };
    return Coordinate;
}());
;
console.log(__spreadArray([], new Coordinate([1, 2]), true));
var moveCode = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];
var direction = ['up', 'right', 'down', 'left'];
var moveOffset = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];
var revertDirection = function (number) { return (number + 2) % 4; };
// 地图
var GameMap = /** @class */ (function () {
    function GameMap(params) {
        Object.assign(this, params);
    }
    return GameMap;
}());
var BaseItem = /** @class */ (function () {
    function BaseItem() {
    }
    return BaseItem;
}());
var Cat = /** @class */ (function () {
    function Cat(params) {
        this.status = 'down';
        Object.assign(this, params);
    }
    return Cat;
}());
var Ball = /** @class */ (function () {
    function Ball(params) {
        this.status = 'down';
        Object.assign(this, params);
    }
    return Ball;
}());
var Goal = /** @class */ (function () {
    function Goal(params) {
        Object.assign(this, params);
    }
    return Goal;
}());
var PathSet = /** @class */ (function () {
    function PathSet(params) {
        this.data = [];
        this.flag = Array.from({ length: params.height })
            .map(function (_) { return Array.from({ length: params.width }).fill(false); });
        var firstDirection = params.data[0];
        this.catPoint = {
            type: getPathType(firstDirection),
            coord: params.catCoord.clone(),
            nextDirection: firstDirection
        };
        this.ballPoint = {
            type: getPathType(revertDirection(firstDirection)),
            coord: params.catCoord
                .clone()
                .add(moveOffset[firstDirection]),
            prevDirection: revertDirection(firstDirection)
        };
        for (var i = 1; i < params.data.length; i++) {
            this.moveBall(params.data[i], true);
        }
    }
    PathSet.prototype.has = function (coord) {
        return this.flag[coord[0]][coord[1]];
    };
    PathSet.prototype.moveCat = function (directionNumber) {
        this.flag[this.catPoint.coord[0]][this.catPoint.coord[1]] = true;
        var newCatPoint = {
            type: getPathType(directionNumber, directionNumber),
            coord: this.catPoint.coord
                .clone()
                .add(moveOffset[directionNumber]),
            nextDirection: revertDirection(directionNumber)
        };
        this.catPoint.prevDirection = directionNumber;
        this.catPoint.type = getPathType(this.catPoint.prevDirection, this.catPoint.nextDirection);
        this.data.unshift(this.catPoint);
        this.catPoint = newCatPoint;
    };
    PathSet.prototype.moveBall = function (directionNumber, muted) {
        if (muted === void 0) { muted = false; }
        this.flag[this.ballPoint.coord[0]][this.ballPoint.coord[1]] = true;
        var newBallPoint = {
            type: getPathType(directionNumber, directionNumber),
            coord: this.ballPoint.coord
                .clone()
                .add(moveOffset[directionNumber]),
            prevDirection: revertDirection(directionNumber)
        };
        this.ballPoint.nextDirection = directionNumber;
        this.ballPoint.type = getPathType(directionNumber, this.ballPoint.prevDirection);
        this.data.push(this.ballPoint);
        this.ballPoint = newBallPoint;
        if (!muted) {
            createjs.Sound.play('effect-ball');
        }
    };
    return PathSet;
}());
var Stage = /** @class */ (function () {
    function Stage(params) {
        this.stop = true;
        this.$target = params.$target;
        var mapRows = params.config.map.trim().split('\n');
        var mapHeight = mapRows.length;
        var mapData = mapRows.map(function (row) { return row.trim().split(''); });
        var mapWidth = mapData.reduce(function (prev, item) { return Math.max(prev, item.length); }, 0);
        this.map = new GameMap({
            data: mapData,
            width: mapWidth,
            height: mapHeight
        });
        var correct = true;
        // 读取地图信息
        for (var x = 0, height = mapData.length; x < height; x++) {
            for (var y = 0, width = mapData[x].length; y < width; y++) {
                var item = mapData[x][y];
                var coord = new Coordinate([x, y]);
                if (item === Item['goal']) {
                    this.goal = new Goal({ coord: coord });
                    mapData[x][y] = Item['ground'];
                }
            }
        }
        // 初始化路径
        this.path = new PathSet({
            width: this.map.width,
            height: this.map.height,
            catCoord: new Coordinate(params.config.catCoord),
            data: params.config.path
        });
        this.cat = new Cat({ coord: new Coordinate(params.config.catCoord) });
        this.ball = new Ball({ coord: this.path.ballPoint.coord });
        this.correct = correct;
        if (this.correct) {
            this.stop = false;
            Stage.draw(this);
        }
    }
    Stage.prototype.destroy = function () {
        clearTimeout(this.ballTimer);
    };
    Stage.draw = function (stage) {
        var $stage = stage.$target;
        $stage.style.height = stage.map.height * PARAMETERS.blockSize + 'px';
        $stage.style.width = stage.map.width * PARAMETERS.blockSize + 'px';
        var $scenes = stage.$target.querySelectorAll('.scene');
        $scenes.forEach(function ($scene) {
            $scene.style.gridTemplateColumns = "repeat(".concat(stage.map.width, ", 1fr)");
            $scene.style.gridAutoRows = "minmax(calc(100%/".concat(stage.map.height, "), calc(100%/").concat(stage.map.height, "))");
        });
        var $ground = stage.$target.querySelector('.scene.ground');
        $ground.innerHTML = stage.map.data
            .map(function (row, x) { return row.map(function (i, y) {
            var itemName = (function () {
                if (i === Item['wall'])
                    return 'wall';
                if (i === Item['space'])
                    return 'space';
                return 'ground';
            })();
            return "<div class=\"block i-".concat(itemName, "\" style=\"grid-row: ").concat(x + 1, "; grid-column: ").concat(y + 1, "\"></div>");
        }).join('\n'); })
            .join('\n');
        var $path = stage.$target.querySelector('.scene.path');
        $path.innerHTML = '';
        $path.innerHTML = stage.path.data
            .map(function (_a) {
            var type = _a.type, _b = _a.coord, x = _b[0], y = _b[1];
            return "<div class=\"block i-path\" data-status=\"".concat(type, "\" style=\"grid-column: ").concat(y + 1, "; grid-row: ").concat(x + 1, ";\"></div>");
        })
            .join('\n');
        var $element = stage.$target.querySelector('.scene.elements');
        $element.innerHTML = '';
        $element.innerHTML += "<div class=\"block i-goal\" style=\"grid-row: ".concat(stage.goal.coord[0] + 1, "; grid-column: ").concat(stage.goal.coord[1] + 1, ";\"></div>");
        $element.innerHTML += "<div class=\"block i-ball\" data-status=\"".concat(stage.ball.status, "\" style=\"grid-row: ").concat(stage.ball.coord[0] + 1, "; grid-column: ").concat(stage.ball.coord[1] + 1, ";\"></div>");
        $element.innerHTML += "<div class=\"block i-cat\" data-status=\"".concat(stage.cat.status, "\" style=\"grid-row: ").concat(stage.cat.coord[0] + 1, "; grid-column: ").concat(stage.cat.coord[1] + 1, ";\"></div>");
    };
    Stage.prototype.moveCat = function (directionNumber) {
        if (this.stop) {
            return;
        }
        this.cat.status = direction[directionNumber];
        var _a = moveOffset[directionNumber], x = _a[0], y = _a[1];
        var _b = this.cat.coord, cx = _b[0], cy = _b[1];
        var _c = [cx + x, cy + y], tx = _c[0], ty = _c[1];
        var target = this.map.data[tx][ty];
        if (tx >= this.map.height
            || tx < 0
            || ty >= this.map.width
            || ty < 0) {
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
                setTimeout(function () {
                    alert('耶！你赢了✌️');
                }, 100);
                return;
            }
            this.moveBall(directionNumber);
        }
        else {
            if (target === Item['ground']) {
                if (this.path.has([tx, ty])) {
                    createjs.Sound.play('effect-meo-fail');
                    this.cat.status = 'shuai';
                    this.stop = true;
                }
                this.cat.coord = new Coordinate([tx, ty]);
                createjs.Sound.play('effect-move');
                this.path.moveCat(directionNumber);
            }
            else {
                createjs.Sound.play('effect-error');
            }
        }
        Stage.draw(this);
    };
    Stage.prototype.moveBall = function (directionNumber) {
        var _this = this;
        if (this.stop) {
            return;
        }
        this.ball.status = direction[directionNumber];
        clearTimeout(this.ballTimer);
        var _a = moveOffset[directionNumber], x = _a[0], y = _a[1];
        var _b = this.ball.coord, bx = _b[0], by = _b[1];
        var _c = [bx + x, by + y], tx = _c[0], ty = _c[1];
        if (tx >= this.map.height
            || tx < 0
            || ty >= this.map.width
            || ty < 0) {
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
                setTimeout(function () {
                    alert('耶！你赢了✌️');
                }, 100);
            }
            return;
        }
        var target = this.map.data[tx][ty];
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
            this.ballTimer = setTimeout(function () {
                _this.moveBall(directionNumber);
            }, PARAMETERS.ballSpeed);
        }
        Stage.draw(this);
    };
    return Stage;
}());
var command = (function () {
    var switcher = false;
    var stage;
    document.addEventListener('keydown', function (e) {
        if (!switcher || !stage) {
            return;
        }
        var code = e.code;
        var direction = moveCode.indexOf(code);
        if (direction > -1) {
            stage.moveCat(direction);
        }
    });
    return {
        bind: function (_stage) {
            switcher = true;
            stage = _stage;
        },
        off: function () {
            switcher = false;
        }
    };
})();
var controller = (function () {
    var stage;
    return {
        start: function (stageConfig) {
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
    };
})();
var Page = /** @class */ (function () {
    function Page() {
    }
    Page.prototype.destroy = function () {
    };
    return Page;
}());
var PageHome = /** @class */ (function (_super) {
    __extends(PageHome, _super);
    function PageHome() {
        var _this = _super.call(this) || this;
        _this.bgmId = 'bgm01-title';
        _this.handleEnterClick = function () {
            createjs.Sound.play('effect-click');
            router.go('stages');
        };
        document.querySelector('#home .enter').addEventListener('click', _this.handleEnterClick);
        document.addEventListener('keyup', _this.handleResetClick = function (e) {
            if (e.key === 'r') {
                _this.stage.destroy();
                _this.stage = _this.getHomeStage();
            }
        });
        sound.getPromise(_this.bgmId).then(function () {
            if (router.getCurrentPage() === _this) {
                createjs.Sound.play(_this.bgmId, { loop: -1 });
            }
        });
        _this.stage = _this.getHomeStage();
        command.bind(_this.stage);
        return _this;
    }
    PageHome.prototype.getHomeStage = function () {
        return new Stage({
            config: {
                key: 'home',
                map: "\n          ................\n          ................\n          ................\n          ................\n          ................\n          ................\n          ................\n          ................\n          ..........G.....\n          ................\n          ................\n          ................\n          ................\n          ................\n        ",
                catCoord: [2, 4],
                someWords: 'just free play',
                path: [3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3]
            },
            $target: document.querySelector('#home .stage')
        });
    };
    PageHome.prototype.destroy = function () {
        document.querySelector('#home .enter').removeEventListener('click', this.handleEnterClick);
        document.removeEventListener('keyup', this.handleResetClick);
        createjs.Sound.stop(this.bgmId);
    };
    return PageHome;
}(Page));
var PageStages = /** @class */ (function (_super) {
    __extends(PageStages, _super);
    function PageStages() {
        var _this = _super.call(this) || this;
        _this.bgmId = 'bgm02-stage';
        _this.currentStage = 0;
        document.querySelector('#stages .exit').addEventListener('click', _this.handleExitClick = function () {
            createjs.Sound.play('effect-click');
            router.go('home');
        });
        document.querySelector('#stages .reset').addEventListener('click', _this.handleResetClick = function () {
            createjs.Sound.play('effect-click');
            controller.start(stages[_this.currentStage]);
        });
        var stageSelect = document.querySelector('#stages .stage-select');
        stageSelect.innerHTML = stages
            .map(function (v, i) { return "<wired-item value=\"".concat(i, "\">Level ").concat(i + 1, "</wired-item>"); })
            .join('\n');
        stageSelect.selected = '0';
        stageSelect.firstUpdated();
        stageSelect.addEventListener('selected', _this.handleStageSelected = function () {
            createjs.Sound.play('effect-click');
            _this.loadStage(stageSelect.selected);
        });
        stageSelect.addEventListener('click', _this.handleStageClick = function () {
            createjs.Sound.play('effect-click');
        });
        document.addEventListener('keyup', _this.handleKeyup = function (e) {
            if (e.key === 'r') {
                createjs.Sound.play('effect-click');
                _this.loadStage(_this.currentStage);
            }
        });
        _this.loadStage(0);
        sound.getPromise(_this.bgmId).then(function () {
            if (router.getCurrentPage() === _this) {
                createjs.Sound.play(_this.bgmId, { loop: -1 });
            }
        });
        return _this;
    }
    PageStages.prototype.destroy = function () {
        document.querySelector('#stages .exit').removeEventListener('click', this.handleExitClick);
        document.querySelector('#stages .reset').removeEventListener('click', this.handleResetClick);
        document.querySelector('#stages .stage-select').removeEventListener('selected', this.handleStageSelected);
        document.querySelector('#stages .stage-select').removeEventListener('click', this.handleStageClick);
        document.removeEventListener('keyup', this.handleKeyup);
        createjs.Sound.stop(this.bgmId);
    };
    PageStages.prototype.loadStage = function (stageIndex) {
        this.currentStage = stageIndex;
        var stage = stages[stageIndex];
        controller.start(stage);
        document.querySelector('#stages .some-words').innerHTML = stage.someWords;
    };
    return PageStages;
}(Page));
var stages = [
    {
        key: '1',
        map: "\n      ##########\n      #........#\n      #..G.....#\n      #..##....#\n      #........#\n      #........#\n      #....##..#\n      #........#\n      #........#\n      ##########\n    ",
        someWords: 'Don\'t touch the line, get to where the ball is',
        catCoord: [2, 7],
        path: [0, 3, 3, 2, 2, 1, 2, 2, 3, 3, 2, 2, 1, 1, 1, 0, 0, 0, 3, 3, 3, 3, 2, 2, 2, 3, 0, 0, 0, 0, 0, 1]
    },
    {
        key: '2',
        map: "\n      .....#####\n      .....#G..#\n      .....#...#\n      .....#...#\n      ######...#\n      #......#.#\n      #.####...#\n      #........#\n      ##########\n    ",
        someWords: 'Push the ball to the flag and the cat will also reach the flag',
        catCoord: [5, 1],
        path: [1]
    },
    {
        key: '3',
        map: "\n      ##########\n      #........#\n      #........#\n      #........#\n      #......G.#\n      #........#\n      #........#\n      #........#\n      #........#\n      ##########\n    ",
        someWords: 'A free stage',
        catCoord: [1, 5],
        path: [2]
    },
    {
        key: '4',
        map: "\n      ###########\n      #.........#\n      #.........#\n      #...#.#...#\n      #..#...#..#\n      #.........#\n      #..#...#..#\n      #...#.#...#\n      #.........#\n      #....G....#\n      ###########\n    ",
        someWords: 'Test your speed',
        catCoord: [6, 1],
        path: [2, 2, 2, 1, 0, 0, 0, 0]
    },
    {
        key: '5',
        map: "\n      #########\n      #....G..#\n      #.......#\n      #########\n    ",
        someWords: 'Try to find the shortest route',
        catCoord: [1, 1],
        path: [1]
    },
    {
        key: '6',
        map: "\n      ###########\n      #.........#\n      #.........#\n      #...#.#...#\n      #..#...#..#\n      #.........#\n      #..#...#..#\n      #...#.#...#\n      #....G....#\n      #....X....#\n      ###########\n    ",
        someWords: 'Be careful not to fall into the pit. Test your speed, again',
        catCoord: [6, 1],
        path: [2, 2, 2, 1, 0, 0, 0, 0]
    },
];
var router = (function (routeConfig) {
    var currentPage = null;
    var currentPageName = '';
    return {
        getCurrentPage: function () {
            return currentPage;
        },
        go: function (pageName) {
            if (currentPage) {
                currentPage.destroy();
                document.getElementById(currentPageName).style.display = 'none';
            }
            currentPage = new routeConfig[pageName]();
            currentPageName = pageName;
            document.getElementById(pageName).style.display = 'block';
        }
    };
})({
    'home': PageHome,
    'stages': PageStages
});
var sound = (function () {
    var resolves = {};
    var promises = {};
    var resolveCount = 0;
    var sounds = [
        {
            src: 'bgm01-title.mp3',
            id: 'bgm01-title'
        },
        {
            src: 'bgm02-stage.mp3',
            id: 'bgm02-stage'
        },
        {
            src: 'effect-ball.mp3',
            id: 'effect-ball'
        },
        {
            src: 'effect-click.wav',
            id: 'effect-click'
        },
        {
            src: 'effect-error.wav',
            id: 'effect-error'
        },
        {
            src: 'effect-meo-fail.ogg',
            id: 'effect-meo-fail'
        },
        {
            src: 'effect-meo-win.mp3',
            id: 'effect-meo-win'
        },
        {
            src: 'effect-move.wav',
            id: 'effect-move'
        },
        {
            src: 'effect-win.mp3',
            id: 'effect-win'
        },
    ];
    sounds.forEach(function (_a) {
        var id = _a.id;
        promises[id] = new Promise(function (resolve) {
            resolves[id] = resolve;
            resolveCount++;
        });
    });
    createjs.Sound.registerSounds(sounds, 'https://jhygreatbug.github.io/naughty-cat/assets/sound/');
    createjs.Sound.on('fileload', function loadHandler(_a) {
        var id = _a.id;
        resolves[id]();
    }, _this);
    return {
        getPromise: function (id) {
            return promises[id];
        },
        allResolved: function () {
            return resolveCount >= sounds.length;
        }
    };
})();
router.go('home');
