import coreWebVitals from "eslint-config-next/core-web-vitals"

export default [
    ...coreWebVitals,
    {
        rules: {
            "react/no-unescaped-entities": "warn",
            "react-hooks/set-state-in-effect": "warn",
            "react-hooks/purity": "warn",
            "@next/next/no-assign-module-variable": "warn",
        },
    },
]
