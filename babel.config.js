module.exports = {
    ignore: ["src/miniplates"],
    presets: [
        ['@babel/preset-env', {
            targets: {
                node: 12
            }
        }]
    ],
    plugins: [
        '@babel/plugin-proposal-function-bind',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-optional-catch-binding'
    ],
    env: {
        development: {
            sourceMaps: 'inline',
            plugins: ['source-map-support']
        }
    },
    comments: false
}
