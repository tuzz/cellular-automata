"use strict";

var mockImageData = {
  data: []
};

var mockContext = {
  createImageData: function () {
    return mockImageData;
  },
  putImageData: function () {},
  getImageData: function () {
    return mockImageData;
  }
};

var mockCanvas = {
  getContext: function () {
    return mockContext;
  },
  width: 8,
  height: 4
};

module.exports.mockCanvas = function () {
  return mockCanvas;
};
