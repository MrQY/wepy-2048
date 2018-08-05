import Cell from './cell';

export default class Grid {
    constructor(size) {
        this.size = size;
        this.cells = [];
        this.rows = [];
        this.init();
    }
    //初始化一个空的矩阵
    init() {
        for (let i = 0; i < this.size; i++) {
            this.rows[i] = [];
            for (let j = 0; j < this.size; j++) {
                let cell = new Cell(i, j, '');
                this.cells.push(cell);
                this.rows[i].push(cell);
            }
        }
    }
    //获取空格子
    getNullValueCells() {
        let cells = [];
        this.cells.forEach(c => {
            //console.log(c);
            if (c.value === '') {
                cells.push(c);
            }
        });
    }
    //随机从空格子选一个
    randomNullValueCell() {
        let cells = this.getNullValueCells();
        if (cells.length) {
            return cells[Math.floor(Math.random() * cells.length)];
        }
    }
    //给格子赋值
    setCellValue(newCell) {
        this.cells[this.size * newCell.y + newCell.x] = newCell;
        this.rows[newCell.x][newCell.y] = newCell;
    }

    //是否还有空格子
    isHasEmptyCell() {
        return this.getNullValueCells().length > 0;
    }
}