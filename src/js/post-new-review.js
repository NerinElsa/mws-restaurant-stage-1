const postReviewButton=document.getElementById('submit-button');postReviewButton.addEventListener('click',postReview);function addNewReviewToIDB(newReview){debugger;dbPromise=DBHelper.openIDB();return dbPromise.then(function(db){if(!db)return;let tx=db.transaction('reviewOS','readwrite');let transactionObjectStore=tx.objectStore('reviewOS');newReview.forEach(arrayItem=>transactionObjectStore.put(arrayItem))}).catch(()=>{throw Error('Reviews were not added to the store')})};function retrieveOfflineReviews(){dbPromise=DBHelper.openIDB();return dbPromise.then((db)=>{if(!db)return;let tx=db.transaction('offlineReviewOS','readwrite');let transactionObjectStore=tx.objectStore('offlineReviewOS');return offlineReviewOS.getAll()}).catch(()=>{throw Error('Offline review is not added to the Offline Review Object Store')})};function postReview(e){e.preventDefault();alert('New Review Added!');const newReview=[{restaurant_id:window.location.search.slice(4),name:document.getElementById('user-name').value,comments:document.getElementById('comments-textarea').value,rating:document.getElementById('rating').value}];createReviewHTML(newReview);addNewReviewToIDB(newReview);if(!navigator.onLine){}
const reviewsUrl=`http://localhost:1337/reviews/`
const headers=new Headers({'Content-Type':'application/json'});const body=JSON.stringify(newReview);location.href=location.href;return fetch(reviewsUrl,{method:'POST',headers:headers,body:body})}