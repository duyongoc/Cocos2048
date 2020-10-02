// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

// var SpawnState;
// SpawnState = cc.Enum({
//     One: 1,
//     Two: 2,
//     Three: 3,
// });

@ccclass
export default class NewClass extends cc.Component {


    // @property({ type: cc.Enum(SpawnState) })
    // currentState = SpawnState.One;

    @property(cc.Color)
    myColors: cc.Color[] = [];

    @property(cc.Label)
    txtValue: cc.Label = null;

    @property(cc.Integer)
    value: number = 0;

    // onLoad () {}

    start () {
        //this.SetValueString();
        
    }

    // update (dt) {}

    public SetValueString()
    {
        this.txtValue.string = this.value.toString();
        this.node.color = this.myColors[0];
    }

    public SetOrderString(val)
    {
        cc.log("aaaaaa" + val); 
        this.txtValue.string = val;
        this.node.color = this.myColors[0];
    }

    
}
