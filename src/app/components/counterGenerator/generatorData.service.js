(function() {
    'use strict';

    angular
        .module('owcast')
        .service('counterGeneratorData', counterGeneratorData);

    /** @ngInject */
    function counterGeneratorData($http, $log, $window, toastr) {
        /**
         * Here we are specifying the matrix data as an empty dictionary that will
         * be appended as data is loaded either through the default json file
         * or from importing various configurations.
         */
        var matrixData = {};

        /**
         * Function loads default data from the json file located in
         * 'app/data/defaultCountersMatrix.json'
         * Will through an error toastr message if there was a failure
         * in loading the file.
         */
        function loadDefaultData() {
            return $http.get('app/data/defaultCountersMatrix.json')
                .success(function(data) {
                    // Save the data to the service this scope and do not allow
                    // any modification done to the default data.
                    matrixData.default = Object.freeze(data);
                })
                .error(function(msg) {
                    toastr.error(
                        'There seems to be an error loading some necessary data'
                    )
                    $log.error('Error loading defaultCountersMatrix.json: ', msg);
                });
        }

        /**
         * The purpose of this function is to load saved data from the local storage
         */
        function loadLocalStorageData() {
            // TODO: Implement local storage functionality...
        }

        // Expose the default data promise so we can use $route resolve and not load the
        // Controller until this promise has been resolved.
        this.defaultDataPromise = loadDefaultData();
        loadLocalStorageData();

        /**
         * Method retrieves counter generator data from stored counter data.
         * If the data does not exist, null is returned and a warning is logged
         * to the console.
         *
         * @param dataKey String, used to reference which matrixData to use
         * @param isMutable Boolean, shall the return value be mutable? (default: false)
         * @returns {*}
         */
        this.getMatrixData = function(dataKey, isMutable) {
            var data = matrixData[dataKey];
            if(!data) {
                $log.warn('Attempted to access invalid counter matrix data: ', dataKey);
                return null;
            }

            // Note: angular.copy will remove the 'frozen' state of any object thus making it mutable.
            return isMutable ? angular.copy(data) : data;
        };

        this.setMatrixData = function(dataKey, data) {
            matrixData[dataKey] = Object.freeze(data);
            // TODO: Make procedure to store this in localStorage as well
        };
    }
})();