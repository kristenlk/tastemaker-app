'use strict';

(function loginControllerIIFE() {

  var LoginController = function(authFactory, favoritesFactory, appSettings, usSpinnerService) {
    var vm = this;
    vm.loginForm = {};
    vm.loginForm.email = '';
    vm.loginForm.password = '';
    vm.currentUser = authFactory.currentUser;
    // Errors detected from server by factory
    vm.factoryErrors = authFactory.error;
    vm.loginErrors = false;

    vm.login = function(){
      vm.loggingIn = true;
      authFactory.login(vm.loginForm).then(function(response) {
        authFactory.getCurrentUser();
        vm.loginErrors = false;
      }).catch(function(error) {
        vm.loginErrors = true;
      }).finally(function() {
        vm.loggingIn = false;
      });
    }

    vm.clearErrors = function(){

    }
  };

  LoginController.$inject = ['authFactory', 'favoritesFactory', 'appSettings', 'usSpinnerService'];

  angular.module('tastemakerApp').controller('loginController', LoginController);

})(angular);
