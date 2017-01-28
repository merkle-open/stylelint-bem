/* eslint complexity:off */
'use strict';
// @see https://github.com/stylelint/stylelint/blob/master/docs/developer-guide/plugins.md
const stylelint = require('stylelint');
const resolvedNestedSelector = require('postcss-resolve-nested-selector');
const extractCssClasses = require('css-selector-classes');

const ruleName = 'plugin/stylelint-bem-namics';
const messages = stylelint.utils.ruleMessages(ruleName, {
	expected: function expected(selector, expectedSelector) {
		return `Expected class name "${selector}" to ${expectedSelector}.`;
	},
});

module.exports = stylelint.createPlugin(ruleName, (options) => {
	options = options || '';

	const validPatternPrefixes = [
		'a',
		'm',
		'o',
		'l',
		'g',
		'h',
	];

	const validHelperPrefixes = [
		'state',
	];

	const validPrefixes = []
		.concat(validPatternPrefixes)
		.concat(validHelperPrefixes);

	/**
	 * Extracts the namespace, helper and prefix from the given className
	 * 'ux-state-a-button'
	 * @param {string} fullClassName the class name
	 * @param {string} namespace (optional) namespace
	 * @returns {Object} namespace, helper, pattern, name
	 *
	 */
	function parseClassName(fullClassName, namespace) {
		const result = {};
		let className = fullClassName;
		// Extract the namespace
		if (namespace) {
			if (className.indexOf(namespace) !== 0) {
				return result;
			}
			result.namespace = namespace;
			className = className.substr(namespace.length);
		}
		// Handle className with helper prefixes
		const helperPrefix = className.split('-')[0];
		if (validHelperPrefixes.indexOf(helperPrefix) !== -1) {
			result.helper = helperPrefix;
			className = className.substr(helperPrefix.length + 1);
		}
		// Handle classNames with prefixes
		const patternPrefix = className.split('-')[0];
		if (validPatternPrefixes.indexOf(patternPrefix) !== -1) {
			result.pattern = patternPrefix;
			className = className.substr(patternPrefix.length + 1);
		}
		result.name = className;
		return result;
	}

	/**
	 * Helper for error messages to tell the correct syntax
	 *
	 * @param {string} className the class name
	 * @param {string} namespace (optional) namespace
	 * @returns {string} valid syntax
	 */
	function getValidSyntax(className, namespace) {
		const parsedClassName = parseClassName(className, namespace);
		let validSyntax = namespace;
		if (parsedClassName.helper) {
			validSyntax += `${parsedClassName.helper}-`;
		}
		if (parsedClassName.pattern) {
			validSyntax += `${parsedClassName.pattern}-`;
		} else {
			validSyntax += '[prefix]-';
		}
		validSyntax += '[block]';
		if (className.indexOf('__') !== -1) {
			validSyntax += '__[element]';
		}
		if (validHelperPrefixes.indexOf(parsedClassName.helper) !== -1) {
			validSyntax += `--[${parsedClassName.helper}]`;
		} else if (className.indexOf('--') !== -1) {
			validSyntax += '--[modifier]';
		}
		return validSyntax;
	}

	/**
	 * Validates the given className and returns the error if it's not valid
	 * @param {string} className - the name of the class e.g. 'a-button'
	 * @param {string} namespace - the namespace (optional)
	 * @returns {string} error message
	 */
	function getClassNameErrors(className, namespace) {

		if (/[A-Z]/.test(className)) {
			return 'contain no uppercase letters';
		}

		const parsedClassName = parseClassName(className, namespace);
		if (namespace && namespace !== parsedClassName.namespace) {
			return `use the namespace "${namespace}"`;
		}

		// Valid helper but invalid pattern prefix
		// e.g. 'state-zz-button'
		if (parsedClassName.helper && !parsedClassName.pattern) {
			const validPrefixExamples = validPatternPrefixes
				.map((prefix) => `"${namespace}${parsedClassName.helper}-${prefix}-"`)
				.join(', ');
			return `use the ${getValidSyntax(className, namespace)} syntax. ` +
				`Valid ${parsedClassName.helper} prefixes: ${validPrefixExamples}`;
		}

		// Invalid pattern prefix
		if (!parsedClassName.pattern) {
			const validPrefixExamples = validPrefixes
				.map((prefix) => `"${namespace}${prefix}-"`)
				.join(', ');
			return `start with a valid prefix: ${validPrefixExamples}`;
		}

		if (!(/^[a-z]/.test(parsedClassName.name))) {
			return `use the ${getValidSyntax(className, namespace)} syntax`;
		}
		if (/___/.test(parsedClassName.name)) {
			return 'use only two "_" as element separator';
		}
		if (/--.*__/.test(parsedClassName.name)) {
			return `use the ${getValidSyntax(className, namespace)} syntax`;
		}
		if (/--(-|.*--)/.test(parsedClassName.name)) {
			return 'use only one "--" modifier separator';
		}
		if (/(^|[^_])_([^_]|$)/.test(parsedClassName.name)) {
			return 'use "_" only as element separator';
		}
		if (parsedClassName.helper && parsedClassName.name.indexOf('--') === -1) {
			return `use the ${getValidSyntax(className, namespace)} syntax`;
		}
	}

	return (root, result) => {
		const validOptions = stylelint.utils.validateOptions({
			ruleName,
			result,
			actual: options,
		});

		if (!validOptions) {
			return;
		}

		const namespace = options.namespace || '';
		const classNameErrorCache = {};
		root.walkRules((rule) => {
			// Skip keyframes
			if (rule.parent.name === 'keyframes') {
				return;
			}
			rule.selectors.forEach((selector) => {
				if (selector.indexOf('(') !== -1 && (selector.indexOf(':') === -1 || selector.indexOf('@') !== -1)) {
					// Skip less mixins
					return;
				}
				resolvedNestedSelector(selector, rule).forEach((resolvedSelector) => {
					let classNames = [];
					try {
						// Remove ampersand from inner sass mixins and parse the class names
						classNames = extractCssClasses(resolvedSelector.replace(/&\s*/ig, ''));
					} catch (e) {
						stylelint.utils.report({
							ruleName,
							result,
							node: rule,
							message: e.message,
						});
					}
					classNames.forEach((className) => {
						if (classNameErrorCache[className] === undefined) {
							classNameErrorCache[className] = getClassNameErrors(className, namespace, rule);
						}
						if (classNameErrorCache[className]) {
							stylelint.utils.report({
								ruleName,
								result,
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
