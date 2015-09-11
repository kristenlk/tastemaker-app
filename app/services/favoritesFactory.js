(function favoritesFactoryIIFE(){

  var favoritesFactory = function($http, appSettings) {
    var factory = {};
    factory.favorites = [];

    factory.getFavorites = function(){
      return $http.get(appSettings.apiURL + '/account/favorites').success(function(response){
        angular.copy(response, factory.favorites);
      });
    };

    factory.saveToFavorites = function(restaurant){
      return $http.post(appSettings.apiURL + '/account/favorites', restaurant);
    };

    return factory;
  };

  favoritesFactory.$inject = ['$http', 'appSettings'];

  angular.module('tastemakerApp').factory('favoritesFactory', favoritesFactory);

})();
