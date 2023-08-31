'use strict';

const createParser = require('css-selector-parser').createParser;
const parse = createParser({ syntax: 'progressive' });

/* eslint-disable complexity */

/**
 * Recursively visits nodes in a CSS rule tree and applies a function to each rule node.
 *
 * @param {Object} node - The root node of the CSS rule tree.
 * @param {function} fn - The function to apply to each rule node.
 * @returns {void}
 */
function visitRules(node, fn) {

	if (!node) { return; }

	if (node.rules) {
		node.rules.forEach((rule) => visitRules(rule, fn));
	}

	if (node.nestedRule?.pseudoClasses) {
		node.nestedRule.pseudoClasses.forEach((pseudo) => visitRules(pseudo.argument, fn));
	}

	if (node.attributes) {
		const classAttribute = node.attributes.find((attribute) => attribute.name === 'class');
		if (classAttribute?.value?.value) {
			fn({ classNames: [classAttribute.value.value] });
		}
	}

	if (node.pseudoClasses) {
		node.pseudoClasses.forEach((pseudo) => {
			if (pseudo.argument?.rules) {
				pseudo.argument.rules.forEach((rule) => visitRules(rule, fn));
			}
		});
	}

	if (node.type === 'Rule') {
		fn(node);
	}
}
/* eslint-enable complexity */

/**
 * Return all the classes in a CSS selector.
 *
 * @param {string} selector A CSS selector
 * @returns {string[]} An array of every class present in the CSS selector
 */
function getCssSelectorClasses(selector) {
	let list = [];
	const ast = parse(selector);
	visitRules(ast, (ruleSet) => {
		if (ruleSet.classNames) {
			list = list.concat(ruleSet.classNames);
		}
	});
	return Array.from(new Set(list));
}

module.exports = getCssSelectorClasses;
