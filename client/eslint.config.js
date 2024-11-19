import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
	...pluginVue.configs['flat/strongly-recommended'],
	eslintPluginPrettierRecommended,
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
		rules: {
			'no-var': ['off'],
			'prettier/prettier': ['off'],
			'vue/script-indent': ['error', 'tab', { baseIndent: 0 }], // Установка отступов в 0 внутри <script setup>
			indent: ['error', 'tab'],
			'linebreak-style': ['error', 'unix'],
			quotes: ['error', 'single'],
			semi: ['error', 'always'],
			'vue/no-unused-vars': 'error',
			'vue/html-indent': [
				'error',
				'tab',
				{
					attribute: 1,
					baseIndent: 1,
					closeBracket: 0,
					alignAttributesVertically: true,
					ignores: [],
				},
			],
		},
	},
	...vueTsEslintConfig({
		extends: ['recommended'],
		supportedScriptLangs: {
			ts: true,

			// [!DISCOURAGED]
			// Set to `true` to allow plain `<script>` or `<script setup>` blocks.
			// This might result-in false positive or negatives in some rules for `.vue` files.
			// Note you also need to configure `allowJs: true` and `checkJs: true`
			// in corresponding `tsconfig.json` files.
			js: false,

			// [!STRONGLY DISCOURAGED]
			// Set to `true` to allow `<script lang="tsx">` blocks.
			// This would be in conflict with all type-aware rules.
			tsx: false,

			// [!STRONGLY DISCOURAGED]
			// Set to `true` to allow `<script lang="jsx">` blocks.
			// This would be in conflict with all type-aware rules and may result in false positives.
			jsx: false,
		},
	}),
	{
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
		},
	},
];
