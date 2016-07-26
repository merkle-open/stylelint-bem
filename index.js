// @see https://github.com/stylelint/stylelint/blob/master/docs/developer-guide/plugins.md
var stylelint = require('stylelint');
var resolvedNestedSelector = require('postcss-resolve-nested-selector');
var extractCssClasses = require('css-selector-classes');

var ruleName = 'plugin/stylelint-bem-namics';
var messages = stylelint.utils.ruleMessages(ruleName, {
  expected: function expected(selector, expectedSelector) {
    return 'Expected class name \"' + selector + '\" to ' + expectedSelector + '.';
  },
});

module.exports = stylelint.createPlugin(ruleName, function(options) {
  options = options || '';

  var validComponents = [
    'a',
    'm',
    'o',
    'l',
    'g',
    'h',
  ];
  var validHelpers = [
    'state',
  ];

  var validPrefixes = []
    .concat(validComponents)
    .concat(validHelpers);

  function getClassNameErrors(className, namespace) {
    var patternStart = '';
    var patternEnd = '';

    if (/[A-Z]/.test(className)) {
      return 'contain no uppercase letters';
    }
    if (namespace) {
      if (className.indexOf(namespace) !== 0) {
        return 'use the namespace "' + namespace + '"';
      }
      className = className.substr(namespace.length);
      patternStart += namespace;
    }

    var prefix = className.split('-')[0];
    var helper = '';
    if (className.indexOf('-') === -1 || validPrefixes.indexOf(prefix) === -1) {
      return 'start with a valid prefix: "' + namespace + validPrefixes.join('-", "' + namespace) + '-"'
    }
    if (validHelpers.indexOf(prefix) !== -1) {
      helper = prefix;
      prefix = className.split('-')[1];
      patternStart += helper + '-';
      patternEnd += '--[' + helper + ']';
      className = className.substr(helper.length + 1 + prefix.length + 1);
      if (validComponents.indexOf(prefix) === -1) {
        return 'use ' + patternStart + '[prefix]-[block]' + patternEnd + ' syntax. Valid ' + namespace + helper + ' prefixes: "' + namespace +
          validComponents.map(function(component) {
            return helper + '-' + component;
          }).join('-", "' + namespace) + '-"';
      }
    }
    else {
      className = className.substr(prefix.length + 1);
    }

    if (!/^[a-z]/.test(className)) {
      return 'use ' + patternStart + '[prefix]-[block]' + patternEnd + ' syntax';
    }
    if (/__(_|.*__)/.test(className)) {
      return 'use only one "__" element separator';
    }
    if (/--(-|.*--)/.test(className)) {
      return 'use only one "--" modifier separator';
    }
    if (/(^|[^_])_([^_]|$)/.test(className)) {
      return 'use "_" only as element separator'
    }
    if (helper === 'state' && className.indexOf('--') === -1) {
      return 'use ' + patternStart + '[prefix]-[block]' + patternEnd + ' syntax';
    }
  }

  return function(root, result) {
    var validOptions = stylelint.utils.validateOptions({
      ruleName: ruleName,
      result: result,
      actual: options,
    });

    if (!validOptions) {
      return;
    }

    var namespace = options.namespace || '';
    var classNameErrorCache = {};
    root.walkRules(function(rule) {
      // Skip keyframes
      if (rule.parent.name === 'keyframes') {
        return;
      }
      rule.selectors.forEach(function(selector) {
        if (selector.indexOf('(') !== -1 && (selector.indexOf(':') === -1 || selector.indexOf('@') !== -1)) {
          // Skip less mixins
          return;
        }
        resolvedNestedSelector(selector, rule).forEach(function(resolvedSelector) {
          var classNames = [];
          try {
            classNames = extractCssClasses(resolvedSelector);
          } catch (e) {
            stylelint.utils.report({
              ruleName: ruleName,
              result: result,
              node: rule,
              message: e.message,
            });
          }
          classNames.forEach(function(className) {
            if (classNameErrorCache[className] === undefined) {
              classNameErrorCache[className] = getClassNameErrors(className, namespace, rule);
            }
            if (classNameErrorCache[className]) {
              stylelint.utils.report({
                ruleName: ruleName,
                result: result,
                node: rule,
                message: messages.expected(className, classNameErrorCache[className]),
              });
            }
          });
        });
      });
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;