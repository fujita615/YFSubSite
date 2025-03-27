import $ from 'jquery';
/** mailの正規表現 */
const regex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

/**formの送信ボタンのclickイベント
 * 各入力項目をバリデーションして通過した場合は多重送信防止用にbuttonを非表示にする
 * 不可の場合はclickを非活性にする
 */
$(document).on('click', '#js-form__button', () => {
	if ($('#js-form__name').val() === '' || !$('#js-form__name')) {
		$('#js-form__button').prop('disabled', true);
		return false;
	} else {
		$('#js-form__button').prop('disabled', false);
	}

	if ($('#js-form__email').val() === '' || !$('#js-form__email')) {
		$('#js-form__button').prop('disabled', true);
		return false;
	} else if (!regex.test($('#js-form__email').val() as string)) {
		$('#js-form__button').prop('disabled', true);
		return false;
	} else {
		$('#js-form__button').prop('disabled', false);
	}

	if ($('#js-form__text').val() === '' || !$('#js-form__text')) {
		$('#js-form__button').prop('disabled', true);
		return false;
	} else {
		$('#js-form__button').prop('disabled', false);
	}

	if ($('#js-form__confirm').val() === '確認しました') {
		$('#js-form__button').prop('disabled', false);
	} else {
		$('#js-form__button').prop('disabled', true);
		return false;
	}

	$('#js-form__button')
		.css('visibility', 'hidden')
		.find('.js-form__button')
		.css('visibility', 'hidden');
});
/**
 * 名前入力に新規入力があった際は送信ボタンの非表示・非活性を解除する
 */
$(document).on('keyup', '#js-form__name', (e) => {
	if (e.target.value !== '') {
		$('#js-form__button')
			.prop('disabled', false)
			.css('visibility', 'visible')
			.find('.js-form__button')
			.css('visibility', 'visible');
	}
});
/**
 * メールアドレス入力に新規入力があった際は送信ボタンの非表示・非活性を解除する
 */
$(document).on('keyup', '#js-form__email', (e) => {
	if (e.target.value !== '') {
		$('#js-form__button')
			.prop('disabled', false)
			.css('visibility', 'visible')
			.find('.js-form__button')
			.css('visibility', 'visible');
	}
});
/**
 * お問い合わせ内容入力に新規入力があった際は送信ボタンの非表示・非活性を解除する
 */
$(document).on('keyup', '#js-form__text', (e) => {
	if (e.target.value !== '') {
		$('#js-form__button')
			.prop('disabled', false)
			.css('visibility', 'visible')
			.find('.js-form__button')
			.css('visibility', 'visible');
	}
});
/**
 * [確認しました]入力に新規入力があった際は送信ボタンの非表示・非活性を解除する
 */
$(document).on('keyup', '#js-form__confirm', (e) => {
	if (e.target.value !== '') {
		$('#js-form__button')
			.prop('disabled', false)
			.css('visibility', 'visible')
			.find('.js-form__button')
			.css('visibility', 'visible');
	}
});
