import $ from 'jquery';
//お問い合わせフォームのバリデーションと多重送信防止関数

/** メールアドレスの正規表現 */
const regex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

/** 送信ボタンとその子孫要素の可視性を切り替えるメソッド */
const chengeVisibilityButton = (state:'hidden' | 'visible') => {
	$('#js-form__button').css('visibility', state).find('.js-form__button').css('visibility', state);
};
/** 送信ボタンの活性・非活性を切り替えて、引数（条件式）の結果を逆転した戻り値を返すメソッド */
const chengeDisabledButton = (boolean: boolean): boolean => {
	if (boolean) {
		$('#js-form__button').prop('disabled', boolean);
		return false;
	} else {
		$('#js-form__button').prop('disabled', boolean);
		return true;
	}
};
/** formの対象項目に新入力があった際に送信ボタンを活性化させるイベントリスナー */
const ChangeButtonActive = (elm: JQuery<HTMLInputElement | HTMLTextAreaElement>) => {
	$(document).on('keyup', elm, () => {
		if (elm.val() !== '') {
			chengeDisabledButton(false)
			chengeVisibilityButton('visible');
		}
	});
};
/** 名前入力欄にイベントリスナーを登録  */
ChangeButtonActive($('#js-form__name'));

/** メールアドレス欄にイベントリスナーを登録  */
ChangeButtonActive($('#js-form__email'));

/** お問い合わせ内容欄にイベントリスナーを登録  */
ChangeButtonActive($('#js-form__text'));

/** [確認しました]入力欄にイベントリスナーを登録  */
ChangeButtonActive($('#js-form__confirm'));

/**formの送信ボタンにイベントリスナーを登録 
 * 各入力項目をバリデーションして通過した場合は多重送信防止用に非表示にする
 * 通過しなかった場合はの場合は非活性にする
 */
$(document).on('click', '#js-form__button', () => {
	if (!chengeDisabledButton($('#js-form__name').val() === '' || !$('#js-form__name'))) return false;
	if (!chengeDisabledButton(
			$('#js-form__email').val() === '' ||
				!$('#js-form__email') ||
				!regex.test($('#js-form__email').val() as string))){
		return false;
	}
	if (!chengeDisabledButton($('#js-form__text').val() === '' || !$('#js-form__text'))) return false;
	if (!chengeDisabledButton($('#js-form__confirm').val() !== '確認しました')) return false;

	chengeVisibilityButton('hidden');
});