import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	base: './',
	root: './src',
	publicDir: resolve(__dirname, 'src/public'),
	assetsDir: 'assets',
	build: {
		outDir: resolve(__dirname, 'dist'),
		minify: false,//文字化け回避策として圧縮はプラグインでcssとjs別々に行う
		emptyOutDir: true,//ビルド時はまずdistファイルを空にしてから行う
		rollupOptions: {
			output: {
				//assetファイルはjs/image/css/fontに分類して指定した名前で保存
				entryFileNames: `assets/main.js`,
				assetFileNames: (assetFile) => {
					if (/\.css$/.test(assetFile.name)) {
						return 'assets/css/[name].[ext]';
					} else if (/\.( gif|jpeg|jpg|png|svg|webp| )$/.test(assetFile.name)) {
						return 'assets/image/[name].[ext]';
						} else if(/\.( ttf|otf|eot|woff|woff2| )$/.test(assetFile.name)) {
          return 'assets/fonts/[name].[ext]';
					} else {
						return 'assets/[name].[ext]';
					}
				}
			},
			input: {//ベースとなるindex.htmlとURLに応じて切り替えられるコンポーネントとしてのhtmlファイル
				index: resolve(__dirname, './src/index.html'),
				hero: resolve(__dirname, './src/hero.html'),
				about: resolve(__dirname, './src/about.html'),
				contact: resolve(__dirname, './src/contact.html'),
				thanks: resolve(__dirname, './src/thanks.html'),
				policy: resolve(__dirname, './src/policy.html'),
				work: resolve(__dirname, './src/work.html'),
				notfound: resolve(__dirname, './src/notfound.html'),
				404: resolve(__dirname, './src/404.html')
			}
		}
	},
	//開発サーバーのポート指定
	server: {
		port: 9999
	}
});
