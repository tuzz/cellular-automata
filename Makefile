PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash

.PHONY: all test lint clean

all: test lint compile

test: node_modules
	jasmine

lint: node_modules
	jshint . --exclude-path .gitignore --exclude bin

compile: node_modules
	browserify lib/cellularAutomata.js > bin/cellularAutomata.js

node_modules:
	npm install

clean:
	rm bin/*
	rm -rf node_modules
