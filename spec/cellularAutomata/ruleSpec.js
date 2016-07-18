"use strict";

var DescribedClass = require("../../lib/cellularAutomata/rule");

describe("Rule", function () {
  var subject;

  beforeEach(function () {
    subject = new DescribedClass(110);
  });

  it("applies the binary rule '01101110'", function () {
    expect(subject.apply(true, true, true)).toEqual(false);
    expect(subject.apply(true, true, false)).toEqual(true);
    expect(subject.apply(true, false, true)).toEqual(true);
    expect(subject.apply(true, false, false)).toEqual(false);
    expect(subject.apply(false, true, true)).toEqual(true);
    expect(subject.apply(false, true, false)).toEqual(true);
    expect(subject.apply(false, false, true)).toEqual(true);
    expect(subject.apply(false, false, false)).toEqual(false);
  });

  it("supports other rule names", function () {
    // 126 = 01111110 in binary
    subject = new DescribedClass(126);
    expect(subject.apply(true, true, true)).toEqual(false);
    expect(subject.apply(true, true, false)).toEqual(true);
    expect(subject.apply(true, false, true)).toEqual(true);
    expect(subject.apply(true, false, false)).toEqual(true);
    expect(subject.apply(false, true, true)).toEqual(true);
    expect(subject.apply(false, true, false)).toEqual(true);
    expect(subject.apply(false, false, true)).toEqual(true);
    expect(subject.apply(false, false, false)).toEqual(false);

    // 50 = 00110010 in binary
    subject = new DescribedClass(50);
    expect(subject.apply(true, true, true)).toEqual(false);
    expect(subject.apply(true, true, false)).toEqual(false);
    expect(subject.apply(true, false, true)).toEqual(true);
    expect(subject.apply(true, false, false)).toEqual(true);
    expect(subject.apply(false, true, true)).toEqual(false);
    expect(subject.apply(false, true, false)).toEqual(false);
    expect(subject.apply(false, false, true)).toEqual(true);
    expect(subject.apply(false, false, false)).toEqual(false);
  });
});
