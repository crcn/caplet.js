ALL_TESTS = $(shell find ./test -name "*-test.js")
REPORTER=dot
ONLY="."
NAME=big-list
TIMEOUT=1000

browser:
	./node_modules/.bin/browserify ./lib/browser.js -o ./dist/paperclip.js

min:
	./node_modules/.bin/uglifyjs ./dist/paperclip.js > ./dist/paperclip.min.js

test-node:
	./node_modules/.bin/mocha $(ALL_FILES) --ignore-leaks --timeout $(TIMEOUT) --reporter $(REPORTER)

parser:
	mkdir -p ./lib/parser
	./node_modules/.bin/pegjs ./src/parser/grammar.peg ./lib/parser/parser.js


test-watch:
	mocha $(ALL_TESTS) --ignore-leaks --reporter $(REPORTER) -b -g $(ONLY) --timeout $(TIMEOUT) --watch ./test ./lib

test-cov:
	./node_modules/.bin/istanbul cover -x "lib/parser/parser.js" \
	./node_modules/.bin/_mocha $(ALL_TESTS) -- --ignore-leaks --timeout $(TIMEOUT) --reporter $(REPORTER)

test-coveralls:
	./node_modules/.bin/istanbul cover -x "lib/parser/parser.js" \
	./node_modules/.bin/_mocha $(ALL_TESTS) -- --timeout $(TIMEOUT)nm --reporter $(REPORTER)  && \
	cat ./coverage/lcov.info | ./node_modules/.bin/coveralls --verbose

test-browser:
	./node_modules/karma/bin/karma start

lint: jshint jscs
	
jshint:
	./node_modules/.bin/jshint -c ./.jshint ./lib;

jscs:
	./node_modules/.bin/jscs ./lib;

