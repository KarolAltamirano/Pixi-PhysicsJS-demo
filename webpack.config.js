module.exports = {
    entry: './src/scripts/main.js',
    module: {
        loaders: [
            { test: /\.json$/, loader: 'json' }
        ]
    }
};
