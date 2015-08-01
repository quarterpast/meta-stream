SRC_FILES=$(wildcard src/*.js)
LIB_FILES=$(patsubst src/%, lib/%, $(SRC_FILES))
BABEL_OPTS=

all: $(LIB_FILES)

lib/%.js: src/%.js
	@mkdir -p $(@D)
	node_modules/.bin/babel $(BABEL_OPTS) $< -o $@

test: all test.js
	node_modules/.bin/mocha -r babel/register -u exports

.PHONY: test
