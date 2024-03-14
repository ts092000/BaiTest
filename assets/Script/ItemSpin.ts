import { _decorator, Component, Node, Sprite, SpriteFrame, UITransform } from 'cc';
import { ItemType } from './DataType';
const { ccclass, property } = _decorator;

@ccclass('ItemSpin')
export class ItemSpin extends Component {
    private type: ItemType = ItemType.Item1;

    public init(spriteFrame: SpriteFrame, positionY: number, type: ItemType): void {
        this.type = type;

        let width = 100;
        this.node.addComponent(UITransform);
        this.node.getComponent(UITransform).setContentSize(0.5, 0.5);
        
        this.node.addComponent(Sprite).spriteFrame = spriteFrame;
        this.node.setPosition(0, positionY);
        let widthTrans = this.node.getComponent(UITransform).width;


        this.node.setScale(width / widthTrans, width / widthTrans, 1);
    }

    public getType(): ItemType {
        return this.type;
    }
}


