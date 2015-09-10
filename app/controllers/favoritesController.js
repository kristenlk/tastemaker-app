'use strict';

(function favoritesControllerIIFE() {

  var FavoritesController = function(favoritesFactory, appSettings) {

    var vm = this;
    vm.favorites = favoritesFactory.favorites;

    function init(){
      favoritesFactory.getFavorites();
    }

    init();

  };

  FavoritesController.$inject = ['favoritesFactory', 'appSettings'];

  angular.module('tastemakerApp').controller('favoritesController', FavoritesController);

})(angular);
