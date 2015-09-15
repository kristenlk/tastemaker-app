'use strict';

(function signupControllerIIFE() {

  var SignupController = function(authFactory, appSettings) {
    this.signupForm = {};
    this.signupForm.email = '';
    this.signupForm.password = '';
    this.currentUser = authFactory.currentUser;

    this.signup = function(){
      authFactory.signup(this.signupForm).then(function(){
        authFactory.getCurrentUser();//.then(function(){
        // })
      });
    }
  };

  SignupController.$inject = ['authFactory', 'appSettings'];

  angular.module('tastemakerApp').controller('signupController', SignupController);

})(angular);
