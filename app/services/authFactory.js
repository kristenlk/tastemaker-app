(function authFactoryIIFE(){

  var authFactory = function($http, appSettings){

    var factory = {};

    factory.currentUser = {};

    factory.login = function(formData){
      // debugger;
      return $http.post(appSettings.apiURL + '/login', formData).success(function(response){
        angular.copy(response, factory.currentUser);
        factory.getCurrentUser();
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
        angular.copy(response, factory.currentUser);
        // angular.copy(response, factory.restaurantMatches);
        debugger;
      });
    };

    return factory;
  };

  authFactory.$inject = ['$http', 'appSettings'];

  angular.module('tastemakerApp').factory('authFactory', authFactory);

})();
