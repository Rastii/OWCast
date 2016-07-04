(function() {
    'use strict';
    
    angular
        .module('owcast')
        .directive('characterSelection', characterSelection);

    /** @ngInject */
    function characterSelection() {
        return {
            restrict: 'EA',
            scope: {
                'onCharacterSelection': '=',
            },
            templateUrl: 'app/components/characterSelection/characterSelection.html',
            controller: characterSelectionCtrl,
            controllerAs: 'charSel',
            bindToController: true
        };

        /** @ngInject */
        function characterSelectionCtrl($log, toastr, characterSelectionSvc) {
            // Ensure that onCharacterSelection is a function, otherwise throw programmer error!
            if(!angular.isFunction(this.onCharacterSelection)) {
                throw new Error(
                    'Invalid use of characterSelection directive, must provide a "onCharacterSelection" attr ' +
                    'for callback.'
                );
            }
            var charSel = this;
            
            this.attackChars = characterSelectionSvc
                .getAvailableCharactersByGroup(characterSelectionSvc.ATTACK_GROUP);
            this.defenseChars = characterSelectionSvc
                .getAvailableCharactersByGroup(characterSelectionSvc.DEFENSE_GROUP);
            this.tankChars = characterSelectionSvc
                .getAvailableCharactersByGroup(characterSelectionSvc.TANK_GROUP);
            this.supportChars = characterSelectionSvc
                .getAvailableCharactersByGroup(characterSelectionSvc.SUPPORT_GROUP);

            // Expose adding/removing character from controller
            this.addCharacterToSelection = function(name) {
                // Check to see if we already have 6 characters, can't add more than that!
                if (characterSelectionSvc.getNumberSelectedCharacters() == 6) {
                    return toastr.error('A team cannot have more than 6 players!');
                }
                characterSelectionSvc.addCharacter(name);

                // Trigger onSelection callback
                this.onCharacterSelection(characterSelectionSvc.getCharactersSelectedArray());
            };

            this.removeCharacterFromSelection = characterSelectionSvc.removeCharacter;
            this.removeCharacterFromSelection = function(characterName) {
                characterSelectionSvc.removeCharacter(characterName);
                this.onCharacterSelection(characterSelectionSvc.getCharactersSelectedArray());
            };
            this.getCharacterSelectCount = characterSelectionSvc.getCharacterSelectCount;
        }
    }
})();