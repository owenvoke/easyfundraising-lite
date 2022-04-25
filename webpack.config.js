const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

const contentScripts = {
    content: './content/index.js'
}
const extensionPages = {
    options: './options/index.js',
}

let config = {
    mode: process.env.NODE_ENV,
    context: __dirname + '/src'
}

let ExtensionConfig = Object.assign({}, config, {
    entry: {
        background: './background/index.js',
        ...contentScripts,
        ...extensionPages
    },
    output: {
        path: __dirname + '/extension/dist/',
        filename: '[name].dist.js',
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: './icons/*',
                    to: __dirname + '/extension/dist/',
                },
                {
                    from: './options/index.html',
                    to: __dirname + '/extension/dist/options.html',
                },
                {
                    from: './options/index.css',
                    to: __dirname + '/extension/dist/options.css',
                },
            ]
        }),
    ]
})

module.exports = [
    ExtensionConfig,
]
