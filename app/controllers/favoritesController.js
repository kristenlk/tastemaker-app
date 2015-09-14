'use strict';

(function favoritesControllerIIFE() {

  var FavoritesController = function(favoritesFactory, appSettings) {

    var vm = this;
    vm.favorites = favoritesFactory.favorites;

    function init(){
      favoritesFactory.getFavorites().then(function(favorites){
        console.log(vm.favorites);
        for (var i = 0; i < vm.favorites.length; i++) {
          vm.favorites[i].display_address = JSON.parse(vm.favorites[i].display_address);
        }
      });
    }

    init();

  };

  FavoritesController.$inject = ['favoritesFactory', 'appSettings'];

  angular.module('tastemakerApp').controller('favoritesController', FavoritesController);

})(angular);
