"use strict";

var SpecHelper = require("../specHelper");
var describedClass = require("../../lib/cellularAutomata/canvasView");
var Row = require("../../lib/cellularAutomata/row");
var CircularBuffer = require("../../lib/cellularAutomata/circularBuffer");
var View = require("../../lib/cellularAutomata/view");

describe("CanvasView", function () {
  var subject, canvas;

  beforeEach(function () {
    var row = new Row(4);
    row.set(2, true);

    var circularBuffer = new CircularBuffer(2);
    circularBuffer.push(row);

    var view = new View(circularBuffer);
    canvas = SpecHelper.mockCanvas();

    subject = new describedClass(canvas, view);
  });

  it("renders alive cells in black and dead cells in white", function () {
    subject.render();

    var context = canvas.getContext("2d");
    var imageData = context.getImageData();

    expect(imageData.data).toEqual([
      255,255,255,255,
      255,255,255,255,
      255,255,255,255,
      255,255,255,255,
      0,0,0,255,
      0,0,0,255,
      255,255,255,255,
      255,255,255,255,

      255,255,255,255,
      255,255,255,255,
      255,255,255,255,
      255,255,255,255,
      0,0,0,255,
      0,0,0,255,
      255,255,255,255,
      255,255,255,255,

      255,255,255,255,
      255,255,255,255,
      255,255,255,255,
      255,255,255,255,
      255,255,255,255,
      255,255,255,255,
      255,255,255,255,
      255,255,255,255,

      255,255,255,255,
      255,255,255,255,
      255,255,255,255,
      255,255,255,255,
      255,255,255,255,
      255,255,255,255,
      255,255,255,255,
      255,255,255,255
    ]);
  });
});
