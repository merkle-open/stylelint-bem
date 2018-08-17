/* eslint max-len:off, prefer-template:off */
const testRule = require('stylelint-test-rule-tape');
const plugin = require('..');

// Sass and Less edgecases
testRule(plugin.rule, {
	ruleName: plugin.ruleName,
	config: {},
	skipBasicChecks: true,

	accept: [
		// Should not conflict with keyframes
		{
			code: '@keyframes blue-background-change { 0% { background: black } }',
		},
		// Should not conflict with scss placeholders
		{
			code: '%placeholder { }',
		},
		// Should not conflict with less mixins
		{
			code: '.mixin() { }',
		},
		// Should not conflict with less mixins
		{
			code: '.mixin(@prop: black) { background: @prop }',
		},
		// Should not conflict with less namespaces
		{
			code: '#namespace { }',
		},
		// Should not conflict with ampersands inside mixins
		{
			code: '@mixin specialCase { &:hover { } }',
		},
	],

	reject: [
		{
			code: '.no-mixin:not(x) { }',
		},
	],
});
