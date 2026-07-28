'use strict';

// The reading view has no persistent way back once the nav menu has scrolled
// out of sight. This adds a floating control that returns to the normal view,
// keeping whatever feed, category, tag or search is currently active.
(function () {
	const FALLBACK_LABEL = 'Exit the reading view';

	function translatedLabel() {
		const vars = window.context && window.context.extensions;
		const own = vars && vars.exit_reader_view;
		return (own && own.label) || FALLBACK_LABEL;
	}

	function applyLabel(link) {
		const label = translatedLabel();
		link.title = label;
		link.setAttribute('aria-label', label);
	}

	function addExitButton() {
		const stream = document.getElementById('stream');
		if (stream === null || !stream.classList.contains('reader')) {
			return;
		}
		if (document.getElementById('exit-reader-view') !== null) {
			return;
		}

		const url = new URL(window.location.href);
		url.searchParams.set('c', 'index');
		url.searchParams.set('a', 'normal');

		const link = document.createElement('a');
		link.id = 'exit-reader-view';
		link.href = url.pathname + url.search;
		link.textContent = '✕';
		applyLabel(link);
		document.body.appendChild(link);
	}

	// The script is loaded asynchronously, so the global context may arrive
	// either before or after us. Insert the button as soon as the DOM allows,
	// and refresh the label if the translation shows up later.
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', addExitButton);
	} else {
		addExitButton();
	}

	document.addEventListener('freshrss:globalContextLoaded', function () {
		const link = document.getElementById('exit-reader-view');
		if (link !== null) {
			applyLabel(link);
		}
	});
})();
