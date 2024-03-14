import { _decorator, Component, Node } from 'cc';
import { Model } from './Model';
import { View } from './View';
import { ResultSpin } from './DataType';
const { ccclass, property } = _decorator;

@ccclass('Controller')
export class Controller extends Component {
    @property({type: Model})
    private Model: Model;

    @property({type: View})
    private View: View;

    private randomType: number[] = [];
    private result: ResultSpin[] = [];

    protected start(): void {
        
    }

    protected update(dt: number): void {
        
    }

    
}


