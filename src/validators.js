'use strict'
const validation = {
  mustBeInRange(minimumValue, maximumValue) {
    return function(value) {
      return (
        (parseFloat(value) >= minimumValue &&
          parseFloat(value) <= maximumValue) ||
        `Должно быть в диапазоне ${minimumValue} - ${maximumValue}`
      )
    }
  },
}
