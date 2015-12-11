"use strict";

var describedClass = require("../../lib/cellularAutomata/automaton");
var Rule = require("../../lib/cellularAutomata/rule");
var Row = require("../../lib/cellularAutomata/row");

describe("Automaton", function () {
  var subject, row;

  beforeEach(function () {
    var rule = new Rule(110);
    subject = new describedClass(rule);
    row = new Row(11);
    row.set(9, true);
  });

  it("generates rows based on the rule", function () {
    row = subject.nextRow(row);
    expect(row.get(7)).toEqual(false);
    expect(row.get(8)).toEqual(true);
    expect(row.get(9)).toEqual(true);
    expect(row.get(10)).toEqual(false);

    row = subject.nextRow(row);
    expect(row.get(6)).toEqual(false);
    expect(row.get(7)).toEqual(true);
    expect(row.get(8)).toEqual(true);
    expect(row.get(9)).toEqual(true);
    expect(row.get(10)).toEqual(false);

    row = subject.nextRow(row);
    expect(row.get(5)).toEqual(false);
    expect(row.get(6)).toEqual(true);
    expect(row.get(7)).toEqual(true);
    expect(row.get(8)).toEqual(false);
    expect(row.get(9)).toEqual(true);
    expect(row.get(10)).toEqual(false);
  });

  it("supports changing the rule mid-way through", function () {
    row = subject.nextRow(row);
    row = subject.nextRow(row);

    var newRule = new Rule(126);
    subject.setRule(newRule);

    // 00000001110 -> 00000011011 in rule 126
    row = subject.nextRow(row);
    expect(row.get(5)).toEqual(false);
    expect(row.get(6)).toEqual(true);
    expect(row.get(7)).toEqual(true);
    expect(row.get(8)).toEqual(false);
    expect(row.get(9)).toEqual(true);
    expect(row.get(10)).toEqual(true);
  });
});
