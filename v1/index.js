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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var PARAMETERS = {
    blockSize: 40,
    ballSpeed: 800
};
var Item;
(function (Item) {
    Item["wall"] = "#";
    Item["ground"] = ".";
    Item["space"] = "x";
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
function coordEq(a, b) {
    return a[0] === b[0] && a[1] === b[1];
}
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
            coord: __spreadArray([], params.catCoord, true),
            nextDirection: firstDirection
        };
        this.ballPoint = {
            type: getPathType(revertDirection(firstDirection)),
            coord: [
                params.catCoord[0] + moveOffset[firstDirection][0],
                params.catCoord[1] + moveOffset[firstDirection][1],
            ],
            prevDirection: revertDirection(firstDirection)
        };
        for (var i = 1; i < params.data.length; i++) {
            this.moveBall(params.data[i]);
        }
    }
    PathSet.prototype.has = function (coord) {
        return this.flag[coord[0]][coord[1]];
    };
    PathSet.prototype.moveCat = function (directionNumber) {
        this.flag[this.catPoint.coord[0]][this.catPoint.coord[1]] = true;
        var newCatPoint = {
            type: getPathType(directionNumber, directionNumber),
            coord: [
                this.catPoint.coord[0] + moveOffset[directionNumber][0],
                this.catPoint.coord[1] + moveOffset[directionNumber][1],
            ],
            nextDirection: revertDirection(directionNumber)
        };
        this.catPoint.prevDirection = directionNumber;
        this.catPoint.type = getPathType(this.catPoint.prevDirection, this.catPoint.nextDirection);
        this.data.unshift(this.catPoint);
        this.catPoint = newCatPoint;
    };
    PathSet.prototype.moveBall = function (directionNumber) {
        this.flag[this.ballPoint.coord[0]][this.ballPoint.coord[1]] = true;
        var newBallPoint = {
            type: getPathType(directionNumber, directionNumber),
            coord: [
                this.ballPoint.coord[0] + moveOffset[directionNumber][0],
                this.ballPoint.coord[1] + moveOffset[directionNumber][1],
            ],
            prevDirection: revertDirection(directionNumber)
        };
        this.ballPoint.nextDirection = directionNumber;
        this.ballPoint.type = getPathType(directionNumber, this.ballPoint.prevDirection);
        this.data.push(this.ballPoint);
        this.ballPoint = newBallPoint;
    };
    return PathSet;
}());
var Stage = /** @class */ (function () {
    function Stage(params) {
        this.stop = true;
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
                var coord = [x, y];
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
            catCoord: params.config.catCoord,
            data: params.config.path
        });
        this.cat = new Cat({ coord: params.config.catCoord });
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
        var $stage = document.querySelector('#stages .stage');
        $stage.style.height = stage.map.height * PARAMETERS.blockSize + 'px';
        $stage.style.width = stage.map.width * PARAMETERS.blockSize + 'px';
        var $scenes = document.querySelectorAll('#stages .scene');
        $scenes.forEach(function ($scene) {
            $scene.style.gridTemplateColumns = "repeat(".concat(stage.map.width, ", 1fr)");
            $scene.style.gridAutoRows = "minmax(calc(100%/".concat(stage.map.height, "), calc(100%/").concat(stage.map.height, "))");
        });
        var $ground = document.querySelector('#stages .scene.ground');
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
        var $path = document.querySelector('#stages .scene.path');
        $path.innerHTML = '';
        $path.innerHTML = stage.path.data
            .map(function (_a) {
            var type = _a.type, _b = _a.coord, x = _b[0], y = _b[1];
            return "<div class=\"block i-path\" data-status=\"".concat(type, "\" style=\"grid-column: ").concat(y + 1, "; grid-row: ").concat(x + 1, ";\"></div>");
        })
            .join('\n');
        var $element = document.querySelector('#stages .scene.elements');
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
        if (coordEq([tx, ty], this.ball.coord)) {
            if (coordEq(this.goal.coord, this.ball.coord)) {
                this.stop = true;
                this.cat.coord = [tx, ty];
                this.cat.status = 'win';
                this.path.moveCat(directionNumber);
                Stage.draw(this);
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
                    this.cat.status = 'shuai';
                    this.stop = true;
                }
                this.cat.coord = [tx, ty];
                this.path.moveCat(directionNumber);
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
        if (coordEq(this.cat.coord, [tx, ty])) {
            if (coordEq(this.goal.coord, [tx, ty]) && coordEq(this.goal.coord, this.cat.coord)) {
                this.stop = true;
                this.cat.status = 'win';
                this.ball.coord = [tx, ty];
                this.path.moveBall(directionNumber);
                Stage.draw(this);
                setTimeout(function () {
                    alert('耶！你赢了✌️');
                }, 100);
            }
            return;
        }
        var target = this.map.data[tx][ty];
        if (target === Item['space']) {
            this.ball.coord = [tx, ty];
            this.path.moveBall(directionNumber);
            this.stop = true;
            alert('毛线球掉进坑里，你失败了！点击reset再来一次吧');
            return;
        }
        if (target === Item['ground']) {
            this.ball.coord = [tx, ty];
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
            stage = new Stage({ config: stageConfig });
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
    Page.prototype.destroy = function () { };
    return Page;
}());
var PageHome = /** @class */ (function (_super) {
    __extends(PageHome, _super);
    function PageHome() {
        var _this = _super.call(this) || this;
        _this.handleEnterClick = function () {
            router.go('stages');
        };
        document.querySelector('#home .enter').addEventListener('click', _this.handleEnterClick);
        return _this;
    }
    PageHome.prototype.destroy = function () {
        document.querySelector('#home .enter').removeEventListener('click', this.handleEnterClick);
    };
    return PageHome;
}(Page));
var PageStages = /** @class */ (function (_super) {
    __extends(PageStages, _super);
    function PageStages() {
        var _this = _super.call(this) || this;
        _this.currentStage = 0;
        _this.handleExitClick = function () {
            router.go('home');
        };
        document.querySelector('#stages .exit').addEventListener('click', _this.handleExitClick = function () {
            router.go('home');
        });
        document.querySelector('#stages .reset').addEventListener('click', _this.handleResetClick = function () {
            controller.start(stages[_this.currentStage]);
        });
        var stageSelect = document.querySelector('#stages .stage-select');
        stageSelect.innerHTML = stages
            .map(function (v, i) { return "<wired-item value=\"".concat(i, "\">Level ").concat(i + 1, "</wired-item>"); })
            .join('\n');
        stageSelect.selected = '0';
        stageSelect.firstUpdated();
        stageSelect.addEventListener('selected', _this.handleStageSelected = function () {
            _this.loadStage(stageSelect.selected);
        });
        document.addEventListener('keyup', _this.handleKeyup = function (e) {
            if (e.key === 'r') {
                _this.loadStage(_this.currentStage);
            }
        });
        _this.loadStage(0);
        return _this;
    }
    PageStages.prototype.destroy = function () {
        document.querySelector('#stages .exit').removeEventListener('click', this.handleExitClick);
        document.querySelector('#stages .reset').removeEventListener('click', this.handleResetClick);
        document.querySelector('#stages .stage-select').removeEventListener('selected', this.handleStageSelected);
        document.removeEventListener('keyup', this.handleKeyup);
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
router.go('home');
