let restaurant;var map;window.initMap=()=>{fetchRestaurantFromURL((error,restaurant)=>{if(error){console.error(error)}else{self.map=new google.maps.Map(document.getElementById('map'),{zoom:16,center:restaurant.latlng,scrollwheel:!1});fillBreadcrumb();DBHelper.mapMarkerForRestaurant(self.restaurant,self.map)}})}
fetchRestaurantFromURL=(callback)=>{if(self.restaurant){callback(null,self.restaurant)
return}
const id=getParameterByName('id');if(!id){error='No restaurant id in URL'
callback(error,null)}else{DBHelper.fetchRestaurantById(id,(error,restaurant)=>{self.restaurant=restaurant;if(!restaurant){console.error(error);return}
fillRestaurantHTML();callback(null,restaurant)})}}
fillRestaurantHTML=(restaurant=self.restaurant)=>{if(typeof restaurant.photograph==='undefined'){restaurant.photograph='default'}
const name=document.getElementById('restaurant-name');name.innerHTML=restaurant.name;const address=document.getElementById('restaurant-address');address.innerHTML=restaurant.address;const image=document.getElementById('restaurant-img');image.className='restaurant-img';image.src=DBHelper.imageUrlForRestaurant(restaurant);image.srcset=DBHelper.imageSourceSetUrlForRestaurant(restaurant);image.sizes='(max-width: 500px) 100vw, 50vw';image.alt=`${restaurant.alt}`;const cuisine=document.getElementById('restaurant-cuisine');cuisine.innerHTML=restaurant.cuisine_type;if(restaurant.operating_hours){fillRestaurantHoursHTML()}}
fillRestaurantHoursHTML=(operatingHours=self.restaurant.operating_hours)=>{const hours=document.getElementById('restaurant-hours');for(let key in operatingHours){const row=document.createElement('tr');const day=document.createElement('td');day.innerHTML=key;row.appendChild(day);const time=document.createElement('td');time.innerHTML=operatingHours[key];row.appendChild(time);hours.appendChild(row)}}
fillReviewsHTML=(reviews=self.restaurant.reviews)=>{const container=document.getElementById('reviews-container');const title=document.createElement('h2');title.innerHTML='Reviews';container.appendChild(title);if(!reviews){const noReviews=document.createElement('p');noReviews.innerHTML='No reviews yet!';container.appendChild(noReviews);return}else{const ul=document.getElementById('reviews-list');reviews.forEach(review=>{ul.appendChild(createReviewHTML(review));container.appendChild(ul)})}}
createReviewHTML=(review)=>{const li=document.createElement('li');const name=document.createElement('p');name.id='reviewer-name';name.innerHTML=review.name;li.appendChild(name);const date=document.createElement('p');let r=new Date(review.createdAt);let dateCreated=r.toDateString();date.innerHTML=dateCreated;li.appendChild(date);const rating=document.createElement('p');rating.id='reviewer-rating';if(review.rating=='5'){review.rating='&#9733 &#9733 &#9733 &#9733 &#9733'}
else if(review.rating=='4'){review.rating='&#9733 &#9733 &#9733 &#9733'}
else if(review.rating=='3'){review.rating='&#9733 &#9733 &#9733'}
else if(review.rating=='2'){review.rating='&#9733 &#9733'}
else if(review.rating=='1'){review.rating='&#9733'}
rating.innerHTML=`Rating: ${review.rating}`;li.appendChild(rating);const comments=document.createElement('p');comments.innerHTML=review.comments;li.appendChild(comments);return li}
fillBreadcrumb=(restaurant=self.restaurant)=>{const breadcrumb=document.getElementById('breadcrumb');const li=document.createElement('li');li.innerHTML=restaurant.name;breadcrumb.appendChild(li)}
getParameterByName=(name,url)=>{if(!url)
url=window.location.href;name=name.replace(/[\[\]]/g,'\\$&');const regex=new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),results=regex.exec(url);if(!results)
return null;if(!results[2])
return'';return decodeURIComponent(results[2].replace(/\+/g,' '))}