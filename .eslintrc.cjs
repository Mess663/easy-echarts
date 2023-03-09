module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"overrides": [
	],
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
		"object-curly-spacing" : [
			"warn", "always"
		] 
	}
};
