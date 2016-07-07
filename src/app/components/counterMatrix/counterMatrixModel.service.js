(function() {
    'use strict';

    angular
        .module('owcast')
        .factory('CounterMatrixModel', CounterMatrixModel);

    /** @ngInject */
    function CounterMatrixModel($log, characterData) {
        var allCharacters = characterData.allCharacterIdentifierArray;

        function Model(initialData) {
            initialData = angular.copy(initialData) || {};
            this.data = this.init(initialData);
            // Keep a copy of the original data to be used for restoring
            this.__data = angular.copy(initialData);
        }

        /**
         * The initialization method.
         *
         * The purpose of this method is to initialize the data of this object.
         * We need to ensure that there is a value for all possible combinations,
         * that is, [x][y] E (x = all characters, y = all characters) -> {-1, 0, 1}
         *
         * If any data is undefined, the default value will be 0.
         */
        Model.prototype.init = function(data) {
            allCharacters.forEach(function(xChar) {
                if(angular.isUndefined(data[xChar])) {
                    data[xChar] = {};
                }

                var x_data = data[xChar];
                allCharacters.forEach(function(yChar) {
                   if(angular.isUndefined(x_data[yChar])) {
                       x_data[yChar] = 0;
                   }
                });
            });

            return data;
        };

        Model.prototype.__validateCell = function(xChar, yChar) {
            if(!characterData.allCharacterIdentifierLookup[xChar]) {
                $log.warn(
                    "Invalid x axis character specified when attempting to access cell: ", xChar
                );
                return false;
            }
            if(!characterData.allCharacterIdentifierLookup[yChar]) {
                $log.warn(
                    "Invalid y axis character specified when attempting to access cell: ", yChar
                );
                return false;
            }

            return true;
        };

        /**
         * Convert that value such that it follows the following sequence (before -> after):
         * -1 -> 0
         * 0 -> 1
         * 1 -> -1
         *
         * Note: the only possible values are {-1, 0, 1}
         * @param xChar String, the identifier of the x-axis character
         * @param yChar String, the identifier of the y-axis character
         */
        Model.prototype.toggleCell = function(xChar, yChar) {
            // Ensure we have a valid index for x and y
            if(!this.__validateCell(xChar, yChar)) { return; }
            // Finally toggle our cell value.
            this.data[xChar][yChar] = ((this.data[xChar][yChar] + 2) % 3) - 1
        };

        Model.prototype.resetCell = function(xChar, yChar) {
            if(!this.__validateCell(xChar, yChar)) { return; }
            this.data[xChar][yChar] = this.__data[xChar][yChar];
        };

        Model.prototype.reset = function() {
            this.data = angular.copy(this.__data);
        };

        Model.prototype.save = function() {
            this.__data = angular.copy(this.data);
        };

        return Model;
    }
})();