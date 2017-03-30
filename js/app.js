angular.module('AddressBook', [
  'angular-storage',
  'ui.router'
]);

angular.module('AddressBook').config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: '/templates/home.html',
    controller: 'HomePageController',
    controllerAs: 'homePageCtrl'
  });

  $stateProvider.state('contacts', {
    url: '/contacts',
    templateUrl: '/templates/contacts.html',
    controller: 'ContactsPageController',
    controllerAs: 'contactsPageCtrl',
    data: {
      authRequired: true
    }
  });

  $stateProvider.state('contacts.details', {
    url: '/:id',
    controller: 'ContactDetailsController',
    controllerAs: 'contactDetailsCtrl',
    templateUrl: '/templates/contact-details.html',
    data: {
      authRequired: true
    }
  });

  $stateProvider.state('fullPageContactDetails', {
    url: '/contacts/:id/full',
    controller: 'FullContactDetailsController',
    controllerAs: 'contactDetailsCtrl',
    templateUrl: '/templates/contact-details-full.html',
    data: {
      authRequired: true
    }
  });

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise(function($injector) {
    var $state = $injector.get('$state');
    $state.go('home');
  });
});

angular.module('AddressBook').run(function(AuthService, $rootScope, $state) {
  $rootScope.$on('$stateChangeStart', function(event, toState) {

    var authRequired = false;
    if (toState.data) {
      authRequired = toState.data.authRequired;
    }

    var loggedIn = AuthService.isLoggedIn();

    if (authRequired && !loggedIn) {
      event.preventDefault();
      console.warn('Blocked state transition to ' + toState.name);
      $state.go('home');
    } else {
      console.log('Transitioning to ' + toState.name);
    }
  });
});
