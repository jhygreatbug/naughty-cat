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
    ballSpeed: 600
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
var getPathType = function (code1, code2) {
    var flag = [0, 0, 0, 0];
    var index1 = moveCode.indexOf(code1);
    var index2 = moveCode.indexOf(code2);
    flag[index1] = 1;
    flag[index2] = 1;
    return flag.join('');
};
function coordEq(a, b) {
    return a[0] === b[0] && a[1] === b[1];
}
var moveCode = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];
var moveOffset = {
    ArrowUp: [-1, 0],
    ArrowDown: [1, 0],
    ArrowLeft: [0, -1],
    ArrowRight: [0, 1]
};
var revertMoveDirection = function (code) {
    var index = moveCode.indexOf(code);
    var newIndex = (index + 2) % 4;
    return moveCode[newIndex];
};
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
        this.length = 0;
        this.flag = Array.from({ length: params.height })
            .map(function (_) { return Array.from({ length: params.width }).fill(false); });
    }
    PathSet.prototype.has = function (coord) {
        return this.flag[coord[0]][coord[1]];
    };
    PathSet.prototype.getData = function () {
        var path = [];
        var head = this.catPoint;
        for (var i = 0; i < this.length; i++) {
            var next = head.next;
            if (next === this.ballPoint) {
                break;
            }
            var type = getPathType(next.prevCode, next.nextCode);
            var coord = __spreadArray([], next.coord, true);
            path.push({ type: type, coord: coord });
            head = next;
        }
        return path;
    };
    PathSet.prototype.moveCat = function (newCatCoord, code) {
        this.flag[this.catPoint.coord[0]][this.catPoint.coord[1]] = true;
        var newCatPoint = new Path();
        newCatPoint.coord = __spreadArray([], newCatCoord, true);
        newCatPoint.next = this.catPoint;
        newCatPoint.nextCode = revertMoveDirection(code);
        this.catPoint.prev = newCatPoint;
        this.catPoint.prevCode = code;
        this.catPoint.type = getPathType(this.catPoint.prevCode, this.catPoint.nextCode);
        this.catPoint = newCatPoint;
        this.length++;
    };
    PathSet.prototype.moveBall = function (newBallCoord, code) {
        this.flag[this.ballPoint.coord[0]][this.ballPoint.coord[1]] = true;
        var newBallPoint = new Path();
        newBallPoint.coord = __spreadArray([], newBallCoord, true);
        newBallPoint.prev = this.ballPoint;
        newBallPoint.prevCode = revertMoveDirection(code);
        this.ballPoint.next = newBallPoint;
        this.ballPoint.nextCode = code;
        this.ballPoint.type = getPathType(code, this.ballPoint.prevCode);
        this.ballPoint = newBallPoint;
        this.length++;
    };
    return PathSet;
}());
var Path = /** @class */ (function () {
    function Path() {
    }
    return Path;
}());
var Stage = /** @class */ (function () {
    function Stage(params) {
        this.stop = true;
        var mapRows = params.map.trim().split('\n');
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
                if (item === Item['cat']) {
                    this.cat = new Cat({ coord: coord });
                    mapData[x][y] = Item['ground'];
                }
                else if (item === Item['ball']) {
                    this.ball = new Ball({ coord: coord });
                    mapData[x][y] = Item['ground'];
                }
                else if (item === Item['goal']) {
                    this.goal = new Goal({ coord: coord });
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
        this.path.ballPoint.coord = __spreadArray([], this.ball.coord, true);
        this.path.catPoint.next = this.path.ballPoint;
        this.path.catPoint.nextCode = moveCode[2]; // 临时写死
        this.path.catPoint.coord = __spreadArray([], this.cat.coord, true);
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
        $path.innerHTML = stage.path.getData()
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
    Stage.prototype.moveCat = function (code) {
        if (this.stop) {
            return;
        }
        this.cat.status = code.toLowerCase().replace('arrow', '');
        var _a = moveOffset[code], x = _a[0], y = _a[1];
        var _b = this.cat.coord, cx = _b[0], cy = _b[1];
        var _c = [cx + x, cy + y], tx = _c[0], ty = _c[1];
        var target = this.map.data[tx][ty];
        if (coordEq([tx, ty], this.ball.coord)) {
            if (coordEq(this.goal.coord, this.ball.coord)) {
                this.stop = true;
                this.cat.coord = [tx, ty];
                this.cat.status = 'win';
                this.path.moveCat(this.cat.coord, code);
                Stage.draw(this);
                setTimeout(function () {
                    alert('耶！你赢了✌️');
                }, 100);
                return;
            }
            this.moveBall(code);
        }
        else {
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
    };
    Stage.prototype.moveBall = function (code) {
        var _this = this;
        if (this.stop) {
            return;
        }
        this.ball.status = code.toLowerCase().replace('arrow', '');
        clearTimeout(this.ballTimer);
        var _a = moveOffset[code], x = _a[0], y = _a[1];
        var _b = this.ball.coord, bx = _b[0], by = _b[1];
        var _c = [bx + x, by + y], tx = _c[0], ty = _c[1];
        if (coordEq(this.cat.coord, [tx, ty])) {
            if (coordEq(this.goal.coord, [tx, ty]) && coordEq(this.goal.coord, this.cat.coord)) {
                this.stop = true;
                this.cat.status = 'win';
                this.ball.coord = [tx, ty];
                this.path.moveBall(this.ball.coord, code);
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
            this.path.moveBall(this.ball.coord, code);
            this.stop = true;
            alert('毛线球掉进坑里了！');
            return;
        }
        if (target === Item['ground']) {
            this.ball.coord = [tx, ty];
            this.path.moveBall(this.ball.coord, code);
            this.ballTimer = setTimeout(function () {
                _this.moveBall(code);
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
        if (moveCode.includes(code)) {
            stage.moveCat(code);
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
        start: function (stageStr) {
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
        _this.handleExitClick = function () {
            router.go('home');
        };
        document.querySelector('#stages .exit').addEventListener('click', _this.handleExitClick = function () {
            router.go('home');
        });
        document.querySelector('#stages .reset').addEventListener('click', _this.handleResetClick = function () {
            controller.start("\n        ############\n        #....C.....#\n        #....B.....#  \n        #..........#\n        #..........#\n        #..........#  \n        #.........G#\n        #xx........#\n        #xx........#\n        ############\n      ");
        });
        // document.querySelector('#stages .stage-list').innerHTML = '<wired-item value="0" role="option" class="wired-rendered stage-item">No. one</wired-item>'
        controller.start("\n      ############\n      #....C.....#\n      #....B.....#  \n      #..........#\n      #..........#\n      #..........#  \n      #.........G#\n      #xx........#\n      #xx........#\n      ############\n    ");
        return _this;
    }
    PageStages.prototype.destroy = function () {
        document.querySelector('#stages .exit').removeEventListener('click', this.handleExitClick);
    };
    return PageStages;
}(Page));
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
