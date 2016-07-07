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
        function characterSelectionCtrl($log, $location, toastr, characterSelectionSvc, characterData) {
            // Ensure that onCharacterSelection is a function, otherwise throw programmer error!
            if(!angular.isFunction(this.onCharacterSelection)) {
                throw new Error(
                    'Invalid use of characterSelection directive, must provide a "onCharacterSelection" attr ' +
                    'for callback.'
                );
            }
            var charSel = this;
            
            this.attackChars = characterData.attackCharacterObjectArray;
            this.defenseChars = characterData.defenseCharacterObjectArray;
            this.tankChars = characterData.tankCharacterObjectArray;
            this.supportChars = characterData.supportCharacterObjectArray;

            // Initialize selection based on getParams
            characterSelectionSvc.getParamsToSelection($location);
            this.onCharacterSelection(characterSelectionSvc.getCharactersSelectedArray());

            // Expose adding/removing character from controller
            this.addCharacterToSelection = function(name) {
                // Check to see if we already have 6 characters, can't add more than that!
                if (characterSelectionSvc.getNumberSelectedCharacters() == 6) {
                    return toastr.error('A team cannot have more than 6 players!');
                }
                characterSelectionSvc.addCharacter(name);
                characterSelectionSvc.selectionToGetParams($location);
                // Trigger onSelection callback
                this.onCharacterSelection(characterSelectionSvc.getCharactersSelectedArray());
            };

            this.removeCharacterFromSelection = function(characterName) {
                characterSelectionSvc.removeCharacter(characterName);
                characterSelectionSvc.selectionToGetParams($location);
                this.onCharacterSelection(characterSelectionSvc.getCharactersSelectedArray());
            };
            this.getCharacterSelectCount = characterSelectionSvc.getCharacterSelectCount;
        }
    }
})();