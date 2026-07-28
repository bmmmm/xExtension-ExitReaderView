# Exit Reader View

A [FreshRSS](https://freshrss.org) extension that adds a floating button to the
reading view, returning to the normal view in one click.

## Why

In the reading view the nav menu scrolls out of sight along with the article. To
get back to the overview you have to scroll all the way up first, or edit the
URL by hand. This adds a small control that stays put.

The current filter is preserved — leaving the reading view while looking at a
single feed, category, tag or search result returns to that same selection in
the normal view.

The button only appears in the reading view. It is hidden everywhere else.

## Installation

1. Download this repository and place the `ExitReaderView` directory into the
   `extensions/` directory of your FreshRSS installation.
2. Enable **Exit Reader View** under *Configuration → Extensions*.

## Known limitation

The button is `position: fixed`, so it is drawn on top of the article. With a
narrow window, or with *Content width* set to *Wide* or *Full width*, it can
cover a small part of the text. It is deliberately kept small and semi
transparent, becoming fully opaque on hover and focus.

## Translations

English and German are included. The label is exposed through the `JsVars` hook,
so adding a language only means adding an `i18n/<code>/ext.php` file.

## Licence

[AGPL-3.0](LICENSE), matching FreshRSS itself.

## Support

If you find this useful, you can [buy me a coffee](https://ko-fi.com/bmabma).
