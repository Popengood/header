;(function() {
	'use strict';

	const more = document.querySelector('.more');
	const drop = document.getElementById('drop');
	const sizes = [];
	let screenWidth = document.documentElement.clientWidth;
	let menu = '';
	let tm = 0;

	window.addEventListener('load', () => init(0));
	window.addEventListener('resize', () => {
		clearTimeout(tm);
		tm =setTimeout(() => {
			let currScreenWidth = document.documentElement.clientWidth;
			let ch = (currScreenWidth < screenWidth) ? 0 : 1;
			screenWidth = currScreenWidth;
			init(ch);
		}, 24);
	});

	more.addEventListener('click', () => drop.hidden = !drop.hidden);

	function init(ch) {
		menu = document.querySelector('.main-menu');
		let menuWidth = menu.offsetWidth;
		let els = menu.querySelectorAll('li');
		let menuMargin = parseInt(getComputedStyle(menu, true).marginLeft);
		let menuRow = document.querySelector('.main-menu-row').offsetWidth + 2;
		let totalWidth = menuWidth + menuMargin;

		if (ch) {
			let accum = Object.values(els).reduce((accum, li) => accum + li.offsetWidth, 0);
			let liWidth = sizes[sizes.length - 1];
			let place = (sizes.length == 1) ? menuWidth - accum + more.offsetWidth : menuWidth - accum;

			if (place < liWidth) return;
			retransform();
			if (place >= liWidth) return init(1);
		} else {
			if (menuRow >= totalWidth) return;
			transform();
			if (menuRow < totalWidth) return init(0);
		}
	}

	function transform() {
		more.hidden = false;
		sizes.push(more.previousElementSibling.clientWidth);
		drop.prepend(more.previousElementSibling);
	}
	function retransform() {
		const els = drop.querySelectorAll('li') || null;
		if (els.length === 0) return;
		menu.insertBefore(els[0], more);
		sizes.pop();
		if (els[0].classList.contains('last-item')) {
			more.hidden = true;
			drop.hidden = true;
		} else {
			more.hidden = false;
		}
	}
})();