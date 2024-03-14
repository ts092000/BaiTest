import { _decorator, Component, EventKeyboard, input, Input, KeyCode, Node, randomRangeInt } from 'cc';
import { Model } from './Model';
import { View } from './View';
import { ItemType, ResultSpin } from './DataType';
import { Column } from './Column';
const { ccclass, property } = _decorator;

@ccclass('Controller')
export class Controller extends Component {
    @property({type: Model})
    private Model: Model;

    @property({type: View})
    private View: View;

    // private randomType: number[] = [];
    private randomType: number[] = [];
    private result: ResultSpin[] = [];

    @property({
        type: Column,
        tooltip: 'Column spin'
    })
    private column: Column;

    private startSpin: boolean = false;
    // private CONFIG_RESULT = [
    //     [2, 4, 10], [5, 10, 25], [0, 0, 1], [0, 0, 1], [0, 0, 10], [1, 2, 3]
    // ]

    protected start(): void {
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);

        // for (let i = 0; i < 3; i++) this.randomType.push(ItemType.Item1);
        for (let i = 0; i < 9; i++) this.result.push({ item: i, count: 0, amount: 0 });
    }

    protected update(dt: number): void { 
        
    }

    onKeyUp (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.SPACE:
                if (!this.startSpin){
                    this.startSpin = true;
                    input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
                    this.scheduleOnce(function(){
                        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
                    }, 1)
                    this.scheduleOnce(function(){
                    }, 1)
                    for (let i = 0; i < 3; i++) 
                    this.randomType[i] = randomRangeInt(0, 9);
                    
                    console.log(this.randomType);
                    // this.column.setIndex(i + 1);
                    for (let i = 0; i < 3; i++) {
                        this.column.startSpin(3000, this.randomType[i]);
                        
                        setTimeout(() => {

                        }, i * 150);
                    }

                    for (let i = 0; i < 6; i++) {
                        this.result[i].count = 0;
                        this.result[i].amount = 0;
                    }

                    this.result.forEach((item, index) => {
                        item.count = this.randomType.filter((num) => num === item.item).length;
                        // if (item && item.count > 0) item.amount = this.CONFIG_RESULT[item.item][item.count - 1];
                    })
                    console.log('1');
                } 
                else {
                    this.column.isCheck = true;
                    input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
                    this.scheduleOnce(function(){
                        this.column.isCheck = false;

                        this.startSpin = false;
                        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
                    }, 3)
                    console.log('2');
                }
        }
    }
}


