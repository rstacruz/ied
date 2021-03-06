'use strict'

var completed = 0
var started = 0
var columns = 30

/**
 * A basic progress bar. Nothing fancy. This should probably be an
 * external dependency.
 *
 * @type {Object}
 */
var progress = {
  complete: function (n) {
    completed += n
    this.draw()
    if (started === completed) {
      this.clear()
    }
  },
  start: function (n) {
    started += n
    this.draw()
  },
  draw: function () {
    // Don't show progress bar when logger is enabled
    if (process.env.NODE_DEBUG) return
    var ratio = started ? completed / started : 0
    var percentage = Math.ceil(ratio * 10000) / 100
    process.stderr.cursorTo(0)
    var barWidth = Math.floor(columns * ratio)
    var bar = '['
    for (var i = 0; i < columns; i++) {
      bar += i <= barWidth ? '=' : ' '
    }
    bar += '] '
    process.stderr.write(bar + percentage.toFixed(2) + '%')
    process.stderr.clearLine(1)
  },
  clear: function () {
    process.stderr.clearLine()
    process.stderr.cursorTo(0)
  }
}

module.exports = progress
