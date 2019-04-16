
/**
 * Common database helper functions.
 */

let dbPromise; //variable for IDB

class DBHelper {
  
  /**
    * DATABASE_URL - This points to restaurants.json file location on your local server for stage 1 project
     
  static get DATABASE_URL() {
     const port = 8000 // Server port number
     return `http://localhost:${port}/data/restaurants.json`;
   }
   */

  /**
    * DATABASE_URL_2 - local server port settings for restaurant stage 2 project (***NOT USING****)
    */ 
  static get DATABASE_URL_2() {
     const port = 1337 // Server port number
     return `http://localhost:1337/restaurants`;
   }
   
   /**
    * ALL_REVIEW_URL - local server port settings for restaurant stage 3 project
    */
   static get ALL_REVIEW_URL() {
     const port = 1337 //Server port number
     return `http://localhost:1337/reviews`;
   }
//********************************* ZEIT Publishing ************************************************ */
   /**
    * DATABASE_URL_NEW - server settings for restaurant project publishing
    */ 
  static get NEW_DATABASE_URL() {
   // const port = 1337 // Server port number
    return `https://api.myjson.com/bins/uuwbe`;
    //return `https://api.myjson.com/bins/uuwbe?restaurants`;
  }
  
//************************************************************************************************ */
    /**
    * EACH_RESTAURANT_REVIEWS_URL - local server port settings for restaurant stage 3 project
    */
    static get INDIVIDUAL_REVIEWS_URL() {
      const ID = restaurant.id //Server port number
      console.log('This is port', port);
      return `http://localhost:1337/reviews/?restaurant_id=${ID}`;
      
    }


    
    /**
     *Opening  IDB 
     */
    static openIDB (){ //Opens a new indexed database called restaurantDB
      'use strict';
    
      //Checks browser support for IDB
      if (!('indexedDB' in window)) {
        console.log('This browser doesn\'t support IndexedDB');
        return;
      }else{
        console.log('This browser supports IDB');
        }//End browser support for IDB

      //Checks for service worker.Wont create an IDB if there is no service worker present
      if (!navigator.serviceWorker){
        console.log('There is no Service Worker available!');
        return Promise.resolve();
      }else{
        console.log('There is a Service Worker available! HALLO')
        }//End service worker check
      
      //Creates a new IDB
      return idb.open('restaurantDB', 2, function(upgradeDb) {
        console.log('making a new object store');
          if (!upgradeDb.objectStoreNames.contains('restaurantOS')) {
              let store = upgradeDb.createObjectStore('restaurantOS',{keyPath: 'id', autoIncrement: true}); 
              store.createIndex('byID', 'id');
          }//End if statement for 'restaurantOS'
          if (!upgradeDb.objectStoreNames.contains('reviewOS')) {
              let store = upgradeDb.createObjectStore('reviewOS', {keyPath: 'id', autoIncrement: true});
              store.createIndex('byRestaurant-id', 'restaurant_id');
          }//End if statement for 'reviewOS'
          if (!upgradeDb.objectStoreNames.contains('offlineReviewOS')) {
            let store = upgradeDb.createObjectStore('offlineReviewOS', {keyPath: 'id', autoIncrement: true});
            store.createIndex('byID', 'id');
        }//End if statement for 'reviewOS'
      });//End idb.open
    }//End static openIDB () 


  /**
  * Retrieve cached restaurants
  */
  static retrieveCachedRestaurants () { //retrieves restaurants from IDB
    dbPromise = DBHelper.openIDB(); //calls openIDB
    return dbPromise.then(function(db){
      if (!db) return;
          let tx = db.transaction('restaurantOS', 'readonly');
          let ObjectStoreTransaction = tx.objectStore('restaurantOS');
          return ObjectStoreTransaction.getAll();
      });
      console.log('RETRIEVED CACHED RESTAURANTS');
  }//End retrieveCachedRestaurants ()


  /**
   * FETCH ALL REVIEWS   
   */ 
  static fetchAlllReviews(callback) {
    //debugger;
        fetch(DBHelper.ALL_REVIEW_URL , {credentials:'same-origin'})
        .then(function(response) {
          if(response.ok) {//Checks if a successful response received from server. ie. response.status = 200
            //console.log('Looks like the response is here', response);
            return response.json();
          } else if(!response.ok){//if the fetch url is wrong this error message displays in '.catch'
              return Promise.reject('Please double check the fetch request URL!'); //If the response was not `ok` a custom reject message is sent.
            }
        }).then(function fetchReviewData(reviews) { //Fetches review data from json object
              //console.log('Here are all reviews JSON object array', reviews);
              dbPromise = DBHelper.openIDB(); //calls openIDB function
              //console.log('A new IDB is created from fetch reviews function!')
              
              dbPromise.then(function(db) {//Adds the 'reviews into IDB
                //debugger;
                if(!db) return;
                //Opens a new transaction tx on object store called restaurantsObjStr
                let tx = db.transaction('reviewOS', 'readwrite');
                let ObjectStoreTransaction = tx.objectStore('reviewOS');
                reviews.forEach(function(review) {//Puts each restaurant into IDB
                    ObjectStoreTransaction.put(review); 
                });
                //console.log('Added all reviews to IDB!');
              })//End of add reviews to IDB 
              //return tx.complete.then(()=>Promise.resolve(reviews));   //Completes the transacion and the promise resolves with a result 'restaurants' 
            })//End of function fetchReviewData(reviews)
            .catch(err => {
              return callback(err , null)
            });//End catch error
  }

  /*
   *Fetch reviews by restaurant id - GET CORRECTION !!!!!!!!!!!!!! 
  */
  
  static fetchReviewsById(restaurant_id) { 
    //debugger;
    /********** When ONLINE reviews for individual restaurants are fetched from server *****************/
    fetch(`http://localhost:1337/reviews/?restaurant_id=${restaurant_id}` , {credentials:'same-origin'})
        .then(function(response) {
        if(response.ok) {//Checks if a successful response received from server. ie. response.status = 200
          //console.log('Response from fetchReviewsById', response);
          return response.json();
        } else if(!response.ok){//if the fetch url is wrong this error message displays in '.catch'
            return Promise.reject('Please double check the fetch request URL!'); //If the response was not `ok` a custom reject message is sent.
          }
      }).then(function fetchIndividualReviewData(reviews) { //Fetches review data from json object
              //console.log('Reviews for this restaurant', reviews);
              //debugger;
              /********* Adding the reviews of current restaurant into IDB for offline usage****/
              dbPromise = DBHelper.openIDB(); //Opens IDB   
              dbPromise.then(function(db) { //Adds 'true' as value of 'is_favorite' into IDB
                if(!db) return;
                  //Opens a new transaction tx on object store called restaurantsObjStr
                  let tx = db.transaction('restaurantOS', 'readwrite');
                  let ObjectStoreTransaction = tx.objectStore('restaurantOS');
                  ObjectStoreTransaction.get(restaurant_id)
                  .then(restaurant=>{
                      restaurant.reviews = reviews;
                      ObjectStoreTransaction.put(restaurant);
                  }); //End ObjectStoreTransaction
                  //alert('Added reviews to current resaurant object inside IDB');
                  return Promise.resolve(reviews); //The final value out of this function is REVIEWS for current restaurant
              }) //End function(db)
          /*********************** Calls fillReviewsHTML  ******************************************/    
          fillReviewsHTML(reviews); // Fills the restaurant page with fetched reviews for this restaurant
          
          //return callback(null, reviews);
          }).catch(err1 => {
            console.log('Request failed', err1); //If it is an error this message gets logged into console
           // debugger;
            
            //Checks if OFFLINE and executes the code only if OFFLINE - GET CORRECTION!
            if(!navigator.onLine){
              //alert('OFFLINE -FROM .CATCH!');
                     // console.log(restaurant_id);
              this.retrieveCachedReviews(restaurant_id)
              .then ((offlineReviews)=> {
                //debugger;
                //alert( 'Offline - Reviews got from IDB');
                return Promise.resolve(offlineReviews);
              })
             // fillReviewsHTML(offlineReviews);
            }
          });//End catch error        
  }//End of static fetchRestaurants(callback)
  

  /**
   * Retrieve cached reviews from reviewsOS 
   */
  static retrieveCachedReviews(restaurant_id){
    dbPromise = DBHelper.openIDB(); //Opens IDB   
    return dbPromise.then(function(db) { //Retrieves reviews of this resaurants from IDB
      if(!db) return;
      //Opens a new transaction tx on object store called restaurantsObjStr
      let tx = db.transaction('reviewOS', 'readonly');
      let ObjectStoreTransaction = tx.objectStore('reviewOS');
      let offlineReviews = ObjectStoreTransaction.getAll(restaurant_id);
      //console.log('OFFLINE REVIEWS retrieved' );
      return offlineReviews;
    });
  }
    
    /*
    *Fetch all restaurants and caches it inside local IDB 
    */
    static fetchRestaurants(callback) {
      //debugger; 
      //When offline get restaurants from IDB 
      if(!navigator.onLine){
        //alert('OFFLINE!'); 
      } //End if offline
     
      //When ONLINE retrieve restaurants from IDB is there is data otherwise fetch from server
      DBHelper.retrieveCachedRestaurants() //Gets restaurants from IDB cache for online and offlie scenarios
        .then(function(data){ 
          if(data.length > 0){  // if we have data to show then we pass it immediately.
              //console.log(`Restaurants retrieved fron IDB`);
          return callback(null, data); //the data is passed on to the next function which calls this function
          //alert('NO RESTAURANTS TO SHOW!');
        }
       
      //After passing the cached restaurants we need to update the cache with fetching restaurants from network.
      fetch(DBHelper.NEW_DATABASE_URL, {credentials:'same-origin'})
        .then(function(response) {
          if(response.ok) {//Checks if a successful response received from server. ie. response.status = 200
            console.log('NEW RESPONSE Looks like the response is here', response);
            


            return response.json();
          } else if(!response.ok){//if the fetch url is wrong this error message displays in '.catch'
              return Promise.reject('Please double check the fetch request URL!'); //If the response was not `ok` a custom reject message is sent.
            }
        }).then(function fetchRestaurantData(restaurants) { //Fetches restaurant data from json object
                console.log('HAII!!!Here are the restaurants JSON object array', restaurants);
                const myRestaurants = restaurants.restaurants;   //extracts array of 'restaurants' from JSON object 'restaurants'
                dbPromise = DBHelper.openIDB();
                /******************* TEST***************************************** */
                console.log('Here are my restaurants', myRestaurants );  //GoOD
                const firstRestaurant = myRestaurants[0];                //Good
                const firstRestaurantId = firstRestaurant.id;            //Good
                console.log('Here are my first restaurant', firstRestaurant, firstRestaurantId );   //Good
                /************************************************************** */
                dbPromise.then(function(db) {//Adds the 'restaurants into IDB
                  //debugger;
                  if(!db) return;
                  //Opens a new transaction tx on object store called restaurantsObjStr
                  let tx = db.transaction('restaurantOS', 'readwrite');
                  let ObjectStoreTransaction = tx.objectStore('restaurantOS');
                  myRestaurants.forEach(function(restaurant) {//Puts each restaurant into IDB
                  //jsonRestaurantsObject.forEach(function(restaurant) {//Puts each restaurant into IDB
                      ObjectStoreTransaction.put(restaurant); 
                      console.log('Added restaurants to IDB!', restaurant);
                      console.log('Here are resaurant ids', restaurant.id );
                  });
                  //console.log('Added restaurants to IDB!');
                  return tx.complete.then(()=>Promise.resolve(restaurants));   //Completes the transacion and the promise resolves with a result 'restaurants' 
                });//End of add restaurants to IDB 
                return callback(null,restaurants);
                
            })//End of function fetchRestaurantData(restaurants)
            .catch(err => {
              return callback(err , null)
            });//End catch error
          });//End retrieveCachedRestaurants callback

        /*******************Fetch all reviews for all restaurants ******************* */
        this.fetchAlllReviews();  //calls fetchAllReviews() function
                
    }//End of static fetchRestaurants(callback)
  


  /**
  * Fetch a restaurant by its ID.
  */
  static fetchRestaurantById(id, callback) {
    // fetch all restaurants with proper error handling.
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        const restaurant = restaurants.find(r => r.id == id);
        
        //debugger;
        //console.log(restaurant);
        //const individualReviews = restaurant.reviews;
        //console.log(individualReviews);               
        /************************** Fetch REVIEWS by id *****************************************************/
        let restaurant_id = restaurant.id;  //Assigns the value of 'restautant.id' to variable 'restaurant_id'
        
        this.fetchReviewsById(restaurant_id);  //This function gets reviews for individual restaurants
        if (restaurant) { // Got the restaurant
          callback(null, restaurant);
        } else { // Restaurant does not exist in the database
          callback('Restaurant does not exist', null);
        }
      }
    });
  }


  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine(cuisine, callback) {
    // Fetch all restaurants  with proper error handling
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given cuisine type
        const results = restaurants.filter(r => r.cuisine_type == cuisine);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchRestaurantByNeighborhood(neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given neighborhood
        const results = restaurants.filter(r => r.neighborhood == neighborhood);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        let results = restaurants
        if (cuisine != 'all') { // filter by cuisine
          results = results.filter(r => r.cuisine_type == cuisine);
        }
        if (neighborhood != 'all') { // filter by neighborhood
          results = results.filter(r => r.neighborhood == neighborhood);
        }
        callback(null, results);
      }
    });
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all neighborhoods from all restaurants
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
        callback(null, uniqueNeighborhoods);
      }
    });
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all cuisines from all restaurants
        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
        // Remove duplicates from cuisines
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i)
        callback(null, uniqueCuisines);
      }
    });
  }

  /**
   * Set restaurant as 'favorite' 
   
  static setAsFavorite(){
    DBHelper.fetchRestaurantById((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else { 
               console.log('RESTAURAT ID from setAsFavorite:', restaurant.id);
                fetch (`http://localhost:1337/restaurants/${restaurant.id}/?is_favorite=true`, {method:'PUT'})
                .then(function(response) {
                  if(response.ok){
                    alert('Restaurant added as favorite!');
                    return response.json();
                } else if (!response.ok){
                    return Promise.reject('Please double check the fetch request URL!');
                  }
                })
              }
    })
  }
*/
   

  /**
   * Restaurant page URL
  */
  static urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
    //return (`DBHelper.NEW_DATABASE_URL./restaurant.html?id=${restaurant.id}`);       
  }
  

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) { 
      //return (`/img/${restaurant.photograph}.jpg`);  
      return (`/img/${restaurant.id}.jpg`);   
  }
  
  
  /**
   * Restaurant initial load image URL for stage 2
   */
  static imageInitialLoadUrlForRestaurant(restaurant) { 
    //return (`/responsiveimages/${restaurant.photograph}-medium_0.80x.jpg`);
    return (`/responsiveimages/${restaurant.id}-medium_0.80x.jpg`);    
}
  
  /**
   * Restaurant image source set URL for stage 1
  static imageSourceSetUrlForRestaurant(restaurant) {
    return (`/responsiveimages/${restaurant.smallimage}-small_0.50x.jpg 400w, /responsiveimages/${restaurant.mediumimage} 640w, /responsiveimages/${restaurant.largeimage} 800w`);
  }
  */
  
  /**
   * Restaurant image source set URL for stage 2 and stage 3
   */
  static imageSourceSetUrlForRestaurant(restaurant) {
   // return(`/responsiveimages/${restaurant.photograph}-small_0.50x.jpg 400w, /responsiveimages/${restaurant.photograph}-medium_0.80x.jpg 640w, /responsiveimages/${restaurant.photograph}-large_2x.jpg 800w, /responsiveimages/${restaurant.photograph}.jpg`);
  
  //return(`/responsiveimages/${restaurant.photograph}-small_0.50x.jpg 400w, /responsiveimages/${restaurant.photograph}-large_2x.jpg 800w`);
  return(`/responsiveimages/${restaurant.id}-small_0.50x.jpg 400w, /responsiveimages/${restaurant.id}-large_2x.jpg 800w`);
}

  /**
   * Map marker for a restaurant.
   */
  static mapMarkerForRestaurant(restaurant, map) {
    const marker = new google.maps.Marker({
      position: restaurant.latlng,
      title: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant),
      map: map,
      animation: google.maps.Animation.DROP}
    );
    return marker;
  }

}
