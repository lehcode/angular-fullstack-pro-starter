module.exports = {
    singleQuote: false,
    semi: true,
    tabWidth: 2,
    useTabs: false,
    trailingComma: 'none',
    printWidth: 140,
    overrides: [
        {
            files: ['*.html'],
            options: {
                useTabs: true,
                tabWidth: 4,
            },
        },
        {
            files: ['*.js'],
            options: {
                trailingComma: 'es5',
                semi: true,
                singleQuote: true,
            },
        },
        {
            files: ['*.ts'],
            options: {
                parser: 'typescript',
                trailingComma: 'es5',
                semi: true,
            },
        },
        {
            files: ['*.json'],
            options: {
                tabWidth: 4,
                semi: true,
                singleQuote: false,
            },
        },
        {
            files: ['*.yml'],
            options: {
                tabWidth: 4,
                semi: true,
                singleQuote: false,
            },
        },
    ],
}
