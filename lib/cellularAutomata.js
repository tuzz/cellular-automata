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
