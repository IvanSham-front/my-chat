module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended'],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['vue', '@typescript-eslint', 'plugin:vue/vue3-recommended'],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
	},
};
