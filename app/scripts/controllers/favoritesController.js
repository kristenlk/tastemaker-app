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

    vm.deleteFromFavorites = function(favId) {
      favoritesFactory.deleteFromFavorites(favId)
        .success(function(){
          console.log('Successfully deleted favorite.');
        })
        .error(function() {
          console.log('Error deleting favorite.');
        });
    };
  };

  FavoritesController.$inject = ['favoritesFactory', 'appSettings'];

  angular.module('tastemakerApp').controller('favoritesController', FavoritesController);

})(angular);
