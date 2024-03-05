export function getCursorPosition(element) {
	const selection = document.getSelection();
	const range = new Range();
	range.setStart(element, 0);
	range.setEnd(selection.anchorNode, selection.anchorOffset);
	return range.toString().length;
}

export function setCursorPosition(element, position) {
	let child = element.firstChild;
	while (position > 0) {
		let length = child.textContent.length;
		if (position > length) {
			position -= length;
			child = child.nextSibling;
		} else {
			if (child.nodeType == 3) {
				return document.getSelection().collapse(child, position);
			}
			child = child.firstChild;
		}
	}
}

export function adjustCursorToEnd(element) {
	element.focus();
	const range = document.createRange();
	range.selectNodeContents(element);
	range.collapse(false);
	const selection = window.getSelection();
	selection.removeAllRanges();
	selection.addRange(range);
}
