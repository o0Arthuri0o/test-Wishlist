let getLitnk = document.querySelector('#getLink');
getLink.addEventListener('click', copy)

function copy() {
	let currentLink = location.href;
	let currentPath = location.pathname
	console.log(currentLink)
	let path = `/test-Wishlist/wishlist/wishlist.html`;
	let newLink = currentLink.replace(currentPath, path);
	console.log(newLink)
	navigator.clipboard.writeText(newLink)
	// btn.textContent = newLink
}


import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js'
import { getFirestore, collection, addDoc ,getDocs, setDoc, doc, onSnapshot, deleteDoc} from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js'

const firebaseConfig = {
    apiKey: "AIzaSyDd9JPkD2TUujZpAhRhBpl_WKE8vyuisB0" ,
    authDomain: "wishlist3-1022a.firebaseapp.com" ,
    projectId: "wishlist3-1022a",
    storageBucket: "wishlist3-1022a.appspot.com",
    messagingSenderId: "1029189037258",
    appId: "1:1029189037258:web:01ac6788cf05c310449833"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


let url = new URL(window.location.href);
let userId = url.searchParams.get('id');

let inputForm = document.querySelector('#addGiftCard');

let btnAddGift = document.querySelector('#addGift');
btnAddGift.addEventListener('click', addGift);

function addGift() {
	inputForm.dataset.status = "open";
	
	let btnNewGift = document.querySelector('#plusGift');
	btnNewGift.addEventListener('click', pushInfoNewGift)

	let btnCancel =document.querySelector('#cancelPlusGift');
	btnCancel.addEventListener('click', cancelAddGift);

}

function pushInfoNewGift() {

	let wrapper = document.querySelector('.giftsss-wrapper')
	wrapper.innerHTML = '';

	let inputLink = document.querySelector('#inputLink');
	let inputName = document.querySelector('#inputName');
	let inputPrice = document.querySelector('#inputPrice');
	let commentGift = document.querySelector('#commentGift');

	if (inputLink.value !== '' && inputName.value !== '' && inputPrice.value !== '') {

		let giftName = inputName.value;
		let price = inputPrice.value;
		let comment = commentGift.value;
		let link = inputLink.value;
		let taken = false;
		let friendName = '';

		createGiftCardInfo(userId, giftName, price, comment, link, taken, friendName);
		// console.log(inputLink.value, inputName.value, inputPrice.value, commentGift.value);
		clearInputs();
		inputForm.dataset.status = "close";
	} else {
		alert('Заполните три первых поля');
	}
	
}

function clearInputs() {
	inputLink.value = ''; 
	inputName.value = '';
	inputPrice.value = '';
	commentGift.value = '';
}
function cancelAddGift() {
	let inputLink = document.querySelector('#inputLink');
	let inputName = document.querySelector('#inputName');
	let inputPrice = document.querySelector('#inputPrice');
	let commentGift = document.querySelector('#commentGift');

	inputLink.value = ''; 
	inputName.value = '';
	inputPrice.value = '';
	commentGift.value = '';

	inputForm.dataset.status = "close";
}

async function createGiftCardInfo(id, giftName, price, comment, link, taken, friendName) {
	await setDoc(doc(db, id, giftName), {giftName, price, comment, link, taken, friendName})
	// console.log(giftName, price, comment, link)
}





// let trashIcos = document.querySelectorAll('#trash')
// console.log(trashIcos)
// trashIcos.forEach((el) => el.addEventListener('click', ()=> {
// 	let parentId = el.dataset.parent;
// 	let parent = document.querySelector(`#${parentId}`);
// 	console.log(parentId, parent)
// 	deleteDoc(doc(db, userId, parentId));
// 	parent.remove()
// }))


function getGiftCardsInfo(userId) {
	// getDocs(collection(db, userId))
	// .then((data) => {
	// 	// console.log(data)
	// 	data.docs.map((item) => {
	// 		if (item.id !== 'info') {
	// 			let giftInfo = {...item.data()}
	// 			renderCard(giftInfo);
	// 			// console.log(giftInfo);
	// 		}
	// 	})
	// })


	
	onSnapshot(collection(db, userId), (data) => {
		let wrapper = document.querySelector('.giftsss-wrapper')
		wrapper.innerHTML = '';
		data.docs.map((item) => {
			
			
			if (item.id !== 'info') {
				
				let giftInfo = {...item.data()}

				renderCard(giftInfo);
				
			}
		})

		let trashIcos = document.querySelectorAll('#trash')
		// console.log(trashIcos)
		trashIcos.forEach((el) => el.addEventListener('click', ()=> {
			let parentId = el.dataset.parent;
			let parent = document.querySelector(`#${parentId}`);
			// console.log(parentId, parent)
			deleteDoc(doc(db, userId, parentId));
			parent.remove()
			let wrapper = document.querySelector('.giftsss-wrapper')
			wrapper.innerHTML = '';

		}))
	})


}
getGiftCardsInfo(userId)

function renderCard(obj) {

	
	

	let giftName = obj.giftName;
	let link = obj.link;
	let price = obj.price;
	let comment = obj.comment;
	let taken = obj.taken;
	let friendName = obj.friendName;

	let wrapper = document.querySelector('.giftsss-wrapper')

	if (taken) {
		wrapper.insertAdjacentHTML('beforeend', 
			`<div class="gift-wrapper" id = "${giftName}">
				<div class="gift">
					<div class="status">Бронь:${friendName}</div>
					<div class="top">
						<div class="image-wrapper"><img src="gift-svgrepo-com.svg" alt=""></div>
						<div class="text-top">
							<p class="nameGift">${giftName}</p>
							<p class="price">${price}&#8381</p>
						</div>
					</div>
					<div class="bottom">
						<div class="text-bottom">
							<p class="comment">${comment}</p>
							<a href="${link}">В магазин</a>
						</div>
						<img data-parent = "${giftName}" id = "trash" src="trash-svgrepo-com.svg" alt="">
					</div>
				</div>
			</div>`		
		)
	} else {
		wrapper.insertAdjacentHTML('beforeend', 
			`<div class="gift-wrapper" id = "${giftName}">
				<div class="gift">
					<div class="top">
						<div class="image-wrapper"><img src="gift-svgrepo-com.svg" alt=""></div>
						<div class="text-top">
							<p class="nameGift">${giftName}</p>
							<p class="price">${price}&#8381</p>
						</div>
					</div>
					<div class="bottom">
						<div class="text-bottom">
							<p class="comment">${comment}</p>
							<a href="${link}">В магазин</a>
						</div>
						<img data-parent="${giftName}" id = "trash" src="trash-svgrepo-com.svg" alt="">
					</div>
				</div>
			</div>`		
		)

	}

	
}
