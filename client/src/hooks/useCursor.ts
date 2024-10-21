export function useCursor() {

	const getCursorPosition = ( element: HTMLElement ): number => {
		
		const selection = document.getSelection();
		if ( !selection || !selection.anchorNode ) {
			return 0
		};

		const range = new Range();
		range.setStart(element, 0);
		range.setEnd(selection.anchorNode, selection.anchorOffset);

		return range.toString().length;

	};

	
	const setCursorPosition = (element: HTMLElement, position: number): void => {

		let child: ChildNode | null = element.firstChild;
		
		while (position > 0 && child) {

			const length = child.textContent?.length || 0;
			
			if (position > length) {
				position -= length;
				child = child.nextSibling;

			} else {

				if (child.nodeType === Node.TEXT_NODE) {
					document.getSelection()?.collapse(child, position);
					return;
				}

				child = child.firstChild;

			}

		}

	};

	const adjustCursorToEnd = (element: HTMLElement): void => {

		element.focus();
		const range = document.createRange();
		range.selectNodeContents(element);
		range.collapse(false);
		const selection = window.getSelection();
		selection?.removeAllRanges();
		selection?.addRange(range);

	};

	return {
		getCursorPosition,
		setCursorPosition,
		adjustCursorToEnd,
	};
}
