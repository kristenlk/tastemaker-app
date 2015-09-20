'use strict';

(function loginControllerIIFE() {

  var LoginController = function(authFactory, favoritesFactory, appSettings) {
    this.loginForm = {};
    this.loginForm.email = '';
    this.loginForm.password = '';
    this.currentUser = authFactory.currentUser;

    this.login = function(){
      authFactory.login(this.loginForm).then(function(){
        // debugger;
        authFactory.getCurrentUser()//.then(function(){
          //favoritesFactory.getFavorites().then(function(){
            //console.log(favoritesFactory.favorites);
          //})
      });
    }
  };

  LoginController.$inject = ['authFactory', 'favoritesFactory', 'appSettings'];

  angular.module('tastemakerApp').controller('loginController', LoginController);

})(angular);
