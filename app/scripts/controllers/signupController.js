'use strict';

(function signupControllerIIFE() {

  var SignupController = function(authFactory, appSettings) {
    var vm = this;
    vm.signupForm = {};
    vm.signupForm.email = '';
    vm.signupForm.password = '';
    vm.currentUser = authFactory.currentUser;
    vm.notUnique = false;
    vm.miscSignupErrors = false;

    vm.signup = function(){
      authFactory.signup(vm.signupForm)
        .then(function(response){
          console.log(response);
          // Checking if response has an error in it. Workaround for error handling not functioning as I expected.
          // If there is an error, iterate through errors. Check what type of error it is.
          if (response.data.error.errors) {
            response.data.error.errors.forEach(function(error){
              if (error.message === "email must be unique") {
                return vm.notUnique = true;
              } else if (error.message) {
                return vm.miscSignupErrors = true;
              }
            });
          }

          authFactory.getCurrentUser();

        })
    }

    vm.clearErrors = function(){
      vm.notUnique = false;
      vm.miscSignupErrors = false;
    }

  }


  SignupController.$inject = ['authFactory', 'appSettings'];

  angular.module('tastemakerApp').controller('signupController', SignupController);

})(angular);
