/* eslint complexity:off */
'use strict';
// @see https://github.com/stylelint/stylelint/blob/master/docs/developer-guide/plugins.md
const stylelint = require('stylelint');
const resolvedNestedSelector = require('postcss-resolve-nested-selector');
const extractCssClasses = require('css-selector-classes');
const util = require('util');

const ruleName = 'plugin/stylelint-bem-namics';
const messages = stylelint.utils.ruleMessages(ruleName, {
	expected: function expected(selector, expectedSelector) {
		return `Expected class name "${selector}" to ${expectedSelector}.`;
	},
});

const addNamespace = util.deprecate((namespace, namespaces) => {
	if (!namespaces.includes(namespace)) {
		namespaces.push(namespace);
	}
}, 'Using the "namespace" option of @namics/stylelint-bem is deprecated. ' +
'Please use the new namespaces option which allows using multiple namespaces');

module.exports = stylelint.createPlugin(ruleName, (options) => {
	options = options || '';

	const validPatternPrefixes = Array.isArray(options.patternPrefixes) ? options.patternPrefixes : [
		'a',
		'm',
		'o',
		'l',
		'g',
		'h',
	];

	const validHelperPrefixes = Array.isArray(options.helperPrefixes) ? options.helperPrefixes : [
		'state',
	];

	const validPrefixes = []
		.concat(validPatternPrefixes)
		.concat(validHelperPrefixes);

	/**
	 * Extracts the namespace, helper and prefix from the given className
	 * 'ux-state-a-button'
	 * @param {string} fullClassName the class name
	 * @param {string[]} namespaces (optional) namespace
	 * @returns {Object} namespace, helper, pattern, name
	 *
	 */
	function parseClassName(fullClassName, namespaces) {
		const result = {};
		let className = fullClassName;
		// Extract the namespace
		if (namespaces.length) {
			const namespaceIndex = namespaces.findIndex((namespace) => {
				return className.startsWith(namespace);
			});
			if (namespaceIndex === -1) {
				return result;
			}
			const namespace = namespaces[namespaceIndex];
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
		result.parts = className.split(/__|--/);
		return result;
	}

	/**
	 * Helper for error messages to tell the correct syntax
	 *
	 * @param {string} className the class name
	 * @param {string[]} namespaces (optional) namespace
	 * @returns {string} valid syntax
	 */
	function getValidSyntax(className, namespaces) {
		const parsedClassName = parseClassName(className, namespaces);
		// Try to guess the namespaces or use the first one
		let validSyntax = parsedClassName.namespace || namespaces[0] || '';
		if (parsedClassName.helper) {
			validSyntax += `${parsedClassName.helper}-`;
		}
		if (parsedClassName.pattern) {
			validSyntax += `${parsedClassName.pattern}-`;
		} else if (validPatternPrefixes.length) {
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
	 * @param {string[]} namespaces - the namespace (optional)
	 * @returns {string} error message
	 */
	function getClassNameErrors(className, namespaces, options) {
		const firstLetterUppercase = options.firstLetterUppercase || false;

		if (!(/[A-Z][a-z]+([-]{1,2}[a-z]+)*/).test(className) && firstLetterUppercase) {
			return 'contain first uppercase letters';
		}

		if ((/[A-Z]/).test(className) && !firstLetterUppercase) {
			return 'contain no uppercase letters';
		}

		const parsedClassName = parseClassName(className, namespaces);
		const isAnyNamespaceUsed = namespaces.some((namespace) => parsedClassName.namespace === namespace);
		if (namespaces.length && !isAnyNamespaceUsed) {
			return namespaces.length > 1
				? `use one of the valid namespaces "${namespaces.join('", "')}"`
				: `use the namespace "${namespaces[0]}"`;
		}

		// Valid helper but invalid pattern prefix
		// e.g. 'state-zz-button'
		if (validPatternPrefixes.length && parsedClassName.helper && !parsedClassName.pattern) {
			// Try to guess the namespace
			const namespace = parsedClassName.namespace || namespaces[0] || '';
			const validPrefixExamples = validPatternPrefixes
				.map((prefix) => `"${namespace}${parsedClassName.helper}-${prefix}-"`)
				.join(', ');
			return `use the ${getValidSyntax(className, namespaces)} syntax. ` +
				`Valid ${parsedClassName.helper} prefixes: ${validPrefixExamples}`;
		}

		// Invalid pattern prefix
		if (validPatternPrefixes.length && !parsedClassName.pattern) {
			// Try to guess the namespace
			const namespace = parsedClassName.namespace || namespaces[0] || '';
			const validPrefixExamples = validPrefixes
				.map((prefix) => `"${namespace}${prefix}-"`)
				.join(', ');
			return `start with a valid prefix: ${validPrefixExamples}`;
		}

		if (!((/^[a-z]/).test(parsedClassName.name))) {
			return `use the ${getValidSyntax(className, namespaces)} syntax`;
		}
		if ((/___/).test(parsedClassName.name)) {
			return 'use only two "_" as element separator';
		}
		if ((/--.*__/).test(parsedClassName.name)) {
			return `use the ${getValidSyntax(className, namespaces)} syntax`;
		}
		if ((/--(-|.*--)/).test(parsedClassName.name)) {
			return 'use only one "--" modifier separator';
		}
		if ((/(^|[^_])_([^_]|$)/).test(parsedClassName.name)) {
			return 'use "_" only as element separator';
		}
		// disallow hyphens at start and end of block parts
		if (parsedClassName.parts.some((elem) => (/^(-.*|.*-)$/).test(elem))) {
			return 'use "-" only for composite names';
		}
		if (parsedClassName.helper && parsedClassName.name.indexOf('--') === -1) {
			return `use the ${getValidSyntax(className, namespaces)} syntax`;
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

		const namespaces = options.namespaces || [];

		// As we now support options.namespaces
		// the following lines will be removed in future:
		if (options.namespace) {
			addNamespace(options.namespace, namespaces);
		}

		const classNameErrorCache = {};
		root.walkRules((rule) => {
			// Skip keyframes
			if (rule.parent.name === 'keyframes') {
				return;
			}
			rule.selectors.forEach((selector) => {
				if (selector.startsWith('%')) {
					// Skip scss placeholders
					return;
				}
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
							classNameErrorCache[className] = getClassNameErrors(className, namespaces, options);
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
