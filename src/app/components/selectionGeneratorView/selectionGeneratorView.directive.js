(function() {
    'use strict';

    angular
        .module('owcast')
        .directive('selectionGeneratorView', selectionGeneratorView);

    function selectionGeneratorView() {
        return {
            restrict: 'EA', // <-- We all hate this evil company, right?
            scope: {},
            controller: selectionGeneratorViewCtrl,
            templateUrl: 'app/components/selectionGeneratorView/selectionGeneratorView.html',
            controllerAs: 'sgView'
        };

        /** @ngInject */
        function selectionGeneratorViewCtrl($log, toastr, CounterCastList, counterGenerator, counterGeneratorData) {
            var controller = this;
            this.counterCastModel = new CounterCastList();

            this.handleCharacterSelection = function(characterSelection) {
                if(characterSelection.length == 0) {
                    return controller.counterCastModel.clearList();
                }
                // TODO: Make user allow to choose other than default
                var matrixData = counterGeneratorData.getMatrixData('default');
                var counterData = counterGenerator.getCounterPlayers(characterSelection, matrixData);
                controller.counterCastModel.updateList(counterData);
            }
        }

    }
})();