module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        // 0 = off, 1 = warn, 2 = error
        "@typescript-eslint/no-empty-interface": 1,
        '@typescript-eslint/no-var-requires': 0,
        'react/react-in-jsx-scope': 0,
    }
}
