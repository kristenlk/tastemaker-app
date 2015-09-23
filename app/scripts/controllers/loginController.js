'use strict';

(function loginControllerIIFE() {

  var LoginController = function(authFactory, favoritesFactory, appSettings) {
    var vm = this;
    vm.loginForm = {};
    vm.loginForm.email = '';
    vm.loginForm.password = '';
    vm.currentUser = authFactory.currentUser;
    // Errors detected from server by factory
    vm.factoryErrors = authFactory.error;
    vm.loginErrors = false;

    vm.login = function(){
      authFactory.login(vm.loginForm).then(function(response){
        // Checking if factory returned an error.
        // Don't need to check what type of error it is, since I'm just going to show one generic error.
        authFactory.getCurrentUser();
      }, function() {
        vm.loginErrors = true;
      });
    }

    vm.clearErrors = function(){
      vm.loginErrors = false;
    }
  };

  LoginController.$inject = ['authFactory', 'favoritesFactory', 'appSettings'];

  angular.module('tastemakerApp').controller('loginController', LoginController);

})(angular);
