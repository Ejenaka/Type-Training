const startButton = document.querySelector('.start-button');
const nameInput = document.getElementById('name-input');
const passInput = document.getElementById('pass-input');
const mainTitle = document.querySelector('.main-title');
const singupForm = document.querySelector('.singup');

function setNameField() {
	startButton.style.display = 'none';
	nameInput.style.display = 'block';
	passInput.style.display = 'block';
	singupForm.style.display = 'block';
	document.querySelector('.input-button').style.display = 'block';
}

function playSelectSound() {
	new Audio('/Sounds/select.wav').play();
}

function playGoSound() {
	new Audio('/Sounds/go.wav').play();
}

function playHitSound() {
	new Audio('/Sounds/keyboardHit.mp3').play();
}

function playMissSound() {
	new Audio('/Sounds/missclick.wav').play();
}
