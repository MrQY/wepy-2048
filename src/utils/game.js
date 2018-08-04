import Grid from './grid';

export default class Game {
    constructor() {
            this.size = 4;
            this.grid = new Grid(his.size);
        }
        //随机取number个格子填充数字
    setValueToCells(number) {
            for (let i = 0; i < number; i++) {
                if (this.grid.isHasEmptyCell()) {
                    let val = Math.random() < 0.85 ? 2 : 4;
                    let cell = this.grid.randomNullValueCell();
                    cell.value = val;
                    this.grid.setCellValue(cell);
                }
            }
        }
        //滑动格子，direction方向：0:上，1右，2下，3左
    slideCells(direction) {
        let list = [];
        //根据滑动方向生成size个数组
        for (let i = 0; i < this.size; i++) {
            list[i] = [];
            for (let j = 0; j < this.size; j++) {
                switch (direction) {
                    case 0: //上
                        list[i].push(this.grid.grid[j][i]);
                        break;
                    case 1:
                        list[i].push(this.grid.grid[i][this.size - 1 - j]);
                        break;
                    case 2:
                        list[i].push(this.grid.grid[this.size - 1 - j][i]);
                        break;
                    case 3:
                        list[i].push(this.grid.grid[i][j]);
                        break;
                    default:
                        break;
                }
            }
        }
    }
}