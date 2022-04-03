;(function() {
	'use strict';

	// select city
	const sg = document.querySelector('.select-geo');
	const arrow = sg.querySelector('.arrow');
	const city = document.getElementById('city');
	const cities = document.querySelector('.city-list');
	const items = cities.querySelectorAll('li');

	sg.addEventListener('click', () => {
		cities.hidden = !cities.hidden;
		arrow.classList.toggle('rotate');
	});
	cities.addEventListener('click', changeCities);

	if (localStorage.city) {
		city.innerHTML = localStorage.city;
		for (let item of items) {
			item.classList.remove('active');
			if (item.innerHTML == localStorage.city) {
				item.classList.add('active');
			}
		}
	}

	function changeCities(e) {
		const el = e.target;
		localStorage.city = el.innerHTML;
		city.innerHTML = el.innerHTML;
		cities.hidden = true;
		arrow.classList.remove('rotate');

		for (let item of items) {
			item.classList.remove('active');
			if (item == el) el.classList.add('active');
		}
	}

	// show form
	const form = document.querySelector('.form');
	const search = document.getElementById('search');

	search.addEventListener('click', () => {
		form.classList.toggle('show');
	});
})();

//= partials/transform.js
//= partials/asidemenu.js
