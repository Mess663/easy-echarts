module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
		// "plugin:jsx-a11y/recommended"
	],
	"overrides": [],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"@typescript-eslint"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		], 
		"react/jsx-wrap-multilines": [
			"error",
			{
				"declaration": "parens-new-line",
				"assignment": "parens-new-line",
				"return": "parens-new-line",
				"arrow": "parens-new-line",
				"condition": "parens-new-line",
				"logical": "parens-new-line",
				"prop": "parens-new-line"
			}
		],
		"object-curly-spacing": [
			"warn", "always"
		], 
		"react/jsx-max-props-per-line": [1, { "when": "multiline" }],
		'react/jsx-closing-bracket-location': [1, 'tag-aligned'],
		"react/self-closing-comp": ["error", {
			"component": true,
			"html": true
		}],
		"object-shorthand": ["error", "always"],
		"no-trailing-spaces": ["error", { "skipBlankLines": true }],
		"brace-style": ["error", "stroustrup", { "allowSingleLine": true }],
		"key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
		"space-infix-ops": ["error", {"int32Hint": false}],

		// ts解析支持jsx，不需要在jsx中引入react
		"react/jsx-uses-react": "off",
		"react/react-in-jsx-scope": "off",

		"@typescript-eslint/ban-ts-comment": "off",
	}
};
