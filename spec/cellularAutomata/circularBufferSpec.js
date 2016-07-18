"use strict";

var DescribedClass = require("../../lib/cellularAutomata/circularBuffer");

describe("CircularBuffer", function () {
  var subject;

  beforeEach(function () {
    subject = new DescribedClass(3);
  });

  it("behaves as expected", function () {
    expect(subject.length()).toEqual(0);
    expect(subject.fixedSize()).toEqual(3);

    subject.push("foo");
    expect(subject.length()).toEqual(1);
    expect(subject.get(0)).toEqual("foo");

    subject.push("bar");
    expect(subject.length()).toEqual(2);
    expect(subject.get(0)).toEqual("foo");
    expect(subject.get(1)).toEqual("bar");

    subject.push("baz");
    expect(subject.length()).toEqual(3);
    expect(subject.get(0)).toEqual("foo");
    expect(subject.get(1)).toEqual("bar");
    expect(subject.get(2)).toEqual("baz");

    subject.push("qux");
    expect(subject.length()).toEqual(3);
    expect(subject.get(0)).toEqual("bar");
    expect(subject.get(1)).toEqual("baz");
    expect(subject.get(2)).toEqual("qux");
  });
});
