'use strict';

// The reading view has no persistent way back once the nav menu has scrolled
// out of sight. This adds a floating control that returns to the normal view,
// keeping whatever feed, category, tag or search is currently active.
(function () {
	const FALLBACK_LABEL = 'Exit the reading view';

	// Rebuilding the current URL rather than linking to a fixed path is what
	// preserves the selection: whatever feed, category, tag or search sits in
	// the query string stays, and only the controller/action pair that puts the
	// stream into the reading view is swapped back. Covered by
	// tests/exit-url.test.js — getting this wrong drops the reader on the
	// unfiltered stream, which reads as the extension losing their place.
	function exitUrl(href) {
		const url = new URL(href);
		url.searchParams.set('c', 'index');
		url.searchParams.set('a', 'normal');
		return url.pathname + url.search;
	}

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

		const link = document.createElement('a');
		link.id = 'exit-reader-view';
		link.href = exitUrl(window.location.href);
		link.textContent = '✕';
		applyLabel(link);
		document.body.appendChild(link);
	}

	// Under the test runner there is no document, and only the pure helper is
	// exported. The file itself is loaded as a plain <script> in the browser,
	// never as a CommonJS module.
	if (typeof document === 'undefined') {
		module.exports = { exitUrl: exitUrl };
		return;
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
