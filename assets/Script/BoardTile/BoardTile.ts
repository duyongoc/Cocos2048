
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    tile: cc.Prefab = null;

    offset = 150;

    @property(cc.Float)
    size = 4;

    sizeInit = 10;

    boardTile: cc.Node[][] = [];

    count = 1;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.RegisterEventKeyboard();
    }

    start() {
        for (var i = 0; i < this.size; i++) {
            this.boardTile[i] = [];
            for (var j = 0; j < this.size; j++) {
                this.boardTile[i][j] = new cc.Node();
            }
        }

        var x = this.offset;
        var y = this.offset * 4;

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {

                var vec = new cc.Vec2(x, y);
                var obj = cc.instantiate(this.tile);

                this.CreateTile(obj, vec);
                obj.getComponent('Tile').SetEmptyValue();
                this.boardTile[i][j] = obj;

                this.count++;
                // cc.log(this.count);
                x = x + this.offset;
            }

            x = this.offset;
            y = y - this.offset;
        }

        this.CreateRandomTile();
    }

    // update (dt) {}

    CreateTile(obj, vec: cc.Vec2) {

        var pos = this.node.getParent().convertToNodeSpaceAR(vec);
        obj.setPosition(pos);
        this.node.getParent().addChild(obj);

    }

    CreateRandomTile() {

        while (this.sizeInit > 0) {
            var randX = this.random(0, this.size);
            var randY = this.random(0, this.size);
            this.boardTile[parseInt(randX)][parseInt(randY)].getComponent('Tile').SetValueString(2);

            this.sizeInit--;
        }
    }

    RegisterEventKeyboard() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    UnRegisterEventKeyboard() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.left || cc.macro.KEY.a:
                this.OnBoardTileMoveLeft();
                break;
            case cc.macro.KEY.right || cc.macro.KEY.d:
                this.OnBoardTileMoveRight();
                break;
            case cc.macro.KEY.up || cc.macro.KEY.w:
                this.OnBoardTileMoveUp();
                break;
            case cc.macro.KEY.down || cc.macro.KEY.a:
                this.OnBoardTileMoveDown();
                break;
        }
    }

    onKeyUp(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.left || cc.macro.KEY.a:
                //cc.log("release key left");
                break;
            case cc.macro.KEY.right || cc.macro.KEY.d:
                // cc.log("release key right");
                break;
            case cc.macro.KEY.up || cc.macro.KEY.w:
                // cc.log("release key up");
                break;
            case cc.macro.KEY.down || cc.macro.KEY.a:
                // cc.log("release key down");
                break;
        }
    }

    OnBoardTileMoveUp() {
        cc.log("press key up");
        for (let i = this.size - 1; i >= 0; i--) {
            var value = 0;
            for (let j = this.size - 1; j >= 0; j--) {
                // cc.log( i + j + " / "+ this.boardTile[i][j].getComponent('Tile').value);
                value += this.boardTile[j][i].getComponent('Tile').value;
                this.boardTile[j][i].getComponent('Tile').SetValueString(0);

                if (j == 0) {
                    this.boardTile[j][i].getComponent('Tile').SetValueString(value);
                }
            }
        }

    }

    OnBoardTileMoveDown() {
        cc.log("press key down");
        for (let i = 0; i < this.size; i++) {
            var value = 0;
            for (let j = 0; j < this.size; j++) {
                // cc.log( i + j + " / "+ this.boardTile[i][j].getComponent('Tile').value);
                value += this.boardTile[j][i].getComponent('Tile').value;
                this.boardTile[j][i].getComponent('Tile').SetValueString(0);

                if (j == 3) {
                    this.boardTile[j][i].getComponent('Tile').SetValueString(value);
                }
            }
        }

    }

    OnBoardTileMoveRight() {
        cc.log("press key right");

        for (let i = 0; i < this.size; i++) {
            this.slideright(i, 0);
        }
    }

    OnBoardTileMoveLeft() {
        cc.log("press key left");
        
        for (let i = 0; i < this.size; i++) {
            this.slideleft(i, 0);
        }

    }

    slideright(x, y) {

        let i = x;
        let j = y;
        let arrValue: cc.Node[] = [];
        let z = 0;
        for (let w = 0; w < this.size; w++) {
            if (this.boardTile[i][w].getComponent('Tile').value != 0) {
                arrValue[z] = new cc.Node();
                arrValue[z] = this.boardTile[i][w];
                z++;
            }
        }

        for (let k = arrValue.length -1; k >= 0; k--) {
            if (k - 1 >= 0 && arrValue[k].getComponent('Tile').value == arrValue[k - 1].getComponent('Tile').value) {
                arrValue[k].getComponent('Tile').value += arrValue[k].getComponent('Tile').value;
                arrValue[k - 1].getComponent('Tile').value = 0;
            }
        }

        cc.log("---------------");
        cc.log("row  " + i + " /  len " + arrValue.length);

        let arrTmp: cc.Node[] = [];
        for (let q = 0; q < this.size; q++) {
            arrTmp[q] = new cc.Node();
            arrTmp[q] = this.boardTile[i][q];
        }

        let arrValue2: cc.Node[] = [];
        let o = 0;
        for (let w = 0; w < arrValue.length; w++) {
            if (arrValue[w].getComponent('Tile').value != 0) {
                arrValue2[o] = new cc.Node();
                arrValue2[o] = arrValue[w];
                o++;
            }
        }
        for (let t = 0; t < arrValue2.length; t++) {
            cc.log("arrValue2.length: " + arrValue2.length + " / " + "arrTmp: " + arrValue2[t].getComponent('Tile').value);
        }

        let m = arrValue2.length - 1;
        for (let n = this.size -1 ; n >= 0; n--) {
            cc.log("index: " +  m + " / " + "====: ");
            if (m >= 0 && arrValue2[m].getComponent('Tile').value != 0) {
                cc.log("index: " +  m + " / " + "====: " + arrValue2[m].getComponent('Tile').value);
                arrTmp[n].getComponent('Tile').value = arrValue2[m].getComponent('Tile').value;
                m--;
            }
            else
                arrTmp[n].getComponent('Tile').value = 0;
        }
      
        for (let t = 0; t < this.size ; t++) {
            //cc.log("index: " + t + " / " + "arrTmp: " + arrTmp[t].getComponent('Tile').value);
        }

        for (let u = 0; u < this.size; u++) {
            this.boardTile[i][u].getComponent('Tile').SetValueString(arrTmp[u].getComponent('Tile').value);
        }
    }

    slideleft(x, y) {

        var i = x;
        var j = y;
        let arrValue: cc.Node[] = [];
        let z = 0;
        for (let w = 0; w < this.size; w++) {
            if (this.boardTile[i][w].getComponent('Tile').value != 0) {
                arrValue[z] = new cc.Node();
                // var vec = new cc.Vec2(0,0);
                // var obj = cc.instantiate(this.tile);

                // this.CreateTile(obj, vec);
                // obj.getComponent('Tile').SetEmptyValue();
                // arrValue[z] = obj;
                // arrValue[z].getComponent('Tile').value = this.boardTile[i][w].getComponent('Tile').value;

                arrValue[z] = this.boardTile[i][w];
                z++;
            }
        }

        for (let k = arrValue.length -1; k >= 0; k--) {
            if (k - 1 >= 0 && arrValue[k].getComponent('Tile').value == arrValue[k - 1].getComponent('Tile').value) {
                arrValue[k].getComponent('Tile').value += arrValue[k].getComponent('Tile').value;
                arrValue[k - 1].getComponent('Tile').value = 0;
            }
        }

        cc.log("---------------");
        cc.log("row  " + i + " /  len " + arrValue.length);

        let arrTmp: cc.Node[] = [];
        for (let q = 0; q < this.size; q++) {
            arrTmp[q] = new cc.Node();
            arrTmp[q] = this.boardTile[i][q];
        }

        let arrValue3: cc.Node[] = [];
        let o = 0;
        for (let w = 0; w < arrValue.length; w++) {
            if (arrValue[w].getComponent('Tile').value != 0) {
                arrValue3[o] = new cc.Node();
                arrValue3[o] = arrValue[w];
                o++;
            }
        }
        for (let t = 0; t < arrValue.length; t++) {
            cc.log("length: " + t + " / " + "arrValue: " + arrValue[t].getComponent('Tile').value);
        }
        for (let t = 0; t < arrValue3.length; t++) {
            cc.log("length: " + t + " / " + "arrTmp: " + arrValue3[t].getComponent('Tile').value);
        }

        for (let n = 0, m = arrValue3.length - 1; n < this.size; n++) {
            if (m >= 0  && arrValue3[m].getComponent('Tile').value != 0) {
                cc.log("length: " + m + " / " + "arrTmp: " + arrValue3[m].getComponent('Tile').value);
                //cc.log("index: " +  m + " / " + "mmmm: " + arrValue2[m].getComponent('Tile').value);
                //cc.log("index: " +  n + " / " + "nnnn: " + arrTmp[n].getComponent('Tile').value);
                arrTmp[n].getComponent('Tile').value = arrValue3[m--].getComponent('Tile').value;
            }
            else
                arrTmp[n].getComponent('Tile').value = 0;
        }

        for (let u = 0; u < this.size; u++) {
            this.boardTile[i][u].getComponent('Tile').SetValueString(arrTmp[u].getComponent('Tile').value);
        }
    }

    Log(arr) {
        arr.forEach(element => {
            cc.log("+++++--" + element.getComponent('Tile').value);
        });
    }

    random(min, max) {
        return min + Math.random() * (max - min);
    }

    onDestroy() {
        this.UnRegisterEventKeyboard();
    }
}
