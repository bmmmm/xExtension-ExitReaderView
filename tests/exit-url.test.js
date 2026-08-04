'use strict';

// Run with `node --test tests/*.test.js`. No dependencies, no framework.
//
// URLSearchParams.set() replaces a key in place and appends one that was not
// there, so the expected strings below are order-sensitive on purpose: they
// pin the actual output rather than a normalised version of it.
const test = require('node:test');
const assert = require('node:assert/strict');

const { exitUrl } = require('../static/script.js');

const BASE = 'https://rss.example.org/i/';

test('leaves the reading view by swapping the action back to normal', () => {
	assert.equal(exitUrl(BASE + '?c=index&a=reader'), '/i/?c=index&a=normal');
});

test('keeps the selected feed', () => {
	assert.equal(
		exitUrl(BASE + '?get=f_17&c=index&a=reader'),
		'/i/?get=f_17&c=index&a=normal'
	);
});

test('a category selection survives', () => {
	assert.equal(exitUrl(BASE + '?get=c_3&a=reader'), '/i/?get=c_3&a=normal&c=index');
});

test('a tag selection survives', () => {
	assert.equal(exitUrl(BASE + '?get=t_9&a=reader'), '/i/?get=t_9&a=normal&c=index');
});

test('a search survives', () => {
	assert.equal(
		exitUrl(BASE + '?search=rust&get=f_2&a=reader'),
		'/i/?search=rust&get=f_2&a=normal&c=index'
	);
});

test('a parameter the extension does not know about survives untouched', () => {
	assert.equal(
		exitUrl(BASE + '?get=f_1&state=3&order=ASC&a=reader'),
		'/i/?get=f_1&state=3&order=ASC&a=normal&c=index'
	);
});

test('adds both parameters when the URL carries neither', () => {
	assert.equal(exitUrl(BASE), '/i/?c=index&a=normal');
});

test('a value that needs escaping stays escaped', () => {
	assert.equal(
		exitUrl(BASE + '?search=' + encodeURIComponent('a&b=c') + '&a=reader'),
		'/i/?search=a%26b%3Dc&a=normal&c=index'
	);
});

test('the result is a path, never an absolute URL — the link is same-origin by construction', () => {
	assert.equal(exitUrl('https://elsewhere.invalid/sub/?a=reader'), '/sub/?a=normal&c=index');
});
