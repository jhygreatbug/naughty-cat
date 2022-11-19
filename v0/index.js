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
    ballSpeed: 1000
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
// https://zh.wikipedia.org/zh-cn/%E6%96%B9%E6%A1%86%E7%BB%98%E5%88%B6%E5%AD%97%E7%AC%A6
var PathCharacter;
(function (PathCharacter) {
    PathCharacter["p0000"] = " ";
    PathCharacter["p0011"] = "\u2557";
    PathCharacter["p0101"] = "\u2550";
    PathCharacter["p0110"] = "\u2554";
    PathCharacter["p1001"] = "\u255D";
    PathCharacter["p1010"] = "\u2551";
    PathCharacter["p1100"] = "\u255A";
})(PathCharacter || (PathCharacter = {}));
var getPathCharacter = function (code1, code2) {
    var flag = [0, 0, 0, 0];
    var index1 = moveCode.indexOf(code1);
    var index2 = moveCode.indexOf(code2);
    flag[index1] = 1;
    flag[index2] = 1;
    return PathCharacter['p' + flag.join('')];
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
        Object.assign(this, params);
    }
    return Cat;
}());
var Ball = /** @class */ (function () {
    function Ball(params) {
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
            var char = getPathCharacter(next.prevCode, next.nextCode);
            var coord = __spreadArray([], next.coord, true);
            path.push({ char: char, coord: coord });
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
        this.catPoint.char = getPathCharacter(this.catPoint.prevCode, this.catPoint.nextCode);
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
        this.ballPoint.char = getPathCharacter(code, this.ballPoint.prevCode);
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
        this.stop = false;
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
                }
                else if (item === Item['ball']) {
                    this.ball = new Ball({ coord: coord });
                }
                else if (item === Item['goal']) {
                    this.goal = new Goal({ coord: coord });
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
            Stage.draw(this);
        }
    }
    Stage.prototype.destroy = function () {
        clearTimeout(this.ballTimer);
    };
    Stage.draw = function (stage) {
        var $ground = document.querySelector('#ground');
        $ground.innerText = stage.map.data
            .map(function (row) { return row.join(''); })
            .join('\n');
        var $path = document.querySelector('#path');
        $path.innerHTML = stage.path.getData()
            .map(function (p) { return "<li style=\"top: ".concat(p.coord[0], "ch; left: ").concat(p.coord[1], "ch\">").concat(p.char, "</li>"); })
            .join('\n');
    };
    Stage.checkStage = function (stage) {
        // todo: 关卡合法性检查
        return true;
    };
    Stage.prototype.moveCat = function (code) {
        if (this.stop) {
            return;
        }
        var _a = moveOffset[code], x = _a[0], y = _a[1];
        var _b = this.cat.coord, cx = _b[0], cy = _b[1];
        var _c = [cx + x, cy + y], tx = _c[0], ty = _c[1];
        var target = this.map.data[tx][ty];
        if (target === Item['ground']) {
            if (this.path.has([tx, ty])) {
                console.warn('不能走毛线覆盖的路');
            }
            else {
                this.cat.coord = [tx, ty];
                this.map.data[tx][ty] = Item['cat'];
                this.map.data[cx][cy] = Item['ground'];
                this.path.moveCat(this.cat.coord, code);
            }
        }
        else if (target === Item['ball']) {
            this.moveBall(code);
        }
        Stage.draw(this);
    };
    Stage.prototype.moveBall = function (code) {
        var _this = this;
        if (this.stop) {
            return;
        }
        clearTimeout(this.ballTimer);
        var _a = moveOffset[code], x = _a[0], y = _a[1];
        var _b = this.ball.coord, bx = _b[0], by = _b[1];
        var _c = [bx + x, by + y], tx = _c[0], ty = _c[1];
        if (coordEq(this.goal.coord, [tx, ty])) {
            this.map.data[tx][ty] = Item['ball'];
            this.map.data[bx][by] = Item['ground'];
            alert('win!');
            return;
        }
        if (coordEq(this.cat.coord, [tx, ty])) {
            return;
        }
        var target = this.map.data[tx][ty];
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
var $text = document.querySelector('#text');
var $run = document.querySelector('#run');
$run.addEventListener('click', function () {
    controller.start($text.value);
});
$run.click();
