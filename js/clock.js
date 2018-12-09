/*
 * @author godndas2
 * clock.js
 * */

const clock = document.querySelector(".js-clock .clock__text"); //시간 보여주는 class

function getTime(){
	const now = new Date();
	const hours = now.getHours();
	const minute = now.getMinutes();
	const time = `${hours < 10 ? `0${hours}` : hours}:${ minute < 10 ? `0${minute}` : minute }`;
	
	clock.innerHTML = time;
	return;
}

function init() {
	getTime();
	setInterval(getTime, 1000);
	return;
}

init();