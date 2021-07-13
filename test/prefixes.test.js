/* eslint max-len:off */
const { ruleName } = require('../index');

testRule({
	ruleName,
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
			message: `Expected class name "m-block" to start with a valid prefix: "a-", "b-", "cc-", "state-", "is-". (${ruleName})`,
		},
		{
			code: '.m-block__element {}',
			message: `Expected class name "m-block__element" to start with a valid prefix: "a-", "b-", "cc-", "state-", "is-". (${ruleName})`,
		},
		{
			code: '.a-__element {}',
			message: `Expected class name "a-__element" to use the a-[block]__[element] syntax. (${ruleName})`,
		},
		{
			code: '.a--modifier {}',
			message: `Expected class name "a--modifier" to use the a-[block]--[modifier] syntax. (${ruleName})`,
		},
		{
			code: '.state-a--state {}',
			message: `Expected class name "state-a--state" to use the state-a-[block]--[state] syntax. (${ruleName})`,
		},
		{
			code: '.is-a--is {}',
			message: `Expected class name "is-a--is" to use the is-a-[block]--[is] syntax. (${ruleName})`,
		},
		{
			code: '.state-a__element {}',
			message: `Expected class name "state-a__element" to use the state-[prefix]-[block]__[element]--[state] syntax. Valid state prefixes: "state-a-", "state-b-", "state-cc-". (${ruleName})`,
		},
		{
			code: '.state-block {}',
			message: `Expected class name "state-block" to use the state-[prefix]-[block]--[state] syntax. Valid state prefixes: "state-a-", "state-b-", "state-cc-". (${ruleName})`,
		},
		{
			code: '.state-a-block {}',
			message: `Expected class name "state-a-block" to use the state-a-[block]--[state] syntax. (${ruleName})`,
		},
		{
			code: '.a--modifier__block {}',
			message: `Expected class name "a--modifier__block" to use the a-[block]__[element]--[modifier] syntax. (${ruleName})`,
		},
	],
});

// invalid patternPrefixes configuration - uses default
testRule({
	ruleName,
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
			message: `Expected class name "z-block" to start with a valid prefix: "a-", "m-", "o-", "l-", "g-", "h-", "state-". (${ruleName})`,
		},
		{
			code: '.-block {}',
			message: `Expected class name "-block" to start with a valid prefix: "a-", "m-", "o-", "l-", "g-", "h-", "state-". (${ruleName})`,
		},
		{
			code: '.a-block--y--x {}',
			message: `Expected class name "a-block--y--x" to use only one "--" modifier separator. (${ruleName})`,
		},
		{
			code: '.state-m--state {}',
			message: `Expected class name "state-m--state" to use the state-m-[block]--[state] syntax. (${ruleName})`,
		},
		{
			code: '.a--modifier__block {}',
			message: `Expected class name "a--modifier__block" to use the a-[block]__[element]--[modifier] syntax. (${ruleName})`,
		},
	],
});

// empty prefixes
testRule({
	ruleName,
	config: {
		patternPrefixes: [],
		helperPrefixes: [],
	},
	skipBasicChecks: true,
	accept: [
		{
			code: '.block {}',
		},
		{
			code: '.block__element {}',
		},
		{
			code: '.block--modifier {}',
		},
		{
			code: '.block__element--modifier {}',
		},
		{
			code: '.m--modifier {}',
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
			code: '.z-block__element--modifier {}',
		},
		{
			code: '.state-m-block {}',
		},
		{
			code: '.state-m--state {}',
		},
		{
			code: '.state-a-block--state-name {}',
		},
		{
			code: '.state-a-block__element--state-name {}',
		},
	],
	reject: [
		{
			code: '.block___x {}',
			message: `Expected class name "block___x" to use only two "_" as element separator. (${ruleName})`,
		},
		{
			code: '.block---x {}',
			message: `Expected class name "block---x" to use only one "--" modifier separator. (${ruleName})`,
		},
		{
			code: '.block--y--x {}',
			message: `Expected class name "block--y--x" to use only one "--" modifier separator. (${ruleName})`,
		},
		{
			code: '.Block {}',
			message: `Expected class name "Block" to contain no uppercase letters. (${ruleName})`,
		},
		{
			code: '.a-__element {}',
			message: `Expected class name "a-__element" to use "-" only for composite names. (${ruleName})`,
		},
		{
			code: '.-block {}',
			message: `Expected class name "-block" to use the [block] syntax. (${ruleName})`,
		},
		{
			code: '.--block {}',
			message: `Expected class name "--block" to use the [block]--[modifier] syntax. (${ruleName})`,
		},
		{
			code: '.m--modifier__block {}',
			message: `Expected class name "m--modifier__block" to use the [block]__[element]--[modifier] syntax. (${ruleName})`,
		},
	],
});

// empty pattern prefixes
testRule({
	ruleName,
	config: {
		patternPrefixes: [],
		helperPrefixes: ['is', 'has'],
	},
	skipBasicChecks: true,
	accept: [
		{
			code: '.block {}',
		},
		{
			code: '.block__element {}',
		},
		{
			code: '.block--modifier {}',
		},
		{
			code: '.block__element--modifier {}',
		},
		{
			code: '.m--modifier {}',
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
			code: '.z-block__element--modifier {}',
		},
		{
			code: '.is-m--state {}',
		},
		{
			code: '.is-a-block--state-name {}',
		},
		{
			code: '.is-a-block__element--state-name {}',
		},
		{
			code: '.has-a-block__element--state-name {}',
		},
	],
	reject: [
		{
			code: '.block___x {}',
			message: `Expected class name "block___x" to use only two "_" as element separator. (${ruleName})`,
		},
		{
			code: '.block---x {}',
			message: `Expected class name "block---x" to use only one "--" modifier separator. (${ruleName})`,
		},
		{
			code: '.block--y--x {}',
			message: `Expected class name "block--y--x" to use only one "--" modifier separator. (${ruleName})`,
		},
		{
			code: '.Block {}',
			message: `Expected class name "Block" to contain no uppercase letters. (${ruleName})`,
		},
		{
			code: '.a-__element {}',
			message: `Expected class name "a-__element" to use "-" only for composite names. (${ruleName})`,
		},
		{
			code: '.-block {}',
			message: `Expected class name "-block" to use the [block] syntax. (${ruleName})`,
		},
		{
			code: '.--block {}',
			message: `Expected class name "--block" to use the [block]--[modifier] syntax. (${ruleName})`,
		},
		{
			code: '.m--modifier__block {}',
			message: `Expected class name "m--modifier__block" to use the [block]__[element]--[modifier] syntax. (${ruleName})`,
		},
		{
			code: '.is--state-name {}',
			message: `Expected class name "is--state-name" to use the is-[block]--[is] syntax. (${ruleName})`,
		},
		{
			code: '.is-m-block {}',
			message: `Expected class name "is-m-block" to use the is-[block]--[is] syntax. (${ruleName})`,
		},
	],
});
