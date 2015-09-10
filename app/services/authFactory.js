(function authFactoryIIFE(){

  var authFactory = function($http, appSettings, $location){

    var factory = {};

    factory.currentUser = {};
    factory.currentUser.favorites = {};

    factory.login = function(formData){
      // debugger;
      return $http.post(appSettings.apiURL + '/login', formData).success(function(response){
        angular.copy(response, factory.currentUser);
        factory.getCurrentUser();
        $location.path('/account');
      });
    };

    factory.signup = function(formData){
      return $http.post(appSettings.apiURL + '/signup').success(function(response){
        angular.copy(response, factory.currentUser);
        // angular.copy(response, factory.restaurantMatches);
      });
    };

    factory.getCurrentUser = function(){
      return $http.get(appSettings.apiURL + '/account/').success(function(response){
        angular.copy(response.user, factory.currentUser);
        // angular.copy(response, factory.restaurantMatches);
        // debugger;
      });
    };

    // factory.getFavorites = function(){
    //   return $http.get(appSettings.apiURL + '/account/favorites').success(function(response){
    //     angular.copy(response, factory.favorites);
    //     // angular.copy(response, factory.restaurantMatches);
    //     // debugger;
    //   });
    // };


    return factory;
  };

  authFactory.$inject = ['$http', 'appSettings', '$location'];

  angular.module('tastemakerApp').factory('authFactory', authFactory);

})();
