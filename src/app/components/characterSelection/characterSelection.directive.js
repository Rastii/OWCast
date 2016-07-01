(function() {
    'use strict';
    
    angular
        .module('owcast')
        .directive('characterSelection', characterSelection);

    /** @ngInject */
    function characterSelection() {
        var directive = {
            restrict: 'EA',
            scope: {},
            templateUrl: 'app/components/characterSelection/characterSelection.html',
            controller: characterSelectionCtrl,
            controllerAs: 'charSel',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function characterSelectionCtrl($log, toastr, characterSelectionSvc) {
            var charSel = this;
            
            this.attackChars = characterSelectionSvc
                .getCharactersByGroup(characterSelectionSvc.ATTACK_GROUP);
            this.defenseChars = characterSelectionSvc
                .getCharactersByGroup(characterSelectionSvc.DEFENSE_GROUP);
            this.tankChars = characterSelectionSvc
                .getCharactersByGroup(characterSelectionSvc.TANK_GROUP);
            this.supportChars = characterSelectionSvc
                .getCharactersByGroup(characterSelectionSvc.SUPPORT_GROUP);

            // Expose adding/removing character from controller
            this.addCharacterToSelection = function(name) {
                var selectedCharData = characterSelectionSvc.getCharactersSelected();
                // Check to see if we already have 6 characters, can't add more than that!
                if (selectedCharData.sum == 6) {
                    return toastr.error('A team cannot have more than 6 players!');
                }
                characterSelectionSvc.addCharacter(name);
            };

            this.removeCharacterFromSelection = characterSelectionSvc.removeCharacter;
            
            // Expose retrieving current character selection count
            this.getCharacterSelectCount = characterSelectionSvc.getCharacterSelectCount;
            this.getCharactersSelected = characterSelectionSvc.getCharactersSelected;
        }
    }
})();