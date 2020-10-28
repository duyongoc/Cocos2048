
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    tile: cc.Prefab = null;

    offset = 150;

    @property(cc.Float)
    size = 4;

    sizeInit = 7;

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
            this.slide(i, 0);
        }
    }

    OnBoardTileMoveLeft() {
        cc.log("press key left");
        for (let j = 0; j < this.size; j++) {
            var value = 0;
            for (let i = this.size - 1; i >= 0; i--) {
                // cc.log( i + j + " / "+ this.boardTile[i][j].getComponent('Tile').value);
                value += this.boardTile[j][i].getComponent('Tile').value;
                this.boardTile[j][i].getComponent('Tile').SetValueString(0);

                if (i == 0) {
                    this.boardTile[j][i].getComponent('Tile').SetValueString(value);
                }
            }
        }

    }

    slide(x, y) {

        var i = x;
        var j = y;
        //for(let i = 0; i < this.size; i++){
        var arrValue: cc.Node[] = [];

        let z = 0;
        for (let w = 0; w < this.size; w++) {
            if (this.boardTile[i][w].getComponent('Tile').value != 0) {
                arrValue[z] = new cc.Node();
                arrValue[z] = this.boardTile[i][w];
                z++;
            }
        }

        for (let k = 0; k < arrValue.length; k++) {
            if (k + 1 < arrValue.length && arrValue[k].getComponent('Tile').value == arrValue[k + 1].getComponent('Tile').value) {
                arrValue[k].getComponent('Tile').value += arrValue[k].getComponent('Tile').value;
                arrValue[k + 1].getComponent('Tile').value = 0;
            }
        }

        cc.log("---------------");
        cc.log("row  " + i + " /  len " + arrValue.length);

        var arrTmp: cc.Node[] = [];
        for (let q = 0; q < this.size; q++) {
            arrTmp[q] = new cc.Node();
            arrTmp[q] = this.boardTile[i][q];
        }

        for (let t = 0; t < arrValue.length; t++) {
            cc.log("index: " + t + " / " + "arrTmp: " + arrValue[t].getComponent('Tile').value);
            
        }

        // var p = arrValue.length - 1;
        // for (let t = 0; t < this.size; t++) {
        //     cc.log("index: " +  p + " / " + "arrTmp: " + arrValue[p].getComponent('Tile').value);
            
        //     if ( && arrValue[p].getComponent('Tile').value != 0) {
        //         arrTmp[t].getComponent('Tile').value = arrValue[p].getComponent('Tile').value;
        //         p--;
        //     }
        //     else
        //         arrTmp[t].getComponent('Tile').value = 0;
            
        // }

        var p = this.size - 1;
        for (let t = 0; t < arrValue.length; t++) {

            if (arrValue[t].getComponent('Tile').value != 0) {
                arrTmp[p].getComponent('Tile').value = arrValue[t].getComponent('Tile').value;
                p--;
            }
            else
                arrTmp[p].getComponent('Tile').value = 0;
            
        }


        for (let t = 0; t <= p ; t++) {
            arrTmp[t].getComponent('Tile').value = 0;
        }



        for (let u = 0; u < this.size; u++) {
            //cc.log("index: " + u + " / " + "arrValue: " + arrTmp[p].getComponent('Tile').value);
            //if(arrTmp[u].getComponent('Tile').value != 0)
            //this.boardTile[i][u].getComponent('Tile').value = 0;
        this.boardTile[i][u].getComponent('Tile').SetValueString(arrTmp[u].getComponent('Tile').value);
            //cc.log("index: " + u + " / " + "arrValue: " + this.boardTile[i][u].getComponent('Tile').value);
            //     this.boardTile[i][u].getComponent('Tile').value = 0;
        }
        // for (let u = 0; u < this.size ; u++) {
        //     this.boardTile[i][u].getComponent('Tile').value = 0; 
        //     this.boardTile[i][u].getComponent('Tile').SetValueString(0);
        // }

        // let arr = async.filter(
        //     val => val.getComponent('Tile').value != 0
        //    //cc.log("value " + val.getComponent('Tile').value)
        // );

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
