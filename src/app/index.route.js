(function () {
    'use strict';

    angular
        .module('owcast')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($routeProvider, $locationProvider) {
        // Let's run in HTML 5 mode!
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvider
            .when('/select', {
                template: '<selection-generator-view></selection-generator-view>',
                reloadOnSearch: false,
                resolve: {
                    /** @ngInject */
                    'counterGeneratorData': function (counterGeneratorData) {
                        return counterGeneratorData.defaultDataPromise;
                    }
                }
            })
            .when('/matrixData', {
               // TODO 
            })
            .when('/matrixData/import', {
                // TODO
            })
            .otherwise({
                redirectTo: '/select'
            });

    }

})();
