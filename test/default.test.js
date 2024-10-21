/* eslint max-len:off */
const { ruleName } = require('../index');

testRule({
	ruleName,
	config: true,
	accept: [
		{
			code: '.a-block {}',
		},
		{
			code: '.m-block {}',
		},
		{
			code: '.o-block {}',
		},
		{
			code: '.l-block {}',
		},
		{
			code: '.g-block {}',
		},
		{
			code: '.h-block {}',
		},

		{
			code: '.state-a-block--state-name {}',
		},
		{
			code: '.state-m-block--state-name {}',
		},
		{
			code: '.state-o-block--state-name {}',
		},
		{
			code: '.state-l-block--state-name {}',
		},
		{
			code: '.state-g-block--state-name {}',
		},
		{
			code: '.state-h-block--state-name {}',
		},

		{
			code: '.a-block--modifier {}',
		},
		{
			code: '.m-block--modifier {}',
		},
		{
			code: '.o-block--modifier {}',
		},
		{
			code: '.l-block--modifier {}',
		},
		{
			code: '.g-block--modifier {}',
		},
		{
			code: '.h-block--modifier {}',
		},

		{
			code: '.a-block__element {}',
		},
		{
			code: '.m-block__element {}',
		},
		{
			code: '.o-block__element {}',
		},
		{
			code: '.l-block__element {}',
		},
		{
			code: '.g-block__element {}',
		},
		{
			code: '.h-block__element {}',
		},
	],
	reject: [
		{
			code: '.z-block {}',
			message: `Expected class name "z-block" to start with a valid prefix: "a-", "m-", "o-", "l-", "g-", "h-", "state-". (${ruleName})`,
		},
		{
			code: '.0-block {}',
			message: `Expected class name "0-block" to start with a valid prefix: "a-", "m-", "o-", "l-", "g-", "h-", "state-". (${ruleName})`,
		},
		{
			code: '.-block {}',
			message: `Expected class name "-block" to start with a valid prefix: "a-", "m-", "o-", "l-", "g-", "h-", "state-". (${ruleName})`,
		},
		{
			code: '.--block {}',
			message: `Expected class name "--block" to start with a valid prefix: "a-", "m-", "o-", "l-", "g-", "h-", "state-". (${ruleName})`,
		},
		{
			code: '.a-block___x {}',
			message: `Expected class name "a-block___x" to use only two "_" as element separator. (${ruleName})`,
		},
		{
			code: '.a-block---x {}',
			message: `Expected class name "a-block---x" to use only one "--" modifier separator. (${ruleName})`,
		},
		{
			code: '.a-block--y--x {}',
			message: `Expected class name "a-block--y--x" to use only one "--" modifier separator. (${ruleName})`,
		},
		{
			code: '.a-Block {}',
			message: `Expected class name "a-Block" to contain no uppercase letters. (${ruleName})`,
		},
		{
			code: '.m-__element {}',
			message: `Expected class name "m-__element" to use the m-[block]__[element] syntax. (${ruleName})`,
		},
		{
			code: '.m--modifier {}',
			message: `Expected class name "m--modifier" to use the m-[block]--[modifier] syntax. (${ruleName})`,
		},
		{
			code: '.m-block-__element {}',
			message: `Expected class name "m-block-__element" to use "-" only for composite names. (${ruleName})`,
		},
		{
			code: '.m-block__-element {}',
			message: `Expected class name "m-block__-element" to use "-" only for composite names. (${ruleName})`,
		},
		{
			code: '.m-block__element- {}',
			message: `Expected class name "m-block__element-" to use "-" only for composite names. (${ruleName})`,
		},
		{
			code: '.m-block_--modifier {}',
			message: `Expected class name "m-block_--modifier" to use "_" only as element separator. (${ruleName})`,
		},
		{
			code: '.m-block--_modifier {}',
			message: `Expected class name "m-block--_modifier" to use "_" only as element separator. (${ruleName})`,
		},
		{
			code: '.m-block--modifier_ {}',
			message: `Expected class name "m-block--modifier_" to use "_" only as element separator. (${ruleName})`,
		},
		{
			code: '.state-m--state {}',
			message: `Expected class name "state-m--state" to use the state-m-[block]--[state] syntax. (${ruleName})`,
		},
		{
			code: '.state-block {}',
			message: `Expected class name "state-block" to use the state-[prefix]-[block]--[state] syntax. Valid state prefixes: "state-a-", "state-m-", "state-o-", "state-l-", "state-g-", "state-h-". (${ruleName})`,
		},
		{
			code: '.state-a-block {}',
			message: `Expected class name "state-a-block" to use the state-a-[block]--[state] syntax. (${ruleName})`,
		},
		{
			code: '.state-a-block_b {}',
			message: `Expected class name "state-a-block_b" to use "_" only as element separator. (${ruleName})`,
		},
		{
			code: '.a--modifier__block {}',
			message: `Expected class name "a--modifier__block" to use the a-[block]__[element]--[modifier] syntax. (${ruleName})`,
		},
	],
});
