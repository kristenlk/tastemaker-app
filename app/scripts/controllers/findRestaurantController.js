(function findRestaurantControllerIIFE(){

  var FindRestaurantController = function(findRestaurantFactory, favoritesFactory, appSettings, $timeout, uiGmapGoogleMapApi, usSpinnerService){
    var vm = this;
    vm.appSettings = appSettings;
    vm.formPhase = 1;

    vm.url;
    vm.userLocationMap = {};
    vm.directionsMap = {};
    var areaZoom = 16;

    vm.restaurants = {};

    // Increments phase of restaurant finding process
    vm.nextPhase = function(){
      vm.formPhase++;
    }

  // Decrements phase of restaurant finding process
    vm.previousPhase = function(){
      vm.formPhase--;
      // Setting vm.restaurants to an empty object to account for when a user presses the back button. Prior to doing so, when a user selected new criteria and pressed enter, they saw the old message / restaurant until the new results loaded.
      vm.restaurants = {}
      vm.currentRestaurant = 0;
    }

    vm.category = 'mexican';

    // ids are Yelp's category IDs
    vm.categories = [
      { id: 'newamerican', name: 'American (New)' },
      { id: 'tradamerican', name: 'American (Traditional)' },
      { id: 'bbq', name: 'Barbeque' },
      { id: 'breakfast_brunch', name: 'Breakfast & Brunch' },
      { id: 'burgers', name: 'Burgers' },
      { id: 'cafes', name: 'Cafes' },
      { id: 'caribbean', name: 'Caribbean' },
      { id: 'chinese', name: 'Chinese' },
      { id: 'cupcakes', name: 'Cupcakes' },
      { id: 'desserts', name: 'Desserts' },
      { id: 'hotdogs', name: 'Fast Food' },
      { id: 'foodtrucks', name: 'Food Trucks' },
      { id: 'french', name: 'French' },
      { id: 'gastropubs', name: 'Gastropubs' },
      { id: 'german', name: 'German' },
      { id: 'gluten_free', name: 'Gluten-Free' },
      { id: 'greek', name: 'Greek' },
      { id: 'icecream', name: 'Ice Cream & Frozen Yogurt' },
      { id: 'italian', name: 'Italian' },
      { id: 'japanese', name: 'Japanese' },
      { id: 'juicebars', name: 'Juice Bars & Smoothies' },
      { id: 'kosher', name: 'Kosher' },
      { id: 'latin', name: 'Latin American' },
      { id: 'mediterranean', name: 'Mediterranean' },
      { id: 'mexican', name: 'Mexican' },
      { id: 'mideastern', name: 'Middle Eastern' },
      { id: 'moroccan', name: 'Moroccan' },
      { id: 'pizza', name: 'Pizza' },
      { id: 'pubfood', name: 'Pub Food' },
      { id: 'sandwiches', name: 'Sandwiches' },
      { id: 'seafood', name: 'Seafood' },
      { id: 'southern', name: 'Southern' },
      { id: 'thai', name: 'Thai' },
      { id: 'vegan', name: 'Vegan' },
      { id: 'vegetarian', name: 'Vegetarian' },
      { id: 'vietnamese', name: 'Vietnamese' },
    ];

    vm.distance = '1609';

    // ids are distances in meters (as defined by Yelp API)
    vm.distances = [
      { id: '402', name: '1/4 mile' },
      { id: '804', name: '1/2 mile' },
      { id: '1609', name: '1 mile' },
      { id: '3218', name: '2 miles' },
      { id: '8046', name: '5 miles' }
    ];

    vm.price = '$$';

    // ids are distances in meters (as defined by Yelp API)
    vm.prices = [
      { id: '$', name: '$' },
      { id: '$$', name: '$$ (and below)' },
      { id: '$$$', name: '$$$ (and below)' },
      { id: '$$$$', name: '$$$$ (and below)' }
    ];

    // Get geolocation
    function init(){
      navigator.geolocation.getCurrentPosition(function(position) {
        vm.pos = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }

        $timeout(function() {
          vm.formPhase++;
        }, 500);

      // Yelp

      uiGmapGoogleMapApi.then(function(maps) {
        vm.userLocationMap = {
          center: {
            latitude: vm.pos.latitude,
            longitude: vm.pos.longitude
          },
          zoom: areaZoom
        };
        vm.options = {
          scrollwheel: false
        };

        vm.userLocation = [
          { id: 1,
          latitude: vm.pos.latitude,
          longitude: vm.pos.longitude,
          title: 'user location'
          }
        ];
      });
    });
  }

    init();

    vm.getRestaurant = function(){
      var url = '';
      url = '/restaurant?category_filter=';
      url += vm.category;
      url += '&sort=2&ll=';
      url += vm.pos.latitude + ',' + vm.pos.longitude;
      url += '&radius_filter=';
      url += vm.distance;
      url += '&price=' + vm.price

      console.log(url);
      findRestaurantFactory.getRestaurants(url)
        .then(function(restaurants){
          vm.formPhase++;
          vm.restaurants = restaurants;
          // Gets favorites so "Save to Favorites" / "Saved" button is always correct.
          favoritesFactory.getFavorites();
          console.log(vm.restaurants)
          if (restaurants.data.length === 0) {
            console.log('Your search didn\'t return any restaurants. Please try searching again!');
            console.log(vm.restaurants.data.length);
          } else {
            console.log(vm.restaurants.data.length);
            vm.restaurants = restaurants.data.sort(function(a, b){
              var ratingA = a.rating;
              var ratingB = b.rating;
              if (ratingA < ratingB) {
                return 1;
              }
              if (ratingA > ratingB) {
                return -1;
              }
              return 0;
            });
            // console.log(vm.restaurants);
            // debugger;
            uiGmapGoogleMapApi.then(function(maps) {
              // stores maps in vm.maps so I can access it in redrawRoute() later on
              vm.maps = maps;
              vm.directionsMap = {
                control: {},
                center: {
                  latitude: vm.pos.latitude,
                  longitude: vm.pos.longitude
                },
                zoom: areaZoom
              };
              vm.options = {
                scrollwheel: false
              };

              vm.directionsService = new maps.DirectionsService();
              vm.directionsDisplay = new maps.DirectionsRenderer();

              vm.route = {
                origin: new maps.LatLng(
                  vm.pos.latitude,
                  vm.pos.longitude
                ),
                destination: new maps.LatLng(
                  vm.restaurants[vm.currentRestaurant].location.coordinate.latitude,
                  vm.restaurants[vm.currentRestaurant].location.coordinate.longitude
                ),
                travelMode: maps.TravelMode['DRIVING']
              };

              vm.directionsService.route(vm.route, function(response, status){
                if (status === google.maps.DirectionsStatus.OK) {
                  // debugger;
                  vm.directionsDisplay.setDirections(response);
                  vm.directionsDisplay.setMap(vm.directionsMap.control.getGMap());
                } else {
                  console.log('Directions unsuccessful');
                }
              })

            });
          }
          // then get restaurant
        }, function(data, status, headers, config){
          console.log('Error getting restaurants.');
        });
      };

    vm.currentRestaurant = 0;

  // Increments phase of restaurant finding process
    vm.nextRestaurant = function(){
      vm.currentRestaurant++;
      // If there is a restaurant past the one you're on, redraw the maps route.
      if (vm.restaurants[vm.currentRestaurant]) {
        redrawRoute();
      } else {
        console.log('There are no more restaurants that match your criteria. Please try searching again!')
      }
    }

    function redrawRoute(){
      vm.route = {
        origin: new vm.maps.LatLng(
          vm.pos.latitude,
          vm.pos.longitude
        ),
        destination: new vm.maps.LatLng(
          vm.restaurants[vm.currentRestaurant].location.coordinate.latitude,
          vm.restaurants[vm.currentRestaurant].location.coordinate.longitude
        ),
        travelMode: vm.maps.TravelMode['DRIVING']
      };

      vm.directionsService.route(vm.route, function(response, status){
        if (status === google.maps.DirectionsStatus.OK) {
          vm.directionsDisplay.setDirections(response);
          vm.directionsDisplay.setMap(vm.directionsMap.control.getGMap());
        } else {
          console.log('Directions unsuccessful');
        }
      })
    };

    vm.inFavorites = function(currRstId){
      for (var i = 0; i < favoritesFactory.favorites.length; i++) {
        if (currRstId === favoritesFactory.favorites[i].restaurant.yelp_id) {
          return true;
        }
      }
    };

  // Decrements phase of restaurant finding process
    vm.previousRestaurant = function(){
      vm.currentRestaurant--;
      redrawRoute();
    }

    vm.saveToFavorites = function(){
      favoritesFactory.saveToFavorites(vm.restaurants[vm.currentRestaurant])
      // Gets favorites so "Save to Favorites" button is dynamically updated
        .success(function(){
          favoritesFactory.getFavorites();
        })
        .error(function() {
          console.log('Error getting favorite.');
        });;
    }
}

  FindRestaurantController.$inject = ['findRestaurantFactory', 'favoritesFactory', 'appSettings', '$timeout', 'uiGmapGoogleMapApi', 'usSpinnerService'];

  angular.module('tastemakerApp').controller('findRestaurantController', FindRestaurantController);

})();
