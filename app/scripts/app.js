(function tastemakerAppIIFE(){
  var app = angular.module('tastemakerApp', ['uiGmapgoogle-maps', 'ngRoute', 'ngCookies']);

  app.config(['$routeProvider', 'uiGmapGoogleMapApiProvider', '$httpProvider', function($routeProvider, uiGmapGoogleMapApiProvider, $httpProvider){

    $httpProvider.defaults.withCredentials = true;

    uiGmapGoogleMapApiProvider.configure({
      key: "AIzaSyCR4oUZq8t1ZrqocpZhb9KpTypa70sP4YM",
      v: '3.20',
      libraries: 'geometry, visualization, places'
    });

    $routeProvider
      .when('/', {
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

      .when('/logout', {
        controller: 'navbarController',
        controllerAs: 'navCtrl',
        templateUrl: 'app/views/index.html'
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
    }
  ])//.run(function($cookies, authFactory){
  //   if ($.isEmptyObject(authFactory.currentUser) && $cookies.get('connect.sid')) {
  //     authFactory.getCurrentUser();

  //   }

  //   console.log($cookies.get('connect.sid'));
  // });

})();

// (function tastemakerAppIIFE(){
//   var app = angular.module('tastemakerApp', ['ngRoute']);

//   app.config(function($routeProvider){
//     $routeProvider
//       .when('/', {
//         // ??? Nothing is really on the homepagexs
//         templateUrl: 'app/views/welcome.html'
//       })

//       .when('/login', {
//         controller: 'loginController',
//         controllerAs: 'loginCtrl',
//         templateUrl: 'app/views/login.html'
//       })

//       .when('/signup', {
//         controller: 'signupController',
//         controllerAs: 'signupCtrl',
//         templateUrl: 'app/views/signup.html'
//       })

//       .when('/find-restaurant', {
//         controller: 'findRestaurantController',
//         controllerAs: 'findRstCtrl',
//         templateUrl: 'app/views/find-restaurant.html'
//       })

//       .when('/account', {
//         controller: 'accountController',
//         controllerAs: 'acctCtrl',
//         templateUrl: 'app/views/account.html'
//       })

//       .when('/account/favorites', {
//         controller: 'favoritesController',
//         controllerAs: 'favCtrl',
//         templateUrl: 'app/views/favorites.html'
//       })

//       .otherwise({
//         redirectTo: '/'
//       });
//   });


// })();
