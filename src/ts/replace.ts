import $ from 'jquery';
(() => {
	//hashを取得して<div id=replace>内の描写をhashに対応するhtmlファイルに差し替える即時関数

	//切り替えるURLのhashを配列hash_listに登録
	const hash_list: string[] = ['hero', 'work', 'about', 'contact', 'policy', 'thanks', '404'];
	//描写を切り替えるhtml要素
	const replace: HTMLElement | null = document.getElementById('replace');

	//URLのhashを取得して描写を切り替える関数
	function replacePage(): void {
		const fileName: string = location.hash.slice(1);
		const in_hash: boolean = hash_list.includes(fileName);
		if (in_hash && replace) {
			$.get(`/${fileName}.html`)
				.done((data) => {
					replace.innerHTML = data;
				})
				.fail(() => {
					//htmlデータを取得できなかった場合に描写するerrorページ
					replace.innerHTML =
						'<div class="p-container"><p class="c-paragraph c-paragraph--article"><br /><br /><br /> 申し訳ございません。システムエラーが発生しております。<br /><br /><br /><br /><br /><a class="c-link c-link--hero c-sub-heading" href="index.html">>>HOME</a></p></div>';
				})
				.always(() => {
					//windowのTOP位置までスクロール
					window.scrollTo(0, 0);
				});
		} else {
			//登録していないhashの時は404ページを描写
			location.hash = '404';
		}
	}

	//hashの切り替え時を検知したらreplacePage関数を実行
	window.addEventListener('hashchange', (): void => {
		replacePage();
	});

	//ページ読み込み時はheroページを表示
	window.addEventListener('load', (): void => {
		location.hash = 'hero';
		replacePage();
	});
})();
