(function() {
    'use strict';

    angular
        .module('owcast')
        .directive('counterCastList', counterCastList);

    function counterCastList() {
        return {
            restrict: 'E',
            scope: {
                'castModel': '='
            },
            templateUrl: 'app/components/counterGenerator/counterCastList.html',
            controller: counterCastListCtrl,
            controllerAs: 'counterCastList',
            bindToController: true
        };

        function counterCastListCtrl() {
            // TODO ?
        }
    }
})();
