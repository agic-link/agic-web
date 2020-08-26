module.exports = {
    outputDir: './dist/html',
    devServer: {
        open: false, //是否自动弹出浏览器页面
        host: "localhost",
        port: '8080',
        https: false,
        hotOnly: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8081', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/api': ''
                }
            }
        },
    }
}