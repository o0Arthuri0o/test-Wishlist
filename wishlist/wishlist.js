let url = new URL(window.location.href);
let userId = url.searchParams.get('id');



import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js'
import { getFirestore, collection, addDoc ,getDocs, setDoc, doc, onSnapshot, deleteDoc, updateDoc} from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js'

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


onSnapshot(collection(db, userId), (data) => {


	let wrapper = document.querySelector('.giftsss-wrapper')
	wrapper.innerHTML = '';
	data.docs.map((item) => {
		
		
		if (item.id !== 'info') {
			
			let giftInfo = {...item.data()}
			// console.log(giftInfo)
			renderCard(giftInfo);	

		}else if(item.id == 'info'){
			let giftInfo = {...item.data()}
			renderNameAndDate(giftInfo);
		}
		
	})
	reserve()


})


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
			`<div class="gift-wrapper" id="${giftName}" >
				<div class="gift">
					<div class="top">
						<div class="image-wrapper"><img src="gift-svgrepo-com.svg" alt=""></div>
						<div class="text-top">
							<p class="nameGift">${giftName}</p>
							<p class="price">${price}&#8381</p>
						</div>
					</div>
					<p class="comment">${comment}</p>

					<div class="bottom">
						<button  id="reservButton" data-status="close" data-parentId="${giftName}">Забронировано</button>
						<div class="text-bottom">
							<a href="${link}">В магазин</a>
						</div>
					</div>
				</div>
			</div>`
		)
	} else {
		wrapper.insertAdjacentHTML('beforeend', 
			`<div class="gift-wrapper" id="${giftName}" >
				<div class="gift">
					<div class="top">
						<div class="image-wrapper"><img src="gift-svgrepo-com.svg" alt=""></div>
						<div class="text-top">
							<p class="nameGift">${giftName}</p>
							<p class="price">${price}&#8381</p>
						</div>
					</div>
					<p class="comment">${comment}</p>

					<div class="bottom">
						<button id="reservButton" data-status="open" data-parentId="${giftName}">Забронировать</button>
						<div class="text-bottom">
							<a href="${link}">В магазин</a>
						</div>
					</div>
				</div>
			</div>`
		)

	}

	
}


async function updateReserveInfo(friend, parentId) {
	let ref = doc(db, userId, parentId)
	 await updateDoc(ref, {
 		taken: true,
		friendName: friend
	})
}
async function updateAbortInfo(parentId) {
	let ref = doc(db, userId, parentId)
	 await updateDoc(ref, {
 		taken: false,
		friendName: ""
	})
}

// function onBtnOpen( btn ,parentId) {
// 	btn.addEventListener('click', () => {
// 		let nameInput = document.querySelector('.reserveWraper');
// 		nameInput.dataset.status = 'open';
// 		namePush(parentId);

// 	})
// }
//
function reserve() {
	let list = document.querySelectorAll('#reservButton');
	list.forEach((btn) => {
		// let parentId = btn.dataset.parentid
		// console.log(parentId)
		
		btn.onclick = namePush
		
	})
}

function namePush() {
	let parentId = this.dataset.parentid;

	if(this.dataset.status == 'open') {
		let nameInput = document.querySelector('.reserveWraper');
		nameInput.dataset.status = 'open';
		let inputEl = document.querySelector('#nameReserve');
		// let friend = inputEl.value;
		
		let reservBtn = document.querySelector('#reserveGiftBtn');
		reservBtn.dataset.parentid = parentId;
		reservBtn.onclick = function () {
			
			let inputEl = document.querySelector('#nameReserve');
			let friend = inputEl.value;
			// console.log(this.dataset.parentid, friend)
			updateReserveInfo(friend, this.dataset.parentid);

			inputEl.value = '';
			nameInput.dataset.status = 'close';
		}


		let backBtn = document.querySelector('#backInputName');
		backBtn.addEventListener('click', (e) => {
			inputEl.value = '';
			let nameInput = document.querySelector('.reserveWraper');
			nameInput.dataset.status = 'close';
		})
	} else if (this.dataset.status == 'close') {
		let abortEl = document.querySelector('.abortWrapper')
		abortEl.dataset.status = 'open';

		let abortbtn = document.querySelector('#abortGiftBtn');
		abortbtn.dataset.parentid = parentId;
		abortbtn.onclick = function() {
			updateAbortInfo(this.dataset.parentid);

			let abortEl = document.querySelector('.abortWrapper')
			abortEl.dataset.status = 'close';
		}

		let backAbortBtn = document.querySelector('#backAbort');
		backAbortBtn.onclick = function () {
			let abortEl = document.querySelector('.abortWrapper')
			abortEl.dataset.status = 'close';
		}
	}

}

// function goGOGO() 

function renderNameAndDate(obj) {
	let name = obj.name;
	let date = obj.bd
	date = date.split('-');

	date.shift();
	let [month, day] = date
	month[0] == '0' ? month = Number(month[1]) : month = Number(month)
	day[0] == '0' ? day = Number(day[1]) : day = Number(day);

	let nameEl = document.querySelector('#name');
	nameEl.textContent = name;
	let dateEl = document.querySelector('#date');

	let nowDay = Number(new Date().getDate());

	let nowMonth = Number(new Date().getMonth()) + 1;
	let checker = 0;
	month == nowMonth ? day > nowDay ? day = day - nowDay : day = 0 : checker = -1;
	if(checker > -1) dateEl.textContent = `Дней до праздника: ${day}`;
	else if (checker == -1) dateEl.textContent = `Праздник назначен на ${day} день ${month} месяца`
}