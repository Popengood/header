;(function() {
	'use strict';

	let screenWidth = document.documentElement.clientWidth;
	const aside = document.querySelector('.aside-menu-container');
	const toprow = document.querySelector('.header-toprow');
	const topmenu = document.querySelector('.header-menu');
	const login = document.querySelector('.header-login');
	const mainrow = document.querySelector('.main-menu-row');
	const mainmenu = document.querySelector('.main-menu');
	const drop = document.getElementById('drop');

	window.addEventListener('load', () => {
		if (window.matchMedia('(max-width: 960px)').matches) {
			createAsideMenu();
		} else {
			destroyAsideMenu();
		}
		if (window.matchMedia('(max-width: 414px)').matches) {
			addAsideMenu();
		} else {
			destroyAddAsideMenu();
		}
	});

	window.addEventListener('resize', () => {
		if (window.matchMedia('(max-width: 960px)').matches) {
			createAsideMenu();
		} else {
			destroyAsideMenu();
		}
		if (window.matchMedia('(max-width: 414px)').matches) {
			addAsideMenu();
		} else {
			destroyAddAsideMenu();
		}
	});

	function createAsideMenu() {
		if (aside.querySelector('.header-menu')) return;
		aside.appendChild(topmenu);
		topmenu.style.display = 'flex';
	}

	function destroyAsideMenu() {
		if (toprow.querySelector('.header-menu')) return;
		toprow.insertBefore(topmenu, login);
		topmenu.removeAttribute('style');
	}

	function addAsideMenu() {
		if (aside.querySelector('.main-menu') && aside.querySelector('.city-list')) return;
		aside.appendChild(mainmenu);
		aside.appendChild(drop);
		mainmenu.style.display = 'flex';
		drop.hidden = false;
	}
	function destroyAddAsideMenu() {
		if (mainrow.querySelector('.main-menu') && mainrow.querySelector('.city-list')) return;
		mainrow.append(mainmenu);
		mainrow.append(drop);
		mainmenu.removeAttribute('style');
		drop.hidden = true;
	}

	///////////////////////////////////////////

	const overlay = document.querySelector('.overlay');
	const asidemenu = document.querySelector('.aside-menu');
	const open = document.querySelector('[data-open]');
	const close = document.querySelectorAll('[data-close]');

	open.addEventListener('click', asideShow);
	for (let el of close) {
		el.addEventListener('click', asideClose);
	}

	function asideShow() {
		overlay.classList.remove('fade-out');
		overlay.classList.add('fade-in');
		asidemenu.style.left = '0';
	}
	function asideClose() {
		asidemenu.removeAttribute('style');		
		overlay.classList.remove('fade-in');
		overlay.classList.add('fade-out');
	}





})();
