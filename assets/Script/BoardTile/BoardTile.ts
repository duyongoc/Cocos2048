// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    tile: cc.Prefab = null;

    offset = 150;
    size = 4;

    sizeInit = 4;

    boardTile: cc.Node[] = [];

    count = 1;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.RegisterEventKeyboard();
    }

    start() {

        var x = this.offset;
        var y = this.offset * 4;

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                
                var vec = new cc.Vec2(x, y);
                var obj = cc.instantiate(this.tile);

                this.CreateTile(obj, vec);
                obj.getComponent('Tile').SetOrderString(this.count);

                this.count++;
                x = x + this.offset;
            }
            
            x = this.offset;
            y = y - this.offset;
        }

        //this.CreateRandomTile();
    }

    // update (dt) {}

    CreateTile(obj, vec: cc.Vec2) {

        var pos = this.node.getParent().convertToNodeSpaceAR(vec);
        obj.setPosition(pos);

        this.node.getParent().addChild(obj);
        this.boardTile.push(obj);
        
    }

    CreateRandomTile()
    {
        while(this.sizeInit >= 0){
            var rand = this.random(0, this.boardTile.length);
            this.boardTile[parseInt(rand)].getComponent('Tile').SetValueString();
            this.sizeInit--;
        }
    }

    RegisterEventKeyboard() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    UnRegisterEventKeyboard(){
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

    OnBoardTileMoveUp(){
        cc.log("press key up");

    }

    OnBoardTileMoveDown(){
        cc.log("press key down");

    }

    OnBoardTileMoveRight(){
        cc.log("press key right");

    }

    OnBoardTileMoveLeft(){
        cc.log("press key left");

    }

    random(min, max){
        return min + Math.random() * (max - min) ;
    }

    onDestroy(){
        this.UnRegisterEventKeyboard();
    }
}
