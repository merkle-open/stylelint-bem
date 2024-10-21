/* eslint max-len:off */
const { ruleName } = require('../index');

testRule({
	ruleName,
	config: {
		namespace: 'namespace-',
	},
	accept: [
		{
			code: '.namespace-a-block {}',
		},
		{
			code: '.namespace-m-block {}',
		},
		{
			code: '.namespace-o-block {}',
		},
		{
			code: '.namespace-l-block {}',
		},
		{
			code: '.namespace-g-block {}',
		},
		{
			code: '.namespace-h-block {}',
		},

		{
			code: '.namespace-state-a-block--state-name {}',
		},
		{
			code: '.namespace-state-m-block--state-name {}',
		},
		{
			code: '.namespace-state-o-block--state-name {}',
		},
		{
			code: '.namespace-state-l-block--state-name {}',
		},
		{
			code: '.namespace-state-g-block--state-name {}',
		},
		{
			code: '.namespace-state-h-block--state-name {}',
		},

		{
			code: '.namespace-a-block--modifier {}',
		},
		{
			code: '.namespace-m-block--modifier {}',
		},
		{
			code: '.namespace-o-block--modifier {}',
		},
		{
			code: '.namespace-l-block--modifier {}',
		},
		{
			code: '.namespace-g-block--modifier {}',
		},
		{
			code: '.namespace-h-block--modifier {}',
		},

		{
			code: '.namespace-a-block__block {}',
		},
		{
			code: '.namespace-m-block__block {}',
		},
		{
			code: '.namespace-o-block__block {}',
		},
		{
			code: '.namespace-l-block__block {}',
		},
		{
			code: '.namespace-g-block__block {}',
		},
		{
			code: '.namespace-h-block__block {}',
		},
	],

	reject: [
		{
			code: '.a-block {}',
			message: `Expected class name "a-block" to use the namespace "namespace-". (${ruleName})`,
		},
		{
			code: '.namespace-z-block {}',
			message: `Expected class name "namespace-z-block" to start with a valid prefix: "namespace-a-", "namespace-m-", "namespace-o-", "namespace-l-", "namespace-g-", "namespace-h-", "namespace-state-". (${ruleName})`,
		},
		{
			code: '.namespace-z-block__element {}',
			message: `Expected class name "namespace-z-block__element" to start with a valid prefix: "namespace-a-", "namespace-m-", "namespace-o-", "namespace-l-", "namespace-g-", "namespace-h-", "namespace-state-". (${ruleName})`,
		},
		{
			code: '.namespace-m-__element {}',
			message: `Expected class name "namespace-m-__element" to use the namespace-m-[block]__[element] syntax. (${ruleName})`,
		},
		{
			code: '.namespace-m--modifier {}',
			message: `Expected class name "namespace-m--modifier" to use the namespace-m-[block]--[modifier] syntax. (${ruleName})`,
		},
		{
			code: '.namespace-state-m--state {}',
			message: `Expected class name "namespace-state-m--state" to use the namespace-state-m-[block]--[state] syntax. (${ruleName})`,
		},
		{
			code: '.namespace-state-m__element {}',
			message: `Expected class name "namespace-state-m__element" to use the namespace-state-[prefix]-[block]__[element]--[state] syntax. Valid state prefixes: "namespace-state-a-", "namespace-state-m-", "namespace-state-o-", "namespace-state-l-", "namespace-state-g-", "namespace-state-h-". (${ruleName})`,
		},
		{
			code: '.namespace-state-block {}',
			message: `Expected class name "namespace-state-block" to use the namespace-state-[prefix]-[block]--[state] syntax. Valid state prefixes: "namespace-state-a-", "namespace-state-m-", "namespace-state-o-", "namespace-state-l-", "namespace-state-g-", "namespace-state-h-". (${ruleName})`,
		},
		{
			code: '.namespace-state-a-block {}',
			message: `Expected class name "namespace-state-a-block" to use the namespace-state-a-[block]--[state] syntax. (${ruleName})`,
		},
		{
			code: '.namespace-a--modifier__block {}',
			message: `Expected class name "namespace-a--modifier__block" to use the namespace-a-[block]__[element]--[modifier] syntax. (${ruleName})`,
		},
	],
});

// merge deprecated namespace with namespaces
testRule({
	ruleName,
	config: {
		namespace: 'namespace-',
		namespaces: ['namespace1-', 'namespace2-'],
	},
	accept: [
		{
			code: '.namespace-a-block {}',
		},
		{
			code: '.namespace1-m-block {}',
		},
		{
			code: '.namespace2-o-block {}',
		},
	],
	reject: [
		{
			code: '.a-block {}',
			message: `Expected class name "a-block" to use one of the valid namespaces "namespace1-", "namespace2-", "namespace-". (${ruleName})`,
		},
	],
});
