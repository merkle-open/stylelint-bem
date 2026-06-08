module.exports = {
	extends: [
		'@merkle-open/eslint-config/configurations/es8-node.js',
	],
	settings: {
		'import/core-modules': ['stylelint'],
	},
	globals: {
		testRule: 'readonly',
	},
};
