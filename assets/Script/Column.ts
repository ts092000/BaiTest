import { _decorator, Component, Node, SpriteFrame, tween, Vec3 } from 'cc';
import { ItemSpin } from './ItemSpin';
const { ccclass, property } = _decorator;

@ccclass('Column')
export class Column extends Component {
    private listItemSpin: Node[] = [];

    @property({
        type: SpriteFrame,
        tooltip: 'List sprite item'
    })
    private listSpriteItem: SpriteFrame[] = [];

    private speed: number = 0;

    private count: number = 0;

    private tempNode: Node = null;

    private index: number = 0;

    private isCheck: boolean = false;

    private distance: number = 0;

    public setIndex(index: number): void {
        this.index = index;
    }

    protected start(): void {
        this.init();
    }

    private init(): void {
        let arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        this.shuffleArray(arr);
  
        for (let i = -2; i <= 3; i++) {
            let newNode = new Node();
            this.node.addChild(newNode);
            let itemSpin = newNode.addComponent(ItemSpin);
            console.log(ItemSpin);
            itemSpin.init(this.listSpriteItem[arr[i + 2]], i * 150, arr[i + 2]);
            this.listItemSpin.push(newNode);
        };
    }

    protected update(dt: number): void {
        if (this.speed <= 0 || !this.tempNode) return;
        if (!this.isCheck && this.speed < 2500) this.speed += 2500 * dt;
        console.log(this.speed);

        if (this.speed >= 2500 && !this.isCheck) {
            this.distance = this.tempNode.position.y < 0 ? 1200 - Math.abs(this.tempNode.position.y) : 900 + this.tempNode.position.y;
            this.isCheck = true;
        }

        if (this.isCheck) this.speed -= this.distance * dt;

        if (this.speed <= 0) {
            this.listItemSpin.sort((a, b) => a.position.y - b.position.y);
            this.listItemSpin.map((item, index) => {
                tween(item).to(0.3, { position: new Vec3(0, item.position.y - this.tempNode.position.y) }).start()
            });
        }

        for (let item of this.listItemSpin) {
            item.setPosition(item.position.x, item.position.y - this.speed * dt);
            if (item.position.y < -300) item.setPosition(0, this.getHighest().position.y + 100);
        }
    }

    

    public startSpin(speed: number, type: number,): void {
        this.isCheck = false;
        // this.listItemSpin.sort((a, b) => a.position.y - b.position.y);
        // this.listItemSpin.forEach((item, index) => item.setPosition(new Vec3(0, (index - 2) * 100)));
        this.tempNode = this.listItemSpin.find((item) => item.getComponent(ItemSpin).getType() === type);
        this.speed = 1;
        this.count = 0;
  
     }

    public getHighest(): Node {
        let temp: Node = this.listItemSpin[0];
        for (let item of this.listItemSpin) {
            if (item.position.y > temp.position.y) temp = item;
        }
        return temp;
    }

    public getSpeed(): number {
        return this.speed;
    }

    private shuffleArray(array: Array<number>): void {
        let index = array.length;
        while (index > 0) {
            let randomIndex = Math.floor(Math.random() * index);
            index--;

            let temp = array[index];
            array[index] = array[randomIndex];
            array[randomIndex] = temp;
        }
    }
}


