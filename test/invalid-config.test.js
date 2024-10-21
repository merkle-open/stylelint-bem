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
		namespaces: true,
	},
	reject: [
		{
			code: '.test {}',
			message: `Invalid value "true" for option "namespaces" of rule "${ruleName}"`,
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
