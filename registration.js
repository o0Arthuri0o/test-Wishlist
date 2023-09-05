
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js'
import { getFirestore, collection, addDoc ,getDocs, setDoc, doc } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js'

let btn = document.querySelector('button');
btn.addEventListener('click', registration)



function registration() {
	let nameEl = document.querySelector('#name');
	let emailEl = document.querySelector('#email');
	let passwordEl = document.querySelector('#password');
	let bdEl = document.querySelector('#bd');

	let name = nameEl.value;
	let email = emailEl.value;
	let password = passwordEl.value;
	let bd = bdEl.value


	createUserWithEmailAndPassword(auth, email, password)
	.then((res) => {
		if (res.user) {
			createPersinInfo(name, email, password, bd);
			success(email)
		}
	})
	.catch((err) => {
		if(err.message == 'Firebase: Error (auth/email-already-in-use).') error()
		else alert(err.message)
	})

	clearInputs(emailEl, passwordEl, nameEl, bdEl)
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
const db = getFirestore(app);

function clearInputs(email, password, name, bd) {
	email.value = '';
	password.value = '';
	name.value = '';
	bd.value = '';
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
	popup.textContent = 'Такой аккаунт уже есть!';
	popup.classList.add('error')
	setTimeout(()=>{
		popup.textContent = '';
		popup.classList.remove('error')
	}, 1000)

}

function goToPersonalPage(id) {
	window.location.href = `/test-Wishlist/person/person.html?id=${id}`
}

async function createPersinInfo(name, email, password, bd) {
	await setDoc(doc(db, email, 'info'), {name, email, password, bd})
}


