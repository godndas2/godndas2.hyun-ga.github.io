/*
 * @author godndas2
 * bg.js
 * */

const UNSPLASH_API_KEY =
  "b491e86a6957b396f44f1e15e41d3d242e17aa982607f161b95defd195c7f4dd";
const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&query=landscape&orientation=landscape`;

const body = document.querySelector("body"),
	locationContainer = document.querySelector(".js-location span");

function viewBackground() {
	const savedImg = localStorage.getItem("bg");
	if (savedImg === null) {
		getBackground();
	} else {
	const parsedImage = JSON.parse(savedImg);
	const today = new Date();
	if ( today > parsedImage.expiresOn) {
		getBackground();
	} else {
		body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url(${
	        parsedImage.url})`;
		locationContainer.innerHTML = `${parsedImage.name}, ${
	        parsedImage.city
		      }, ${parsedImage.country}`;
	}
}
	return;
} // viewBackground()

function saveBackground(imgUrl, city, country, name) {
	const savedImg = localStorage.getItem("bg");
	if (savedImg !== null) {
		localStorage.removeItem("bg");
	}
	const expirationDate = new Date();
	expirationDate.setDate(expirationDate.getDate() +1);
	const imgObj = {
			url: imgUrl,
			expiresOn: expirationDate,
			city,
			country,
			name
	};
	localStorage.setItem("bg", JSON.stringify(imgObj));
	viewBackground();
	return;
} // saveBackground()

function getBackground() {
	 fetch(UNSPLASH_URL)
	    .then(response => response.json())
	    .then(json => {
		const img = json;
		if(img.urls && img.urls.full && img.location) {
			const fullurl = img.urls.full;
			const location = img.location;
			const city = location.city;
			const country = location.country;
			const name = location.name;
			saveBackground(fullurl, city, country, name);
		} else {
			getBackground();
		}
	});
	return;
}

function initApp(){
	viewBackground();
	return;
}
initApp();