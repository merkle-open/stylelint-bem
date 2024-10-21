/* eslint max-len:off */
const { ruleName } = require('../index');

// Sass and Less edgecases
testRule({
	ruleName,
	config: {},
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
		// Should not conflict with unknown pseudo elements
		{
			code: '.m-search { &::-ms-clear { } &::-webkit-search-cancel-button { } }',
		},
		// Should not conflict with scss nested outer selector
		{
			code: `.a-button {
			  &:focus {
			    [data-whatintent="keyboard"] & {}
			  }
			}`,
		},
	],
	reject: [
		{
			code: '.no-mixin:not(x) { }',
			message: `Expected class name "no-mixin" to start with a valid prefix: "a-", "m-", "o-", "l-", "g-", "h-", "state-". (${ruleName})`,
		},
		// should conflict with scss variable interpolation, because we can not validate the definitive selector
		{
			code: '@mixin icon($name) { .a-icon-#{$name} {} }',
			message: 'Unknown word (CssSyntaxError)',
		},
		// should conflict with less modifyVars interpolation, because we can not validate the definitive selector
		{
			code: '.@{css-prefix}-selector {}',
			message: 'Unknown word (CssSyntaxError)',
		},
	],
});
