let restaurants,
  neighborhoods,
  cuisines
var map
var markers = []

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  fetchNeighborhoods();
  fetchCuisines();
});

/**
 * Fetch all neighborhoods and set their HTML.
 */
fetchNeighborhoods = () => {
  DBHelper.fetchNeighborhoods((error, neighborhoods) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.neighborhoods = neighborhoods;
      fillNeighborhoodsHTML();
    }
  });
}

/**
 * Set neighborhoods HTML.
 */
fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
  const select = document.getElementById('neighborhoods-select');
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    option.setAttribute('role', 'option');
    option.setAttribute("aria-label", neighborhood);
    select.append(option);
  });
}

/**
 * Fetch all cuisines and set their HTML.
 */
fetchCuisines = () => {
  DBHelper.fetchCuisines((error, cuisines) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.cuisines = cuisines;
      fillCuisinesHTML();
    }
  });
}

/**
 * Set cuisines HTML.
 */
fillCuisinesHTML = (cuisines = self.cuisines) => {
  const select = document.getElementById('cuisines-select');
  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    option.setAttribute('role', 'option');
    option.setAttribute("aria-label", cuisine);
    select.append(option);
  });
}

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
  let loc = {
    lat: 40.722216,
    lng: -73.987501
  };
    
  self.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: loc,
    scrollwheel: false
  });
  document.getElementById('map').style.display = 'none'; //initially hides the map
  updateRestaurants();
}

/**
 * Toggle button for map
 */
const toggle_map = () => {    
  
    if (document.getElementById('map').style.display === 'none')      
      document.getElementById('map').style.display = 'block' //displays the map   
    else      
    document.getElementById('map').style.display = 'none'   //hides the map
    }


/**
 * Update page and map for current restaurants.
 */
updateRestaurants = () => {
  const cSelect = document.getElementById('cuisines-select');
  const nSelect = document.getElementById('neighborhoods-select');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const cuisine = cSelect[cIndex].value;
  const neighborhood = nSelect[nIndex].value;

  DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      resetRestaurants(restaurants);
      fillRestaurantsHTML();
    }
  })
}

/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
resetRestaurants = (restaurants) => {
  // Remove all restaurants
  self.restaurants = [];
  const ul = document.getElementById('restaurants-list');
  ul.innerHTML = '';

  // Remove all map markers
  self.markers.forEach(m => m.setMap(null));
  self.markers = [];
  self.restaurants = restaurants;
}

/**
 * Create all restaurants HTML and add them to the webpage.
 */

fillRestaurantsHTML = (restaurants = self.restaurants) => {
  
  const ul = document.getElementById('restaurants-list');
  restaurants.forEach(restaurant => {
    ul.append(createRestaurantHTML(restaurant));
  });
  addMarkersToMap();
}

/**
 * Create restaurant HTML.
 */

createRestaurantHTML = (restaurant) => {
  // DEaling with undefined photos
  if(typeof  restaurant.photograph=== 'undefined'){
    restaurant.photograph = 'default'
  } 

 // alert(`Resturant is favorite, ${restaurant.is_favorite}`);   //Gives the value of is_favorite as an alert

  const li = document.createElement('li');
  const image = document.createElement('img');

  /*********Lazy Load Placeholder**************/
  const placeHolder = document.createElement('a');
  placeHolder.href = (`/img/${restaurant.id}.jpg`);
  //imageInitialLoadUrlForRestaurant(restaurant)
  placeHolder.dataset.srcset = DBHelper.imageSourceSetUrlForRestaurant(restaurant);
  placeHolder.className = 'progressive replace';
  placeHolder.tabIndex = '-1';
  /********* End lazy load place holder********/
  
  const alternativeText = ['Gotcha!',
                           'Mission Chinese Food',
                           'Emily',
                           'Kang Ho Dong Baekjeong',
                           'Katz\'s Delicatessen',
                           'Roberta\'s pizza',
                           'Hometown BBQ',
                           'Superiority Burger',
                           'The Dutch',
                           'Mu Ramen',
                           'Casa Enrique'];
  //image.className = 'lazy';
  //image.src = DBHelper.imageUrlForRestaurant(restaurant);
  //image.src = DBHelper.imageSourceSetUrlForRestaurant(restaurant);
  //image.srcset = DBHelper.imageSourceSetUrlForRestaurant(restaurant);
  //image.sizes = '(max-width: 500px) 500px, (max-width: 640px) 260px, (max-width: 1024px) 320px, (min-width: 1025px) 210px';
  //image.src = ('/img/spinner.gif'); //'spinner.gif' for initial page load
  image.alt = alternativeText[restaurant.id];
  image.className = 'preview image';
  li.append(placeHolder);
  placeHolder.append(image);

  //Creating 'data-src' attrbute
  //const src = image.getAttribute('src');
  //const srcset = image.getAttribute('srcset');
 // const datasrc = document.createAttribute('data-src');
  //datasrc.value = srcset;
  //image.setAttributeNode(datasrc);
  //image.removeAttribute('srcset');
 // console.log('Here is new image tag', srcset);
  
  //li.append(image);

  const name = document.createElement('h1');
  name.innerHTML = restaurant.name;
  li.append(name);

  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = restaurant.neighborhood;
  li.append(neighborhood);

  const favoritebutton = document.createElement('button');
  favoritebutton.innerHTML = '&#9829;';   //add ASCII code for heart shape, grey heart and red heart!!
  favoritebutton.id = 'favorite-button';
  favoritebutton.value = restaurant.is_favorite;
  //favoritebutton.setAttribute('rest-id', restaurant.id); 
  //favoritebutton.href = DBHelper.urlForRestaurant(restaurant);
  favoritebutton.className = 'unfavorite-button-class';
  favoritebutton.setAttribute('role', 'button'); 
    /*********************** Checking value of is_favorite and setting color of favorite button *****************/
    if (restaurant.is_favorite === false || restaurant.is_favorite === 'false'){
      favoritebutton.setAttribute('aria-label', 'Add as Favorite');
    }
    else{
      favoritebutton.className = 'favorite-button-class';
      favoritebutton.setAttribute('aria-label', 'Remove as Favorite');
    }
  favoritebutton.onclick = function(){ 
  /*******************onclick function which calls fetch request to PUT value of 'is_favorite' into IDB **********/
  if(navigator.onLine) {
    if (favoritebutton.value === false || favoritebutton.value === 'false'){

      favoritebutton.value = 'true'; //changes the favorite button value to 'true' string
      favoritebutton.className = 'favorite-button-class'; //changes classname 
      favoritebutton.setAttribute('aria-label', 'Remove as Favorite'); //changes ARIA label
      setAsFavorite (); //local function below which will PUT the value of 'is_favorite' as true into API
    }
    else if (favoritebutton.value === true || favoritebutton.value === 'true') { 
      
      favoritebutton.value = 'false'; //changes the favorite button value to 'false' string
      favoritebutton.className = 'unfavorite-button-class';
      favoritebutton.setAttribute('aria-label', 'Add as Favorite');
      setAsUnfavorite(); //local function below which will PUT the value of 'is_favorite' as false into API
    }
   } //End if (navigator.online)
   else { //if offline
    if(favoritebutton.value === 'false' || favoritebutton.value === false) {
      //debugger;
      //alert('OFFLINE - Favorite button');
      favoritebutton.value = 'true'; //changes the favorite button value to 'true' string
      favoritebutton.className = 'favorite-button-class'; //changes classname 
      favoritebutton.setAttribute('aria-label', 'Remove as Favorite'); //changes ARIA label
      
            /********* Adding the value of is_favorite into IDB****/
            dbPromise = DBHelper.openIDB(); //Opens IDB   
            dbPromise.then(function(db) { //Adds 'true' as value of 'is_favorite' into IDB
                if(!db) return;
                //Opens a new transaction tx on object store called restaurantsObjStr
                let tx = db.transaction('restaurantOS', 'readwrite');
                let ObjectStoreTransaction = tx.objectStore('restaurantOS');
                ObjectStoreTransaction.get(restaurant.id)
                .then(restaurant=>{
                  restaurant.is_favorite = true;
                  //restaurant.is_favorite = !restaurant.is_favorite;
                  //alert(`is_favorite changed to ${restaurant.is_favorite}`);
                  ObjectStoreTransaction.put(restaurant);
                }); //End ObjectStoreTransaction
              }) //End function(db)
      } //End of if condition
      
      else if(favoritebutton.value === 'true' || favoritebutton.value === true) {
        //debugger;
        //alert('OFFLINE - Favorite button');
        favoritebutton.value = 'false'; //changes the favorite button value to 'false' string
        favoritebutton.className = 'unfavorite-button-class';
        favoritebutton.setAttribute('aria-label', 'Add as Favorite');
        
              /********* Adding the value of is_favorite into IDB****/
              dbPromise = DBHelper.openIDB(); //Opens IDB   
              dbPromise.then(function(db) { //Adds 'true' as value of 'is_favorite' into IDB
                  if(!db) return;
                  //Opens a new transaction tx on object store called restaurantsObjStr
                  let tx = db.transaction('restaurantOS', 'readwrite');
                  let ObjectStoreTransaction = tx.objectStore('restaurantOS');
                  ObjectStoreTransaction.get(restaurant.id)
                  .then(restaurant=>{
                    restaurant.is_favorite = false;
                    //restaurant.is_favorite = !restaurant.is_favorite;
                    //alert(`is_favorite changed to ${restaurant.is_favorite}`);
                    ObjectStoreTransaction.put(restaurant);
                  }); //End ObjectStoreTransaction
                }) //End function(db)
        } //End of else if condition
    } //End if offline
  };//End favoritebutton.onclick = function()

  /************************************* Put 'is_favorite' true **************************************************/
  function setAsFavorite (){
    debugger;
    let favorite = true;
   fetch (`http://localhost:1337/restaurants/${restaurant.id}/?is_favorite=${favorite}`, {method:'PUT'})
   .then(function(response) {
     if(response.ok){
       //alert ('fetch PUT requesest OK');
       /********* Adding the value of is_favorite into IDB****/
      dbPromise = DBHelper.openIDB(); //Opens IDB   
      dbPromise.then(function(db) { //Adds 'true' as value of 'is_favorite' into IDB
          if(!db) return;
          //Opens a new transaction tx on object store called restaurantsObjStr
          let tx = db.transaction('restaurantOS', 'readwrite');
          let ObjectStoreTransaction = tx.objectStore('restaurantOS');
          ObjectStoreTransaction.get(restaurant.id)
          .then(restaurant=>{
            restaurant.is_favorite = true;
            //alert(`is_favorite changed to ${restaurant.is_favorite}`);
            ObjectStoreTransaction.put(restaurant);
          }); //End ObjectStoreTransaction
        }) // End function(db)
      //return response.json();
     }else if (!response.ok){
       return Promise.reject('Please double check the fetch request URL!');
      }
     }).then (function() { //PUTs is_favorite=true into API
     
       //alert(restaurant.is_favorite);
       //location.href=location.href; //Reloads page which will update the changed value of is_favorite in IDB
       
       }).catch(err1 => { //End of second .then 
         console.log('Request failed', err1);
         });
  }

 /************************************* Put 'is_favorite' false **************************************************/
 function setAsUnfavorite (){
   //debugger;
   let unfavorite = false;
   fetch (`http://localhost:1337/restaurants/${restaurant.id}/?is_favorite=${unfavorite}`, {method:'PUT'})
   .then(function(response) {
     if(response.ok){
      //alert ('fetch PUT requesest OK');
      /********* Adding the value of is_favorite into IDB****/
      dbPromise = DBHelper.openIDB(); //Opens IDB   
      dbPromise.then(function(db) { //Adds 'true' as value of 'is_favorite' into IDB
          if(!db) return;
          //Opens a new transaction tx on object store called restaurantsObjStr
          let tx = db.transaction('restaurantOS', 'readwrite');
          let ObjectStoreTransaction = tx.objectStore('restaurantOS');
          ObjectStoreTransaction.get(restaurant.id)
          .then(restaurant=>{
            restaurant.is_favorite = false;
            //alert(`is_favorite changed to ${restaurant.is_favorite}`);
            ObjectStoreTransaction.put(restaurant);
          }); //End ObjectStoreTransaction
        }) // End function(db)

      // return response.json();
     }else if (!response.ok){
       return Promise.reject('Please double check the fetch request URL!');
      }
     }).then (function() { //PUTs is_favorite=false into API ?????
      
   }).catch(err1 => { //End of second .then 
         console.log('Request failed', err1);
     });
  }

  li.append(favoritebutton);  //Appends favorite button to list

  const address = document.createElement('p');
  address.innerHTML = restaurant.address;
  li.append(address);

  
  const more = document.createElement('a');
  more.innerHTML = 'View Details';
  more.href = DBHelper.urlForRestaurant(restaurant);
  more.id = 'detailsbutton';
  more.className = 'viewdetails-button';
  more.setAttribute('aria-label', 'More about this restaurant');
  more.setAttribute('role', 'link');
  li.append(more);

  return li
} //End of restaurant list


function initialiseImages() {
  var images = document.currentScript.parentNode.getElementsByTagName('img');
  //debugger;
  for (var i = 0; i < images.length; i++) {
                  var src = images[i].getAttribute('src');
                  var datasrc = document.createAttribute('data-src');
                  datasrc.value = src;
                  images[i].setAttributeNode(datasrc);
                  images[i].removeAttribute('src');
                  console.log('Here is new image tag',images[i]);           
  }
  console.log('Here are images',images);  
}


/**
 * Add markers for current restaurants to the map.
 */
addMarkersToMap = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    // Add marker to the map
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.map);
    google.maps.event.addListener(marker, 'click', () => {
      window.location.href = marker.url
    });
    self.markers.push(marker);
  });
}
