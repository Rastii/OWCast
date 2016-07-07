(function() {
    'use strict';

    angular
        .module('owcast')
        .directive('counterMatrixTable', counterMatrixTable);

    function counterMatrixTable() {
        return {
            restrict: 'E',
            scope: {

            },
            controller: counterMatrixTableCtrl,
            controllerAs: 'ctrMatrixTable',
            templateUrl: 'app/components/counterMatrix/counterMatrixTable.html',
            bindToController: true
        };

        /** @ngInject */
        function counterMatrixTableCtrl(counterGeneratorData, CounterMatrixModel, characterData) {
            this.allCharacterObjectArray = characterData.allCharacterObjectArray;
           // TODO: This will be passed in... this is temporarily used for testing.
            var defaultGenData = counterGeneratorData.getMatrixData('default');
            this.model = new CounterMatrixModel(defaultGenData);
        }
    }
})();