'use strict';

(function loginControllerIIFE() {

  var LoginController = function(authFactory, appSettings) {
    this.loginForm = {};
    this.loginForm.email = '';
    this.loginForm.password = '';
    this.currentUser = authFactory.currentUser;

    this.login = function(){
      authFactory.login(this.loginForm).then(function(){
        authFactory.getCurrentUser();//.then(function(){
        //   debugger;
        // })
      });
    }
  };

  LoginController.$inject = ['authFactory', 'appSettings'];

  angular.module('tastemakerApp').controller('loginController', LoginController);

})(angular);
