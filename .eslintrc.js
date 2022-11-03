module.exports = {
    // 在 .eslintrc.js 中需要指定react版本号：
    "settings": {
        "react": {
            "version": "17.0.2",
        }
    },
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    "overrides": [],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "prettier"
    ],
    "rules": {
        "prettier/prettier": 2, // 这项配置 对于不符合prettier规范的写法，eslint会提示报错
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "@typescript-eslint/no-explicit-any": ["off"],
        'prettier/prettier': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        "react/prop-types": 0,
        "react/react-in-jsx-scope": 'off',
        "react/jsx-key": 'off',
        'react/display-name': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'no-undef': 0,
        'no-redeclare': 'off',
        'react/no-unknown-property': 'off'
    }
}