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

        function counterMatrixTableCtrl() {

        }
    }
})();