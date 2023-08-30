/* eslint max-len:off */
const { ruleName } = require('../index');

// Sass and Less edgecases
testRule({
	ruleName,
	config: {},
	skipBasicChecks: true,
	accept: [
		// Should not conflict with :not pseudo class
		{
			code: '.h-block__element:not(:first-child) {}',
		},
		{
			code: '.a-block:not(.a-block--link) {}',
		},
		{
			code: '.h-block__element:not(.h-block__element--not) {}',
		},
		{
			code: 'p > :not(strong, b.h-important) {}',
		},
		{
			code: 'ul li:not(:last-of-type) {}',
		},
		// Should not conflict with :is pseudo class
		{
			code: ':is(ol, ul, menu, dir) :is(ol, ul, menu, dir) :is(ul, menu, dir) {}',
		},
		{
			code: 'p > :is(strong, b.h-important) {}',
		},
		// Should not conflict with :has pseudo class
		// {
		// 	code: '.m-select:has(> .a-icon) {};',
		// },
		// {
		// 	code: 'h1:has(+ p.h-lead) {}'
		// },
		// Should not conflict with combinations of pseudo classes
		{
			code: '.a-block:is(:not(a)) {}',
		},
		{
			code: '.a-block:is(:not(.a-block--link)) {}',
		},
		{
			code: '.a-block:is(:focus:not(.state-a-block--invisible-focus), :hover:not([disabled])) {}',
		},
		{
			code: '.a-block:is(:not(.a-block--link)) {}',
		},
		{
			code: '.a-block:is(:hover:not([disabled])) {}',
		},
		{
			code: '.a-block:is(:focus:not(.a-block--invisible-focus), :hover:not([disabled])) {}',
		},
		// {
		// 	code: '.m-select:has(> .a-icon:not(.a-icon--chevron)) {};',
		// },
	],
	reject: [
		{
			code: 'p > :not(strong, b.important) {}',
			message: `Expected class name "important" to start with a valid prefix: "a-", "m-", "o-", "l-", "g-", "h-", "state-". (${ruleName})`,
		},
		{
			code: '.a-block:is(:focus:not(.has-invisible-focus), :hover:not([disabled])) {}',
			message: `Expected class name "has-invisible-focus" to start with a valid prefix: "a-", "m-", "o-", "l-", "g-", "h-", "state-". (${ruleName})`,
		},
		// {
		// 	code: 'h1:has(+ p.lead) {}',
		// 	message: `Expected class name "lead" to start with a valid prefix: "a-", "m-", "o-", "l-", "g-", "h-", "state-". (${ruleName})`,
		// },
		{
			code: '.a-block:is(:not(.is-link)) {}',
			message: `Expected class name "is-link" to start with a valid prefix: "a-", "m-", "o-", "l-", "g-", "h-", "state-". (${ruleName})`,
		},
	],
});
