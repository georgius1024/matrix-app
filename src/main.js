'use strict'
Vue.config.productionTip = false
new Vue({
  el: '#app',
  data: {
    rows: 5,
    cols: 6,
    prob: 0.5,
    newRows: 5,
    newCols: 6,
    newProb: 0.5,
    matrix: [
      [1, 0, 0, 0, 1, 0],
      [1, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 1],
    ],
    spotCount: 0,
    spotMap: {},
    history: [],
    validation,
  },
  computed: {
    maxRows() {
      return 40
    },
    maxCols() {
      return 40
    },
    cellCount() {
      return this.rows * this.cols
    },
    filledCells() {
      return this.matrix.reduce((sum, row, index) => {
        if (index < this.rows) {
          return (
            sum +
            row.reduce((sum, value, index) => {
              if (index < this.cols) {
                return sum + value
              } else {
                return sum
              }
            }, 0)
          )
        } else {
          return sum
        }
      }, 0)
    },
    stats() {
      const filledCells = this.filledCells
      return `Размер: ${this.rows}×${this.cols}, количество ячеек: ${
        this.cellCount
      }, отмечено: ${filledCells} (${Number(
        (filledCells * 100) / this.cellCount
      ).toFixed(0)}%), количество доменов: ${this.spotCount}`
    },
    validDimensions() {
      return (
        this.newCols >= 1 &&
        this.newRows >= 1 &&
        this.newCols <= this.maxCols &&
        this.newRows <= this.maxRows
      )
    },
    validProb() {
      return this.newProb >= 0.01 && this.newProb < 0.99
    },
  },
  beforeMount() {
    this.restoreState()
  },
  methods: {
    resizeMatrix() {
      const newMatrix = new Array(this.newRows)
      for (let row = 0; row < this.newRows; row++) {
        newMatrix[row] = []
        for (let col = 0; col < this.newCols; col++) {
          if (row < this.matrix.length && col < this.matrix[row].length) {
            newMatrix[row][col] = this.matrix[row][col]
          } else {
            newMatrix[row][col] = 0
          }
        }
      }
      this.cols = this.newCols
      this.rows = this.newRows
      this.matrix = newMatrix
      this.forgetSpots()
      this.storeState()
    },
    populateMatrix() {
      this.prob = this.newProb
      this.matrix = []
      for (let row = 0; row < this.rows; row++) {
        this.matrix[row] = []
        for (let col = 0; col < this.cols; col++) {
          this.matrix[row][col] = Math.random() < this.prob ? 1 : 0
        }
      }
      this.detectSpots()
      this.history.push({
        prob: this.prob,
        spotCount: this.spotCount,
        rows: this.rows,
        cols: this.cols,
      })
      this.history = this.history.slice(-10)
      this.storeState()
    },
    storeState() {
      const {
        rows,
        cols,
        newRows,
        newCols,
        matrix,
        prob,
        newProb,
        history,
      } = this
      localStorage.setItem(
        'state',
        JSON.stringify({
          rows,
          cols,
          newRows,
          newCols,
          matrix,
          prob,
          newProb,
          history,
        })
      )
    },
    restoreState() {
      const stored = localStorage.getItem('state')
      if (stored) {
        const {
          rows,
          cols,
          newRows,
          newCols,
          matrix,
          prob,
          newProb,
          history,
        } = JSON.parse(stored)
        this.rows = rows
        this.cols = cols
        this.newRows = newRows
        this.newCols = newCols
        this.matrix = matrix
        this.prob = prob
        this.newProb = newProb
        this.history = history
      }
    },
    detectSpots() {
      const mapper = new SpotDetector(this.matrix)
      this.spotMap = mapper.spotMap
      this.spotCount = mapper.spotList.length
    },
    forgetSpots() {
      this.spotMap = {}
      this.spotCount = 0
    },
  },
})
