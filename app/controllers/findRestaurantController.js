(function findRestaurantControllerIIFE(){

  var FindRestaurantController = function(findRestaurantFactory, favoritesFactory, appSettings, $timeout, uiGmapGoogleMapApi){
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
      { id: 'mexican', name: 'Food Trucks' },
      { id: 'french', name: 'French' },
      { id: 'gastropubs', name: 'Gastropubs' },
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
      { id: 'seafood', name: 'Seafood' },
      { id: 'southern', name: 'Southern' },
      { id: 'thai', name: 'Thai' },
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

    vm.price = '2';

    // ids are distances in meters (as defined by Yelp API)
    vm.prices = [
      { id: '1', name: '$' },
      { id: '2', name: '$$ (and below)' },
      { id: '3', name: '$$$ (and below)' },
      { id: '4', name: '$$$$ (and below)' }
    ];

    // Get geolocation
    function init(){
      navigator.geolocation.getCurrentPosition(function(position) {
        vm.pos = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }

        // Why isn't this working...?
        $timeout(function() {
          vm.formPhase++;
        }, 500);

        console.log('Your current position is ' + vm.pos.latitude + ', ' + vm.pos.longitude)
        // if (vm.pos.latitude && vm.pos.longitude) {
        //   vm.nextPhase();
        // }
        // return vm.formPhase;

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
      url = '/restaurant?term=food&category_filter=';
      url += vm.category;
      url += '&sort=2&ll=';
      url += vm.pos.latitude + ',' + vm.pos.longitude;
      url += '&radius_filter=';
      url += vm.distance;
      url += '&price=' + vm.price

      findRestaurantFactory.getRestaurants(url)
        .then(function(restaurants){
          // debugger;
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

          // then get restaurant
        }, function(data, status, headers, config){
          console.log('Error getting restaurants.');
        });
      };

    vm.currentRestaurant = 0;

  // Increments phase of restaurant finding process
    vm.nextRestaurant = function(){
      vm.currentRestaurant++;
      redrawRoute();
    }

  // Decrements phase of restaurant finding process
    vm.previousRestaurant = function(){
      vm.currentRestaurant--;
      redrawRoute();
    }

    vm.saveToFavorites = function(){
      favoritesFactory.saveToFavorites(vm.restaurants[vm.currentRestaurant]);
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
            // debugger;
            vm.directionsDisplay.setDirections(response);
            vm.directionsDisplay.setMap(vm.directionsMap.control.getGMap());
          } else {
            console.log('Directions unsuccessful');
          }
        })
      };
}

    // uiGmapGoogleMapApi.
  FindRestaurantController.$inject = ['findRestaurantFactory', 'favoritesFactory', 'appSettings', '$timeout', 'uiGmapGoogleMapApi'];

  angular.module('tastemakerApp').controller('findRestaurantController', FindRestaurantController);

})();
