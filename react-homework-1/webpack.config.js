const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    // конфигурация dev сервера
    devServer: {
        // путь к папке после изменения которой будет перегагружаться страница
        contentBase: './dist'
    },
    // путь к начальному файлу
    entry: './src/index.js',
    // то в какой файл будет скомпилирован весь код и в какую дирикторию
    output: {
        // имя скомпилированного файла
        filename: 'bundle.js',
        // путь к нему
        path: path.resolve(__dirname, 'dist'),
        // очищает папку dist перед каждым build
        clean: true,
    },
    // блок для модулей (файлов которые вставляем через import)
    module: {
        // правила по которым мы их обрабатываем
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(ttf|woff|woff2|otf|eot)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React test app',
            template: "./public/index.html"
        }),
    ]
};
