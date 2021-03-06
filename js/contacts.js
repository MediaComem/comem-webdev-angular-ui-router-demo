angular.module('AddressBook').controller('ContactsPageController', function(ContactsService) {
  var contactsPageCtrl = this;

  ContactsService.getContacts().then(function(contacts) {
    contactsPageCtrl.contacts = contacts;
  });
});

angular.module('AddressBook').controller('ContactDetailsController', function(ContactsService) {
  var contactDetailsCtrl = this;

  var id = null; // TODO: get contact ID from state parameter
  ContactsService.getContact(id).then(function(contact) {
    contactDetailsCtrl.contact = contact;
  });
});

angular.module('AddressBook').factory('ContactsService', function($http, $q) {

  var service = {};

  service.getContacts = function() {
    return loadContacts();
  };

  service.getContact = function(id) {
    return loadContacts().then(function(contacts) {
      return _.find(contacts, { id: id });
    });
  };

  var cachePromise;
  function loadContacts() {
    if (!cachePromise) {
      cachePromise = $http({
        url: 'data/contacts.json'
      }).then(function(res) {
        return res.data;
      });
    }

    return cachePromise;
  }

  return service;
});
