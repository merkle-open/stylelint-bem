var testRule = require('stylelint-test-rule-tape');
var plugin = require('..');

testRule(plugin.rule, {
  ruleName: plugin.ruleName,
  config: true,
  skipBasicChecks: true,

  accept: [
    { code: '.a-block {}' },
    { code: '.m-block {}' },
    { code: '.o-block {}' },
    { code: '.l-block {}' },
    { code: '.g-block {}' },
    { code: '.h-block {}' },

    { code: '.js-a-block__hook-name {}' },
    { code: '.js-m-block__hook-name {}' },
    { code: '.js-o-block__hook-name {}' },
    { code: '.js-l-block__hook-name {}' },
    { code: '.js-g-block__hook-name {}' },
    { code: '.js-h-block__hook-name {}' },

    { code: '.state-a-block--state-name {}' },
    { code: '.state-m-block--state-name {}' },
    { code: '.state-o-block--state-name {}' },
    { code: '.state-l-block--state-name {}' },
    { code: '.state-g-block--state-name {}' },
    { code: '.state-h-block--state-name {}' },

    { code: '.a-block--modifier {}' },
    { code: '.m-block--modifier {}' },
    { code: '.o-block--modifier {}' },
    { code: '.l-block--modifier {}' },
    { code: '.g-block--modifier {}' },
    { code: '.h-block--modifier {}' },

    { code: '.a-block__block {}' },
    { code: '.m-block__block {}' },
    { code: '.o-block__block {}' },
    { code: '.l-block__block {}' },
    { code: '.g-block__block {}' },
    { code: '.h-block__block {}' },
  ],

  reject: [
    {
      code: '.z-block {}',
      message: 'Expected class name "z-block" to start with a valid prefix: "a", "m", "o", "l", "g", "h", "js", "state". (' + plugin.ruleName + ')',
    },
    {
      code: '.0-block {}',
      message: 'Expected class name "0-block" to start with a valid prefix: "a", "m", "o", "l", "g", "h", "js", "state". (' + plugin.ruleName + ')',
    },
    {
      code: '.-block {}',
      message: 'Expected class name "-block" to start with a valid prefix: "a", "m", "o", "l", "g", "h", "js", "state". (' + plugin.ruleName + ')',
    },
    {
      code: '.--block {}',
      message: 'Expected class name "--block" to start with a valid prefix: "a", "m", "o", "l", "g", "h", "js", "state". (' + plugin.ruleName + ')',
    },
    {
      code: '.js-block {}',
      message: 'Expected class name "js-block" to use js-[prefix]-[block] syntax. Valid js prefixes: "js-a", "js-m", "js-o", "js-l", "js-g", "js-h". (' + plugin.ruleName + ')',
    },
    {
      code: '.state-block {}',
      message: 'Expected class name "state-block" to use state-[prefix]-[block] syntax. Valid state prefixes: "state-a", "state-m", "state-o", "state-l", "state-g", "state-h". (' + plugin.ruleName + ')',
    },
    {
      code: '.a-block___x {}',
      message: 'Expected class name "a-block___x" to use only one "__" element separator. (' + plugin.ruleName + ')',
    },
    {
      code: '.a-block__y__x {}',
      message: 'Expected class name "a-block__y__x" to use only one "__" element separator. (' + plugin.ruleName + ')',
    },
    {
      code: '.a-block---x {}',
      message: 'Expected class name "a-block---x" to use only one "--" modifier separator. (' + plugin.ruleName + ')',
    },
    {
      code: '.a-block--y--x {}',
      message: 'Expected class name "a-block--y--x" to use only one "--" modifier separator. (' + plugin.ruleName + ')',
    },
    {
      code: '.a-Block {}',
      message: 'Expected class name "a-Block" to contain no uppercase letters. (' + plugin.ruleName + ')',
    },
    {
      code: '.js-a-block {}',
      message: 'Expected class name "js-a-block" to use js-[prefix]-[block]__[state] syntax. (' + plugin.ruleName + ')',
    },
    {
      code: '.state-a-block {}',
      message: 'Expected class name "state-a-block" to use state-[prefix]-[block]--[state] syntax. (' + plugin.ruleName + ')',
    },
    {
      code: '.state-a-block_b {}',
      message: 'Expected class name "state-a-block_b" to use "_" only as element separator. (' + plugin.ruleName + ')',
    },
  ],
});

testRule(plugin.rule, {
  ruleName: plugin.ruleName,
  config: {
    namespace: 'namespace-',
  },
  skipBasicChecks: true,

  accept: [
    { code: '.namespace-a-block {}' },
    { code: '.namespace-m-block {}' },
    { code: '.namespace-o-block {}' },
    { code: '.namespace-l-block {}' },
    { code: '.namespace-g-block {}' },
    { code: '.namespace-h-block {}' },

    { code: '.namespace-js-a-block__hook-name {}' },
    { code: '.namespace-js-m-block__hook-name {}' },
    { code: '.namespace-js-o-block__hook-name {}' },
    { code: '.namespace-js-l-block__hook-name {}' },
    { code: '.namespace-js-g-block__hook-name {}' },
    { code: '.namespace-js-h-block__hook-name {}' },

    { code: '.namespace-state-a-block--state-name {}' },
    { code: '.namespace-state-m-block--state-name {}' },
    { code: '.namespace-state-o-block--state-name {}' },
    { code: '.namespace-state-l-block--state-name {}' },
    { code: '.namespace-state-g-block--state-name {}' },
    { code: '.namespace-state-h-block--state-name {}' },

    { code: '.namespace-a-block--modifier {}' },
    { code: '.namespace-m-block--modifier {}' },
    { code: '.namespace-o-block--modifier {}' },
    { code: '.namespace-l-block--modifier {}' },
    { code: '.namespace-g-block--modifier {}' },
    { code: '.namespace-h-block--modifier {}' },

    { code: '.namespace-a-block__block {}' },
    { code: '.namespace-m-block__block {}' },
    { code: '.namespace-o-block__block {}' },
    { code: '.namespace-l-block__block {}' },
    { code: '.namespace-g-block__block {}' },
    { code: '.namespace-h-block__block {}' },
  ],

  reject: [
    {
      code: '.a-block {}',
      message: 'Expected class name "a-block" to use the namespace "namespace-". (' + plugin.ruleName + ')',
    },
  ],
});


// Should not conflict with keyframes
testRule(plugin.rule, {
  ruleName: plugin.ruleName,
  config: {},
  skipBasicChecks: true,

  accept: [
    { code: '@keyframes blue-background-change { 0% { background: black } }' },
  ],

  reject: [],
});
