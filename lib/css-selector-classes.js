'use strict';

const CssSelectorParser = require('css-selector-parser').CssSelectorParser;
const cssSelector = new CssSelectorParser();

cssSelector.registerSelectorPseudos('not', 'is', 'has');
cssSelector.registerNestingOperators('>', '+', '~');
cssSelector.registerAttrEqualityMods('^', '$', '*', '~');

/**
 * Recursively visits nodes in a CSS rule tree and applies a function to each rule node.
 *
 * @param {Object} node - The root node of the CSS rule tree.
 * @param {function} fn - The function to apply to each rule node.
 * @returns {void}
 */
function visitRules(node, fn) {
	if (node.rule) {
		visitRules(node.rule, fn);
	}
	if (node.selectors) {
		node.selectors.forEach((selector) => {
			visitRules(selector, fn);
		});
	}
	if (node.pseudos) {
		node.pseudos.forEach((pseudo) => {
			if (pseudo.valueType === 'selector') {
				visitRules(pseudo.value, fn);
			}
		});
	}
	if (node.type === 'rule') {
		fn(node);
	}
}

/**
 * Return all the classes in a CSS selector.
 *
 * @param {string} selector A CSS selector
 * @returns {string[]} An array of every class present in the CSS selector
 */
function getCssSelectorClasses(selector) {
	let list = [];
	const ast = cssSelector.parse(selector);
	visitRules(ast, (ruleSet) => {
		if (ruleSet.classNames) {
			list = list.concat(ruleSet.classNames);
		}
	});
	return Array.from(new Set(list));
}

module.exports = getCssSelectorClasses;
