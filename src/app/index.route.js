(function() {
  'use strict';

  angular
    .module('owcast')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/select', {
          template: '<div character-selection></div>'
      })
      .otherwise({
        redirectTo: '/select'
      });
      /*
      .when('/', {
          templateUrl: 'app/main/main.html',
          controller: 'MainController',
          controllerAs: 'main'
        })
    */

  }

})();
