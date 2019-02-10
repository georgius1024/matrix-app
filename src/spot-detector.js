/**
 * Class can detect spots in matrix
 * const x = new SpotDetector(matrix)
 * const spotList = x.spotList
 * const spotMap = x.spotMap
 */

'use strict'
class SpotDetector {
  constructor(matrix) {
    if (matrix) {
      this.proceed(matrix)
    }
  }
  proceed(matrix) {
    const spotList = []

    const processed = []
    const rows = matrix.length
    const cols = rows > 0 ? matrix[0].length : 0
    function markProcessed(row, col) {
      if (!processed[row]) {
        processed[row] = []
      }
      processed[row][col] = true
    }
    function cellValue(row, col) {
      if (row >= 0 && row < rows && col >= 0 && col < cols) {
        return matrix[row][col]
      }
    }
    function isProcessed(row, col) {
      return processed[row] && processed[row][col]
    }
    function newSpot() {
      spotList.push([])
    }
    function addToSpot(row, col) {
      const current = spotList[spotList.length - 1]
      current.push({ row, col })
    }
    function test(row, col, expanding = false) {
      if (isProcessed(row, col)) {
        return
      }
      markProcessed(row, col)
      const cell = cellValue(row, col)
      if (cell && !expanding) {
        newSpot()
      }
      if (cell) {
        addToSpot(row, col)
        // left neighbor
        if (cellValue(row, col - 1) && !isProcessed(row, col - 1)) {
          test(row, col - 1, true)
        }
        // right neighbor
        if (cellValue(row, col + 1) && !isProcessed(row, col + 1)) {
          test(row, col + 1, true)
        }
        // top neighbor
        if (cellValue(row - 1, col) && !isProcessed(row - 1, col)) {
          test(row - 1, col, true)
        }
        // bottom neighbor
        if (cellValue(row + 1, col) && !isProcessed(row + 1, col)) {
          test(row + 1, col, true)
        }
      }
    }
    // main loop
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        test(row, col)
      }
    }
    // Spot map filling
    this.spotMap = {}
    spotList.forEach((spot, index) => {
      spot.forEach(({ row, col }) => {
        if (!this.spotMap[row]) {
          this.spotMap[row] = {}
        }
        this.spotMap[row][col] = index + 1
      })
    })
    this.spotList = spotList
  }
}
