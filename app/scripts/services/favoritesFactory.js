(function favoritesFactoryIIFE(){

  var favoritesFactory = function($http, appSettings, $location) {
    var factory = {};
    factory.favorites = [];

    factory.getFavorites = function(){
      return $http.get(appSettings.apiURL + '/account/favorites').success(function(response){
        angular.copy(response, factory.favorites);
      });
    };

    factory.saveToFavorites = function(data){
      var restaurant = {}
      restaurant.yelp_id = data.id;
      restaurant.name = data.name;
      restaurant.url = data.url;
      restaurant.rating = data.rating;
      restaurant.display_address = data.location.display_address;
      restaurant.display_phone = data.display_phone;
      restaurant.latitude = data.location.coordinate.latitude;
      restaurant.longitude = data.location.coordinate.longitude;
      restaurant.price = data.price;

      return $http.post(appSettings.apiURL + '/account/favorites', restaurant)
    };

    return factory;
  };

  favoritesFactory.$inject = ['$http', 'appSettings', '$location'];

  angular.module('tastemakerApp').factory('favoritesFactory', favoritesFactory);

})();
