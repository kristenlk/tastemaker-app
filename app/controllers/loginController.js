'use strict';

(function loginControllerIIFE() {

  var LoginController = function(authFactory, appSettings) {
    this.loginForm = {};
    this.loginForm.email = '';
    this.loginForm.password = '';

    this.login = authFactory.login;

  };

  LoginController.$inject = ['authFactory', 'appSettings'];

  angular.module('tastemakerApp').controller('loginController', LoginController);

})(angular);
