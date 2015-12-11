(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var Rule = require("./cellularAutomata/rule");
var Automaton = require("./cellularAutomata/automaton");
var Row = require("./cellularAutomata/row");
var CircularBuffer = require("./cellularAutomata/circularBuffer");
var View = require("./cellularAutomata/view");
var CanvasView = require("./cellularAutomata/canvasView");

var CellularAutomata = function (params) {
  var self = this;
  var rule = new Rule(params.rule);
  var automaton = new Automaton(rule);

  var row = new Row(params.width);
  row.set(params.width - 2, true);

  var circularBuffer = new CircularBuffer(params.height);
  circularBuffer.push(row);

  var view = new View(circularBuffer);
  var canvasView = new CanvasView(params.canvas, view);

  self.get = function (x, y) {
    return view.get(x, y);
  };

  self.step = function () {
    var nextRow = automaton.nextRow(row);

    circularBuffer.push(nextRow);
    row = nextRow;
  };

  self.setRule = function (ruleName) {
    rule = new Rule(ruleName);
    automaton.setRule(rule);
  };

  self.render = function () {
    canvasView.render();
  };
};

module.exports = CellularAutomata;

if (typeof window !== "undefined") {
  window.CellularAutomata = module.exports;
}

},{"./cellularAutomata/automaton":2,"./cellularAutomata/canvasView":3,"./cellularAutomata/circularBuffer":4,"./cellularAutomata/row":5,"./cellularAutomata/rule":6,"./cellularAutomata/view":7}],2:[function(require,module,exports){
"use strict";

var Row = require("./row");

var Automaton = function (startRule) {
  var self = this;
  var rule = startRule;

  self.nextRow = function (row) {
    var length = row.length();
    var nextRow = new Row(length);

    for (var i = 0; i < length; i += 1) {
      var left = get(row, i - 1, length);
      var center = get(row, i, length);
      var right = get(row, i + 1, length);

      var alive = rule.apply(left, center, right);
      nextRow.set(i, alive);
    }

    return nextRow;
  };

  self.setRule = function (newRule) {
    rule = newRule;
  };

  var get = function (row, index, length) {
    if (index >= 0 && index < length) {
      return row.get(index);
    } else {
      return false;
    }
  };
};

module.exports = Automaton;

},{"./row":5}],3:[function(require,module,exports){
"use strict";

var CanvasView = function (canvas, view) {
  var self = this;
  var initialized, context, imageData, scale;

  var initialize = function () {
    context = canvas.getContext("2d");
    imageData = context.createImageData(canvas.width, canvas.height);

    scale = canvas.width / view.width();
  };

  self.render = function () {
    if (!initialized) {
      initialize();
      initialized = true;
    }

    for (var y = 0; y < view.height(); y += 1) {
      for (var x = 0; x < view.width(); x += 1) {
        var color = view.get(x, y) ? 0 : 255;
        setCell(x, y, color);
      }
    }

    redraw();
  };

  var setCell = function (x, y, color) {
    var xOffset = x * scale;
    var yOffset = y * scale;

    for (var i = 0; i < scale; i += 1) {
      for (var j = 0; j < scale; j += 1) {
        setPixel(xOffset + i, yOffset + j, color);
      }
    }
  };

  var setPixel = function (x, y, color) {
    var offset = (y * canvas.width + x) * 4;

    imageData.data[offset + 0] = color;
    imageData.data[offset + 1] = color;
    imageData.data[offset + 2] = color;
    imageData.data[offset + 3] = 255;
  };

  var redraw = function () {
    context.putImageData(imageData, 0, 0);
  };
};

module.exports = CanvasView;

},{}],4:[function(require,module,exports){
"use strict";

var CircularBuffer = function (fixedSize) {
  var self = this;
  var buffer = new Array(fixedSize);
  var start = 0;
  var length = 0;

  self.length = function () {
    return length;
  };

  self.fixedSize = function () {
    return fixedSize;
  };

  self.get = function (index) {
    var adjustedIndex = (index + start) % fixedSize;
    return buffer[adjustedIndex];
  };

  self.push = function (element) {
    var adjustedIndex = (length + start) % fixedSize;
    buffer[adjustedIndex] = element;

    if (length < fixedSize) {
      length += 1;
    } else {
      start = (start + 1) % fixedSize;
    }
  };
};

module.exports = CircularBuffer;

},{}],5:[function(require,module,exports){
"use strict";

var Row = function (length) {
  var self = this;
  var cells = new Array(length);

  for (var i = 0; i < length; i += 1) {
    cells[i] = false;
  }

  self.length = function () {
    return length;
  };

  self.get = function (index) {
    return cells[index];
  };

  self.set = function (index, alive) {
    cells[index] = alive;
  };
};

module.exports = Row;

},{}],6:[function(require,module,exports){
"use strict";

var Rule = function (name) {
  var self = this;
  var rules = [];

  var initialize = function () {
    var binary = name.toString(2);
    var padded = ("0000000" + binary);
    var substring = padded.substring(padded.length - 8);
    var characters = substring.split("");

    for (var i = 0; i < characters.length; i += 1) {
      var character = characters[i];
      rules.push(character === "1");
    }
  };

  self.apply = function (left, center, right) {
    var index = 0;

    if (!left) {
      index += 4;
    }

    if (!center) {
      index += 2;
    }

    if (!right) {
      index += 1;
    }

    return rules[index];
  };

  initialize();
};

module.exports = Rule;

},{}],7:[function(require,module,exports){
"use strict";

var View = function (circularBuffer) {
  var self = this;
  var width, height;

  var initialize = function () {
    var firstRow = circularBuffer.get(0);

    width = firstRow.length();
    height = circularBuffer.fixedSize();
  };

  self.width = function () {
    return width;
  };

  self.height = function () {
    return height;
  };

  self.get = function (x, y) {
    var row;
    if (y < circularBuffer.length()) {
      row = circularBuffer.get(y);
    }

    if (row && x < width) {
      return row.get(x);
    } else {
      return false;
    }
  };

  initialize();
};

module.exports = View;

},{}]},{},[1]);
