"use strict";

var describedClass = require("../../lib/cellularAutomata/view");
var Row = require("../../lib/cellularAutomata/row");
var CircularBuffer = require("../../lib/cellularAutomata/circularBuffer");

describe("View", function () {
  var subject, row, circularBuffer;

  beforeEach(function () {
    row = new Row(11);
    row.set(9, true);
    circularBuffer = new CircularBuffer(3);
    circularBuffer.push(row);
    subject = new describedClass(circularBuffer);
  });

  it("infers its width and height from the circular buffer", function () {
    expect(subject.width()).toEqual(11);
    expect(subject.height()).toEqual(3);
  });

  it("starts in the correct state", function () {
    expect(subject.get(8, 0)).toEqual(false);
    expect(subject.get(9, 0)).toEqual(true);
    expect(subject.get(10, 0)).toEqual(false);
    expect(subject.get(9, 1)).toEqual(false);
  });

  it("responds to changes in the circular buffer", function () {
    var anotherRow = new Row(11);
    anotherRow.set(8, true);
    anotherRow.set(9, true);
    circularBuffer.push(anotherRow);

    expect(subject.get(8, 0)).toEqual(false);
    expect(subject.get(9, 0)).toEqual(true);
    expect(subject.get(10, 0)).toEqual(false);

    expect(subject.get(7, 1)).toEqual(false);
    expect(subject.get(8, 1)).toEqual(true);
    expect(subject.get(9, 1)).toEqual(true);
    expect(subject.get(10, 1)).toEqual(false);
  });
});
