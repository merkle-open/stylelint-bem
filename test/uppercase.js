/* eslint max-len:off, prefer-template:off */
const testRule = require('stylelint-test-rule-tape');
const plugin = require('..');

testRule(plugin.rule, {
	ruleName: plugin.ruleName,
	config: {
		containUppercase: true,
	},
	skipBasicChecks: true,

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
			code: '.state-a-block--testStateName {}',
		},
		{
			code: '.state-m-block--appleStateName {}',
		},
		{
			code: '.state-o-block--bananaStateName {}',
		},
		{
			code: '.state-l-block--cannonStateName {}',
		},
		{
			code: '.state-g-block--dryStateName {}',
		},
		{
			code: '.state-h-block--errorStateName {}',
		},

		{
			code: '.a-block--testModifier {}',
		},
		{
			code: '.m-block--appleModifier {}',
		},
		{
			code: '.o-block--bananaModifier {}',
		},
		{
			code: '.l-block--canonModifier {}',
		},
		{
			code: '.g-block--dryModifier {}',
		},
		{
			code: '.h-block--errorModifier {}',
		},

		{
			code: '.a-block__testElement {}',
		},
		{
			code: '.m-block__appleElement {}',
		},
		{
			code: '.o-block__bananaElement {}',
		},
		{
			code: '.l-block__canonElement {}',
		},
		{
			code: '.g-block__dryElement {}',
		},
		{
			code: '.h-block__errorElement {}',
		},
	],
});
