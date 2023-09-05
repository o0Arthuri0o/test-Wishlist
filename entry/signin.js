import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js'
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js'



let btn = document.querySelector('button');
btn.addEventListener('click', signIn)


function signIn() {

	let emailEl = document.querySelector('#email');
	let passwordEl = document.querySelector('#password');

	let email = emailEl.value;
	let password = passwordEl.value;
	
	
	signInWithEmailAndPassword(auth, email, password)
	.then((res) => {
		if (res.user) {
			success(email)
		}
	})
	.catch((err) => {
		if(err.message == 'Firebase: Error (auth/wrong-password).' || err.message == 'Firebase: Error (auth/user-not-found).') error()
		else alert(err.message)
	})

		
	
	
	clearInputs(emailEl, passwordEl)
}


const firebaseConfig = {
    apiKey: "AIzaSyDd9JPkD2TUujZpAhRhBpl_WKE8vyuisB0" ,
    authDomain: "wishlist3-1022a.firebaseapp.com" ,
    projectId: "wishlist3-1022a",
    storageBucket: "wishlist3-1022a.appspot.com",
    messagingSenderId: "1029189037258",
    appId: "1:1029189037258:web:01ac6788cf05c310449833"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function clearInputs(email, password) {
	email.value = '';
	password.value = '';
}

function success(id) {
	const popup = document.querySelector('#popup');
	popup.textContent = 'Успешно!';
	popup.classList.add('success')
	setTimeout(()=>{
		popup.textContent = '';
		popup.classList.remove('success')
		goToPersonalPage(id)
	}, 1500)
}
function error() {
	const popup = document.querySelector('#popup');
	popup.textContent = 'Неверный логин или пароль';
	popup.classList.add('error')
	setTimeout(()=>{
		popup.textContent = '';
		popup.classList.remove('error')
	}, 1000)

}

function goToPersonalPage(id) {
	window.location.href = `/test-Wishlist/person/person.html?id=${id}`
}


