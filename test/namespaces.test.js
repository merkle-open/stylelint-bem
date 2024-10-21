/* eslint max-len:off */
const { ruleName } = require('../index');

testRule({
	ruleName,
	config: {
		namespaces: ['namespace1-', 'namespace2-'],
	},
	accept: [
		{
			code: '.namespace1-a-block {}',
		},
		{
			code: '.namespace1-m-block {}',
		},
		{
			code: '.namespace1-o-block {}',
		},
		{
			code: '.namespace1-l-block {}',
		},
		{
			code: '.namespace1-g-block {}',
		},
		{
			code: '.namespace1-h-block {}',
		},

		{
			code: '.namespace1-state-a-block--state-name {}',
		},
		{
			code: '.namespace1-state-m-block--state-name {}',
		},
		{
			code: '.namespace1-state-o-block--state-name {}',
		},
		{
			code: '.namespace1-state-l-block--state-name {}',
		},
		{
			code: '.namespace1-state-g-block--state-name {}',
		},
		{
			code: '.namespace1-state-h-block--state-name {}',
		},

		{
			code: '.namespace1-a-block--modifier {}',
		},
		{
			code: '.namespace1-m-block--modifier {}',
		},
		{
			code: '.namespace1-o-block--modifier {}',
		},
		{
			code: '.namespace1-l-block--modifier {}',
		},
		{
			code: '.namespace1-g-block--modifier {}',
		},
		{
			code: '.namespace1-h-block--modifier {}',
		},

		{
			code: '.namespace1-a-block__block {}',
		},
		{
			code: '.namespace1-m-block__block {}',
		},
		{
			code: '.namespace1-o-block__block {}',
		},
		{
			code: '.namespace1-l-block__block {}',
		},
		{
			code: '.namespace1-g-block__block {}',
		},
		{
			code: '.namespace1-h-block__block {}',
		},

		{
			code: '.namespace2-a-block {}',
		},
		{
			code: '.namespace2-m-block {}',
		},
		{
			code: '.namespace2-o-block {}',
		},
		{
			code: '.namespace2-l-block {}',
		},
		{
			code: '.namespace2-g-block {}',
		},
		{
			code: '.namespace2-h-block {}',
		},

		{
			code: '.namespace2-state-a-block--state-name {}',
		},
		{
			code: '.namespace2-state-m-block--state-name {}',
		},
		{
			code: '.namespace2-state-o-block--state-name {}',
		},
		{
			code: '.namespace2-state-l-block--state-name {}',
		},
		{
			code: '.namespace2-state-g-block--state-name {}',
		},
		{
			code: '.namespace2-state-h-block--state-name {}',
		},

		{
			code: '.namespace2-a-block--modifier {}',
		},
		{
			code: '.namespace2-m-block--modifier {}',
		},
		{
			code: '.namespace2-o-block--modifier {}',
		},
		{
			code: '.namespace2-l-block--modifier {}',
		},
		{
			code: '.namespace2-g-block--modifier {}',
		},
		{
			code: '.namespace2-h-block--modifier {}',
		},

		{
			code: '.namespace2-a-block__block {}',
		},
		{
			code: '.namespace2-m-block__block {}',
		},
		{
			code: '.namespace2-o-block__block {}',
		},
		{
			code: '.namespace2-l-block__block {}',
		},
		{
			code: '.namespace2-g-block__block {}',
		},
		{
			code: '.namespace2-h-block__block {}',
		},
	],
	reject: [
		{
			code: '.a-block {}',
			message: `Expected class name "a-block" to use one of the valid namespaces "namespace1-", "namespace2-". (${ruleName})`,
		},
		{
			code: '.namespace-a-block {}',
			message: `Expected class name "namespace-a-block" to use one of the valid namespaces "namespace1-", "namespace2-". (${ruleName})`,
		},
		{
			code: '.namespace1-z-block {}',
			message: `Expected class name "namespace1-z-block" to start with a valid prefix: "namespace1-a-", "namespace1-m-", "namespace1-o-", "namespace1-l-", "namespace1-g-", "namespace1-h-", "namespace1-state-". (${ruleName})`,
		},
		{
			code: '.namespace1-z-block__element {}',
			message: `Expected class name "namespace1-z-block__element" to start with a valid prefix: "namespace1-a-", "namespace1-m-", "namespace1-o-", "namespace1-l-", "namespace1-g-", "namespace1-h-", "namespace1-state-". (${ruleName})`,
		},
		{
			code: '.namespace1-m-__element {}',
			message: `Expected class name "namespace1-m-__element" to use the namespace1-m-[block]__[element] syntax. (${ruleName})`,
		},
		{
			code: '.namespace1-m--modifier {}',
			message: `Expected class name "namespace1-m--modifier" to use the namespace1-m-[block]--[modifier] syntax. (${ruleName})`,
		},
		{
			code: '.namespace1-state-m--state {}',
			message: `Expected class name "namespace1-state-m--state" to use the namespace1-state-m-[block]--[state] syntax. (${ruleName})`,
		},
		{
			code: '.namespace1-state-m__element {}',
			message: `Expected class name "namespace1-state-m__element" to use the namespace1-state-[prefix]-[block]__[element]--[state] syntax. Valid state prefixes: "namespace1-state-a-", "namespace1-state-m-", "namespace1-state-o-", "namespace1-state-l-", "namespace1-state-g-", "namespace1-state-h-". (${ruleName})`,
		},
		{
			code: '.namespace1-state-block {}',
			message: `Expected class name "namespace1-state-block" to use the namespace1-state-[prefix]-[block]--[state] syntax. Valid state prefixes: "namespace1-state-a-", "namespace1-state-m-", "namespace1-state-o-", "namespace1-state-l-", "namespace1-state-g-", "namespace1-state-h-". (${ruleName})`,
		},
		{
			code: '.namespace1-state-a-block {}',
			message: `Expected class name "namespace1-state-a-block" to use the namespace1-state-a-[block]--[state] syntax. (${ruleName})`,
		},
		{
			code: '.namespace1-a--modifier__block {}',
			message: `Expected class name "namespace1-a--modifier__block" to use the namespace1-a-[block]__[element]--[modifier] syntax. (${ruleName})`,
		},
		{
			code: '.namespace2-z-block {}',
			message: `Expected class name "namespace2-z-block" to start with a valid prefix: "namespace2-a-", "namespace2-m-", "namespace2-o-", "namespace2-l-", "namespace2-g-", "namespace2-h-", "namespace2-state-". (${ruleName})`,
		},
		{
			code: '.namespace2-z-block__element {}',
			message: `Expected class name "namespace2-z-block__element" to start with a valid prefix: "namespace2-a-", "namespace2-m-", "namespace2-o-", "namespace2-l-", "namespace2-g-", "namespace2-h-", "namespace2-state-". (${ruleName})`,
		},
		{
			code: '.namespace2-m-__element {}',
			message: `Expected class name "namespace2-m-__element" to use the namespace2-m-[block]__[element] syntax. (${ruleName})`,
		},
		{
			code: '.namespace2-m--modifier {}',
			message: `Expected class name "namespace2-m--modifier" to use the namespace2-m-[block]--[modifier] syntax. (${ruleName})`,
		},
		{
			code: '.namespace2-state-m--state {}',
			message: `Expected class name "namespace2-state-m--state" to use the namespace2-state-m-[block]--[state] syntax. (${ruleName})`,
		},
		{
			code: '.namespace2-state-m__element {}',
			message: `Expected class name "namespace2-state-m__element" to use the namespace2-state-[prefix]-[block]__[element]--[state] syntax. Valid state prefixes: "namespace2-state-a-", "namespace2-state-m-", "namespace2-state-o-", "namespace2-state-l-", "namespace2-state-g-", "namespace2-state-h-". (${ruleName})`,
		},
		{
			code: '.namespace2-state-block {}',
			message: `Expected class name "namespace2-state-block" to use the namespace2-state-[prefix]-[block]--[state] syntax. Valid state prefixes: "namespace2-state-a-", "namespace2-state-m-", "namespace2-state-o-", "namespace2-state-l-", "namespace2-state-g-", "namespace2-state-h-". (${ruleName})`,
		},
		{
			code: '.namespace2-state-a-block {}',
			message: `Expected class name "namespace2-state-a-block" to use the namespace2-state-a-[block]--[state] syntax. (${ruleName})`,
		},
		{
			code: '.namespace2-a--modifier__block {}',
			message: `Expected class name "namespace2-a--modifier__block" to use the namespace2-a-[block]__[element]--[modifier] syntax. (${ruleName})`,
		},
	],
});
