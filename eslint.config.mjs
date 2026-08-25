// eslint.config.mjs
import merkleConfig from '@merkle-open/eslint-config/es2025-node-disable-styles';

const IgnorePatterns = [
	'**/*.d.ts',
	'node_modules/**',
];

export default [
	{
		ignores: IgnorePatterns,
		settings: {
			'import/core-modules': ['stylelint'],
		},
		languageOptions: {
			globals: {
				testRule: 'readonly',
			}
		},
	},
	...merkleConfig,
];
