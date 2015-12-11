"use strict";

var describedClass = require("../../lib/cellularAutomata/row");

describe("Row", function () {
  var subject;

  beforeEach(function () {
    subject = new describedClass(10);
  });

  it("sets all cells to dead on initialization", function () {
    for (var i = 0; i < 10; i += 1) {
      expect(subject.get(i)).toEqual(false);
    }
  });

  it("provides a mechanism to get the length of the row", function () {
    expect(subject.length()).toEqual(10);
  });

  it("can set whether a cell is alive or dead", function () {
    subject.set(5, true);
    expect(subject.get(5)).toEqual(true);

    subject.set(5, false);
    expect(subject.get(5)).toEqual(false);
  });
});
