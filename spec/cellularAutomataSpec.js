"use strict";

var DescribedClass = require("../lib/cellularAutomata");

describe("CellularAutomata", function () {
  var subject;

  beforeEach(function () {
    subject = new DescribedClass({
      rule: 110,
      width: 4,
      height: 2
    });
  });

  it("sets up automaton with a single live cell", function () {
    // 0010
    // 0000
    expect(subject.get(0, 0)).toEqual(false);
    expect(subject.get(1, 0)).toEqual(false);
    expect(subject.get(2, 0)).toEqual(true);
    expect(subject.get(3, 0)).toEqual(false);
    expect(subject.get(0, 1)).toEqual(false);
    expect(subject.get(1, 1)).toEqual(false);
    expect(subject.get(2, 1)).toEqual(false);
    expect(subject.get(3, 1)).toEqual(false);
  });

  it("generates the expected output after some steps", function () {
    // 0010
    // 0110
    subject.step();
    expect(subject.get(0, 0)).toEqual(false);
    expect(subject.get(1, 0)).toEqual(false);
    expect(subject.get(2, 0)).toEqual(true);
    expect(subject.get(3, 0)).toEqual(false);
    expect(subject.get(0, 1)).toEqual(false);
    expect(subject.get(1, 1)).toEqual(true);
    expect(subject.get(2, 1)).toEqual(true);
    expect(subject.get(3, 1)).toEqual(false);

    // 0110
    // 1110
    subject.step();
    expect(subject.get(0, 0)).toEqual(false);
    expect(subject.get(1, 0)).toEqual(true);
    expect(subject.get(2, 0)).toEqual(true);
    expect(subject.get(3, 0)).toEqual(false);
    expect(subject.get(0, 1)).toEqual(true);
    expect(subject.get(1, 1)).toEqual(true);
    expect(subject.get(2, 1)).toEqual(true);
    expect(subject.get(3, 1)).toEqual(false);

    // 1110
    // 1010
    subject.step();
    expect(subject.get(0, 0)).toEqual(true);
    expect(subject.get(1, 0)).toEqual(true);
    expect(subject.get(2, 0)).toEqual(true);
    expect(subject.get(3, 0)).toEqual(false);
    expect(subject.get(0, 1)).toEqual(true);
    expect(subject.get(1, 1)).toEqual(false);
    expect(subject.get(2, 1)).toEqual(true);
    expect(subject.get(3, 1)).toEqual(false);
  });

  it("supports changing the rule mid-way through", function () {
    subject.step();
    subject.step();

    subject.setRule(126);

    // 0110 -> 1110
    // 1110 -> 1011 in rule 126
    subject.step();
    expect(subject.get(0, 0)).toEqual(true);
    expect(subject.get(1, 0)).toEqual(true);
    expect(subject.get(2, 0)).toEqual(true);
    expect(subject.get(3, 0)).toEqual(false);
    expect(subject.get(0, 1)).toEqual(true);
    expect(subject.get(1, 1)).toEqual(false);
    expect(subject.get(2, 1)).toEqual(true);
    expect(subject.get(3, 1)).toEqual(true);
  });
});
