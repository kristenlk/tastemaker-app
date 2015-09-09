(function findRestaurantFactoryIIFE(){

  var findRestaurantFactory = function($http, appSettings){
    var factory = {};
    factory.topRestaurantMatch = {};
    factory.restaurantMatches = [];

    factory.getRestaurants = function(){
      return $http.get(appSettings.apiURL + '/restaurant').success(function(response){
        angular.copy(response, factory.restaurantMatches);
      });
    };

    // factory.getRestaurant = function(restaurantId){
    //   go through factory.restaurantMatches, sort by rating, get top restaurant.
    //   if user has selected to view the next one, get the next highest rated restaurant
    // }

    return factory;
  };

  findRestaurantFactory.$inject = ['$http', 'appSettings'];

  angular.module('tastemakerApp').factory('findRestaurantFactory', findRestaurantFactory);

})();
