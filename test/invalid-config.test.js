const { ruleName } = require('../index');

testRule({
	ruleName,
	config: {
		invalidKey: 'string',
	},
	reject: [
		{
			code: '.test {}',
			message: `Invalid option name "invalidKey" for rule "${ruleName}"`,
		},
	],
});

testRule({
	ruleName,
	config: {
		namespace: true,
	},
	reject: [
		{
			code: '.test {}',
			message: `Invalid value "true" for option "namespace" of rule "${ruleName}"`,
		},
	],
});

testRule({
	ruleName,
	config: {
		patternPrefixes: 42,
	},
	reject: [
		{
			code: '.test {}',
			message: `Invalid value "42" for option "patternPrefixes" of rule "${ruleName}"`,
		},
	],
});
