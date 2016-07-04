(function() {
  'use strict';

  angular
    .module('owcast')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/select', {
          template: '<selection-generator-view></selection-generator-view>',
          resolve: {
              /** @ngInject */
              'counterGeneratorData': function(counterGeneratorData) {
                  return counterGeneratorData.defaultDataPromise;
              }
          }
      })
      .otherwise({
        redirectTo: '/select'
      });

  }

})();
