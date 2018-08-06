import Grid from './grid'

export default class Game {
  constructor() {
    this.size = 4
    this.grid = new Grid(this.size)
    this.setValueToCells(2)
  }
  // 随机取number个格子填充数字
  setValueToCells(number) {
    for (let i = 0; i < number; i++) {
      if (this.grid.isHasEmptyCell()) {
        let val = Math.random() < 0.85 ? 2 : 4
        let cell = this.grid.randomNullValueCell()
        cell.value = val
        this.grid.setCellValue(cell)
      }
    }
  }
  // 滑动格子，direction方向：0:上，1右，2下，3左
  slideCells(direction) {
    let list = []
    // 根据滑动方向生成size个数组
    for (let i = 0; i < this.size; i++) {
      list[i] = []
      for (let j = 0; j < this.size; j++) {
        switch (direction) {
          case 0: // 上
            list[i].push(this.grid.rows[j][i])
            break
          case 1:
            list[i].push(this.grid.rows[i][this.size - 1 - j])
            break
          case 2:
            list[i].push(this.grid.rows[this.size - 1 - j][i])
            break
          case 3:
            list[i].push(this.grid.rows[i][j])
            break
          default:
            break
        }
      }
    }
    // 靠边
    list = this.allCellsToSide(list)
    let score = 0
    // 挨着的格子且值相同的合并
    for (let i = 0; i < this.size; i++) {
      for (let j = 1; j < this.size; j++) {
        if (list[i][j - 1].value === list[i][j].value && list[i][j].value !== '') {
          list[i][j - 1].value = list[i][j - 1].value + list[i][j].value
          score += list[i][j - 1].value
          list[i][j].value = ''
          this.grid.setCellValue(list[i][j - 1])
          this.grid.setCellValue(list[i][j])
        }
      }
    }
    // 再次靠边
    list = this.allCellsToSide(list)
    // 随机一个格子赋值
    this.setValueToCells(1)
    return score
  }
  // 有值的格子靠边排
  allCellsToSide(list) {
    for (let index = 0; index < list.length; index++) {
      let listCells = list[index]
      let pos = 0
      for (let i = 0; i < listCells.length; i++) {
        if (listCells[i].value !== '') {
          let cellVal = listCells[i].value
          list[index][i].value = ''
          this.grid.setCellValue(list[index][i])
          list[index][pos].value = cellVal
          this.grid.setCellValue(list[index][pos])
          pos++
        }
      }
    }
    return list
  }

  isGameOver() {
    if (this.grid.isHasEmptyCell()) {
      return false
    }
    for (let i = 0; i < this.size; i++) {
      for (let j = 1; j < this.size; j++) {
        if (this.grid.rows[i][j].value === this.grid.rows[i][j - 1].value) {
          return false
        }
      }
    }
    for (let i = 0; i < this.size; i++) {
      for (let j = 1; j < this.size; j++) {
        if (this.grid.rows[j][i].value === this.grid.rows[i - 1][j].value) {
          return false
        }
      }
    }

    return true
  }
}
