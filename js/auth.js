angular.module('AddressBook').controller('NavController', function(AuthService, $state) {
  var authCtrl = this;

  authCtrl.isLoggedIn = AuthService.isLoggedIn;

  authCtrl.logIn = function(event) {
    event.preventDefault();
    AuthService.setLoggedIn(true);
  };

  authCtrl.logOut = function(event) {
    event.preventDefault();
    AuthService.setLoggedIn(false);
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
