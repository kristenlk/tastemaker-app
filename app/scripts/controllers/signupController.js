'use strict';

(function signupControllerIIFE() {
  var SignupController = function(authFactory, appSettings, usSpinnerService) {
    var vm = this;
    vm.signupForm = {};
    vm.signupForm.email = '';
    vm.signupForm.password = '';
    vm.currentUser = authFactory.currentUser;
    vm.notUnique = false;
    vm.miscSignupErrors = false;

    vm.signup = function(){
      vm.signingUp = true;
      authFactory.signup(vm.signupForm)
        .then(function(response){
          authFactory.getCurrentUser();
        }).catch(function(errors) {
          if (errors.data && errors.data.errors) {
            errors.data.errors.forEach(function(error){
              if (error.message === "email must be unique") {
                return vm.notUnique = true;
              } else {
                return vm.miscSignupErrors = true;
              }
            });
          } else {
            return vm.miscSignupErrors = true;
          }
        }).finally(function() {
          vm.signingUp = false;
        });
    }
  }

  SignupController.$inject = ['authFactory', 'appSettings', 'usSpinnerService'];

  angular.module('tastemakerApp').controller('signupController', SignupController);

})(angular);
