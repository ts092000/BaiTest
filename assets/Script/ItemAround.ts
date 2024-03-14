import { _decorator, Color, Component, Node, Sprite, SpriteFrame, UITransform } from 'cc';
import { ItemType } from './DataType';
const { ccclass, property } = _decorator;

@ccclass('ItemAround')
export class ItemAround extends Component {
    private type: ItemType = ItemType.Item1;

    public init(spriteFrame: SpriteFrame, positionX: number, positionY: number, type: ItemType): void {
        this.type = type;

        let width = 70;
        this.node.addComponent(UITransform);
        this.node.getComponent(UITransform).setContentSize(0.25, 0.25);
        
        this.node.addComponent(Sprite).spriteFrame = spriteFrame;
        this.node.setPosition(positionX, positionY);
        let widthTrans = this.node.getComponent(UITransform).width;
        this.node.setScale(width / widthTrans, width / widthTrans, 1);
        this.node.getComponent(Sprite).color = Color.GRAY;
    }

    public getType(): ItemType {
        return this.type;
    }
}


