import { _decorator, Color, Component, Node, Sprite, SpriteFrame } from 'cc';
import { ItemAround } from './ItemAround';
const { ccclass, property } = _decorator;

@ccclass('ItemAroundController')
export class ItemAroundController extends Component {
    @property({
        type: SpriteFrame,
        tooltip: 'List sprite item'
    })
    private listSpriteItem: SpriteFrame[] = [];

    private listItemAround: Node[] = [];

    private speed: number = 0.1;

    private count: number = 0;

    private tempNode: Node = null;

    private index: number = 0;

    public isCheck: boolean = false;

    private distance: number = 0;

    public type: number = 0;

    public scheduleCallBack: any;
    public scheduleCallBackAfterSpace: any;

    public setIndex(index: number): void {
        this.index = index;
    }

    private init(): void {
        let arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        let initPosX = -150;
        let initPosY = 300;
        for (let i = 0; i <= 17; i++) {
            let newNode = new Node();
            this.node.addChild(newNode);
            let itemAround = newNode.addComponent(ItemAround);
            let j = i % 9;
            itemAround.init(this.listSpriteItem[arr[j]], initPosX, initPosY , arr[i]);
            this.listItemAround.push(newNode);
            if (i > -1 && i < 3) {
                initPosX += 100;
                initPosY = 300;
            } else if (i >= 3 && i < 9) {
                initPosX = 150;
                initPosY -= 100;
            } else if (i >= 9 && i < 12) {
                initPosX -= 100
                initPosY = -300;
            } else if(i >= 12 && i <= 16) {
                initPosX = -150;
                initPosY += 100;
            }
        };
    }

    
    protected start(): void {
        this.init();
        console.log(this.listItemAround);
    }

    protected update(dt: number): void {
        
    }

    public startAnim(type: number): void {
        this.speed = 0.025
        this.listItemAround[this.type].getComponent(Sprite).color = Color.WHITE;
        this.scheduleCallBack = function(){
            this.type++;
            this.listItemAround[this.type - 1].getComponent(Sprite).color = Color.GRAY;
            if (this.type === 18) {
                this.type = 0;
            }
            this.listItemAround[this.type].getComponent(Sprite).color = Color.WHITE;
            if (this.isCheck) {
                let newType = this.type % 9;
                // console.log(this.type);
                // this.listItemAround[this.type].getComponent(Sprite).color = Color.GRAY;

                // this.listItemAround[type].getComponent(Sprite).color = Color.WHITE;

                // this.type = type;
                this.speed = 1;

                if (this.type === type) {
                    this.unschedule(this.scheduleCallBack);
                }
            }
        };

        this.schedule(this.scheduleCallBack, this.speed)
    }
}

