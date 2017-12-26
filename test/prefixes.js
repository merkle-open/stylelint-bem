/* eslint max-len:off, prefer-template:off */
const testRule = require('stylelint-test-rule-tape');
const plugin = require('..');

testRule(plugin.rule, {
	ruleName: plugin.ruleName,
	config: {
		patternPrefixes: ['a', 'b', 'cc'],
		helperPrefixes: ['state', 'is'],
	},
	skipBasicChecks: true,

	accept: [
		{
			code: '.a-block {}',
		},
		{
			code: '.b-block {}',
		},
		{
			code: '.cc-block {}',
		},

		{
			code: '.state-a-block--state-name {}',
		},
		{
			code: '.state-b-block--state-name {}',
		},
		{
			code: '.state-cc-block--state-name {}',
		},

		{
			code: '.is-a-block--is-name {}',
		},
		{
			code: '.is-b-block--is-name {}',
		},
		{
			code: '.is-cc-block--is-name {}',
		},

		{
			code: '.a-block--modifier {}',
		},
		{
			code: '.b-block--modifier {}',
		},
		{
			code: '.cc-block--modifier {}',
		},

		{
			code: '.a-block__block {}',
		},
		{
			code: '.b-block__block {}',
		},
		{
			code: '.cc-block__block {}',
		},
	],

	reject: [
		{
			code: '.m-block {}',
			message: 'Expected class name "m-block" to start with a valid prefix: "a-", "b-", "cc-", "state-", "is-". (' + plugin.ruleName + ')',
		},
		{
			code: '.m-block__element {}',
			message: 'Expected class name "m-block__element" to start with a valid prefix: "a-", "b-", "cc-", "state-", "is-". (' + plugin.ruleName + ')',
		},
		{
			code: '.a-__element {}',
			message: 'Expected class name "a-__element" to use the a-[block]__[element] syntax. (' + plugin.ruleName + ')',
		},
		{
			code: '.a--modifier {}',
			message: 'Expected class name "a--modifier" to use the a-[block]--[modifier] syntax. (' + plugin.ruleName + ')',
		},
		{
			code: '.state-a--state {}',
			message: 'Expected class name "state-a--state" to use the state-a-[block]--[state] syntax. (' + plugin.ruleName + ')',
		},
		{
			code: '.is-a--is {}',
			message: 'Expected class name "is-a--is" to use the is-a-[block]--[is] syntax. (' + plugin.ruleName + ')',
		},
		{
			code: '.state-a__element {}',
			message: 'Expected class name "state-a__element" to use the state-[prefix]-[block]__[element]--[state] syntax. Valid state prefixes: "state-a-", "state-b-", "state-cc-". (' + plugin.ruleName + ')',
		},
		{
			code: '.state-block {}',
			message: 'Expected class name "state-block" to use the state-[prefix]-[block]--[state] syntax. Valid state prefixes: "state-a-", "state-b-", "state-cc-". (' + plugin.ruleName + ')',
		},
		{
			code: '.state-a-block {}',
			message: 'Expected class name "state-a-block" to use the state-a-[block]--[state] syntax. (' + plugin.ruleName + ')',
		},
		{
			code: '.a--modifier__block {}',
			message: 'Expected class name "a--modifier__block" to use the a-[block]__[element]--[modifier] syntax. (' + plugin.ruleName + ')',
		},
	],
});

// invalid patternPrefixes configuration
testRule(plugin.rule, {
	ruleName: plugin.ruleName,
	config: {
		patternPrefixes: 'string',
	},
	skipBasicChecks: true,
	// should use default patternPrefixes
	accept: [
		{
			code: '.a-block {}',
		},
		{
			code: '.state-a-block--state-name {}',
		},
		{
			code: '.m-block--modifier {}',
		},
		{
			code: '.o-block__element {}',
		},
	],
	reject: [
		{
			code: '.z-block {}',
			message: 'Expected class name "z-block" to start with a valid prefix: "a-", "m-", "o-", "l-", "g-", "h-", "state-". (' + plugin.ruleName + ')',
		},
		{
			code: '.-block {}',
			message: 'Expected class name "-block" to start with a valid prefix: "a-", "m-", "o-", "l-", "g-", "h-", "state-". (' + plugin.ruleName + ')',
		},
		{
			code: '.a-block--y--x {}',
			message: 'Expected class name "a-block--y--x" to use only one "--" modifier separator. (' + plugin.ruleName + ')',
		},
		{
			code: '.state-m--state {}',
			message: 'Expected class name "state-m--state" to use the state-m-[block]--[state] syntax. (' + plugin.ruleName + ')',
		},
		{
			code: '.a--modifier__block {}',
			message: 'Expected class name "a--modifier__block" to use the a-[block]__[element]--[modifier] syntax. (' + plugin.ruleName + ')',
		},
	],
});

// test the switch of prefix check
testRule(plugin.rule, {
	ruleName: plugin.ruleName,
	config: {
		offPrefixCheck: true,
	},
	skipBasicChecks: true,
	// should pass without checking prefix
	accept: [
		{
			code: '.block {}',
		},
		{
			code: '.a-block--state-name {}',
		},
		{
			code: '.x-block--modifier {}',
		},
		{
			code: '.f-block__element {}',
		},
		{
			code: '.z-block__element {}',
		},
	],
});
