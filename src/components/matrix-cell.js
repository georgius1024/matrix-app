/**
 *  Matrix cell component - tiny clickable square 
 * Props:
 * Value - 0/1
 * spotNo - >0 means cell is in spot and must be colored
 * When clicked emits input event
 */

/Vue.component('matrix-cell', {
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
