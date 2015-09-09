(function tastemakerAppIIFE(){
  var app = angular.module('tastemakerApp', ['ngRoute']);

  app.config(function($routeProvider){
    $routeProvider
      .when('/', {
        // ??? Nothing is really on the homepagexs
        templateUrl: 'app/views/welcome.html'
      })

      .when('/login', {
        controller: 'loginController',
        controllerAs: 'loginCtrl',
        templateUrl: 'app/views/login.html'
      })

      .when('/signup', {
        controller: 'signupController',
        controllerAs: 'signupCtrl',
        templateUrl: 'app/views/signup.html'
      })

      .when('/find-restaurant', {
        controller: 'findRestaurantController',
        controllerAs: 'findRstCtrl',
        templateUrl: 'app/views/find-restaurant.html'
      })

      .when('/account', {
        controller: 'accountController',
        controllerAs: 'acctCtrl',
        templateUrl: 'app/views/account.html'
      })

      .when('/account/favorites', {
        controller: 'favoritesController',
        controllerAs: 'favCtrl',
        templateUrl: 'app/views/favorites.html'
      })

      .otherwise({
        redirectTo: '/'
      });
  });


})();
