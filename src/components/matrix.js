// Компонент - матрица.
// Принимает параметры
// rows и cols - размеры
// value - матрица с данными
// spotMap - массив, где для каждого row col определен номер домена или 0
// При щелчке по ячейке матрица обновляется
Vue.component('matrix', {
  props: {
    rows: {
      type: [Number, String],
      default: 0,
    },
    cols: {
      type: [Number, String],
      default: 0,
    },
    value: {
      type: Array,
      required: true,
    },
    spotMap: {
      type: Object,
      required: true,
    },
  },
  template: `
    <div class="matrix">
      <div class="matrix-row" v-for="row in rows" :key="row">
        <matrix-cell
          v-for="col in cols" 
          :key="col" 
          :value="getCellValue(row-1, col-1)" 
          :spot-no="getSpotNumber(row-1, col-1)"
          @input="toggle(row-1, col-1, $event)"
        >
        </matrix-cell>
      </div>
    </div>
  `,
  methods: {
    getCellValue(row, col) {
      if (row < this.value.length) {
        return this.value[row][col]
      }
      return 0
    },
    getSpotNumber(row, col) {
      if (this.spotMap[row]) {
        return this.spotMap[row][col]
      }
      return 0
    },
    toggle(row, col, value) {
      // Clone matrix object
      const newMatrix = Array.from(this.value, row => (row = Array.from(row)))
      newMatrix[row][col] = 1 - newMatrix[row][col]
      this.$emit('input', newMatrix)
    },
  },
})
