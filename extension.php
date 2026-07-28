<?php
declare(strict_types=1);

final class ExitReaderViewExtension extends Minz_Extension {
	#[\Override]
	public function init(): void {
		parent::init();

		$this->registerTranslates();
		$this->registerHook(Minz_HookType::JsVars, [$this, 'jsVars']);

		Minz_View::appendStyle($this->getFileUrl('style.css'));
		Minz_View::appendScript($this->getFileUrl('script.js'));
	}

	/**
	 * The button is built client-side, so its label has to travel through the
	 * JS context rather than being rendered by a view.
	 *
	 * @param array<string,mixed> $vars
	 * @return array<string,mixed>
	 */
	public function jsVars(array $vars): array {
		$vars['exit_reader_view'] = [
			'label' => _t('ext.exit_reader_view.label'),
		];
		return $vars;
	}
}
