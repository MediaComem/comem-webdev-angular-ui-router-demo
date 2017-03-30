angular.module('AddressBook').controller('NavController', function(AuthService, $state) {
  var navCtrl = this;

  navCtrl.isLoggedIn = AuthService.isLoggedIn;

  navCtrl.logIn = function(event) {
    event.preventDefault();
    AuthService.setLoggedIn(true);
  };

  navCtrl.logOut = function(event) {
    event.preventDefault();
    AuthService.setLoggedIn(false);
    $state.go('home');
  };
});

angular.module('AddressBook').factory('AuthService', function(store) {

  var service = {};

  service.isLoggedIn = function() {
    return store.get('loggedIn');
  };

  service.setLoggedIn = function(loggedIn) {
    store.set('loggedIn', loggedIn);
  };

  return service;
});
