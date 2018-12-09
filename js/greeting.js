/*
 * @author godndas2
 * greeting.js
 * */

const nameContainer = document.querySelector(".js-name");

function welcomeName(name) {
	nameContainer.innerHTML = "";
	const title = document.createElement("span");
	title.className = "name__text";
	title.innerHTML = `Hello ${name}`;
	nameContainer.appendChild(title);
} // 메인 화면에 나타나는 Hello (이름)

function handleSubmit(event) {
	event.preventDefault();
	const form = event.target;
	const input = form.querySelector("input");
	const value = input.value;
	localStorage.setItem("username", value);
	welcomeName(name);
}

function nameInput() {
	const input = document.createElement("input");
	input.placeholder = "Type Your name here";
	input.type = "text";
	input.className = "name__input";
	const form = document.createElement("form");
	form.addEventListener("submit", handleSubmit);
	form.appendChild(input);
	nameContainer.appendChild(form);
}

function loadName() {
	  const name = localStorage.getItem("username");
	  if (name === null) {
		  nameInput();
	  } else {
		  welcomeName(name);
	  }
	}

function init() {
	  loadName();
	}
init();