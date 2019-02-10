// Компонент - ячейка матрицы.
// Квадратная ячейка с числовым значением из Value
// При указании ненулевого spotNo подкрашивается в цвет
// При щелчке эмитирует событие input c новым значением ячейки
Vue.component('matrix-cell', {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    spotNo: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    cellStyle() {
      if (this.value && this.spotNo) {
        return {
          backgroundColor: colors[this.spotNo % colors.length],
        }
      }
    },
  },
  template: `
    <div class="cell" :style="cellStyle" @click="emitClick">{{value}}</div>
  `,
  methods: {
    emitClick() {
      this.$emit('input', 1 - this.value)
    },
  },
})
