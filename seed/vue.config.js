const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
});
module.exports = {
	lintOnSave:false,
	devServer: {
		host: "localhost",
		// port: 3306,
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:3000',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		},
	}
}
