'use strict';

const createParser = require('css-selector-parser').createParser;
const parse = createParser({ syntax: 'progressive', strict: false });

/**
 * Recursively visits nodes in a CSS rule tree and applies a function to each rule node item.
 * (Classes as attributes are ignored.)
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

	if (node.nestedRule) {
		visitRules(node.nestedRule, fn);
	}

	node.items?.forEach((item) => {
		if (item.type === 'ClassName') {
			fn(item.name);
		} else if (item.type === 'PseudoClass') {
			visitRules(item.argument, fn);
		}
	});
}

/**
 * Return all the classes in a CSS selector.
 *
 * @param {string} selector A CSS selector
 * @returns {string[]} An array of every class present in the CSS selector
 */
function getCssSelectorClasses(selector) {
	const list = [];
	const ast = parse(selector);

	visitRules(ast, (className) => list.push(className));

	return Array.from(new Set(list));
}

module.exports = getCssSelectorClasses;
