import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
    js.configs.recommended,
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './tsconfig.json',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
        },
        rules: {
            // TypeScript specific rules
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-inferrable-types': 'off',

            // General rules
            'no-console': 'off', // Allow console.log in backend
            'no-undef': 'off', // TypeScript handles this
            'no-unused-vars': 'off', // Use TypeScript version instead

            // Code style
            'indent': ['error', 2],
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
            'comma-dangle': ['error', 'only-multiline'],

            // Best practices
            'eqeqeq': 'error',
            'no-var': 'error',
            'prefer-const': 'error',
        },
    },
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        rules: {
            // Basic JS rules for config files
            'no-console': 'off',
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
        },
    },
    {
        // Ignore patterns
        ignores: [
            'dist/**',
            'node_modules/**',
            '*.sqlite',
            'coverage/**',
        ],
    },
];
