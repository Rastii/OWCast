(function() {
    'use strict';

    angular
        .module('owcast')
        .service('characterSelectionSvc', characterSelectionSvc);

    /** @ngInject */
    function characterSelectionSvc($log, characterData) {
        var selectionSvc = this;
        // This constant is the default GET param key that will be used to store the current enemy team selection
        this.DEFAULT_GET_PARAM_KEY = Object.freeze('enemyTeam');

        // The initial state of the service has no characters selected.
        // A dictionary of all the characters with the values set to 0
        var selectedCharacters = characterData.allCharacterObjectArray.reduce(function(obj, char) {
            obj[char.name] = 0;
            return obj;
        }, {});
        // A simple data structure that just contains all the characters selected as an array
        // for example, [ 'hanzo', 'genji', 'hanzo', 'mei' ]
        var selectedCharactersArray = [];

        /**
         * Method returns a copy of the original selected characters array.
         * We don't want to return the original reference since modifying that array
         * may break the functionality of this service.
         *
         * Modification of the array is strictly dependant on the methods exposed
         * by this service.
         */
        this.getCharactersSelectedArray = function() {
            return angular.copy(selectedCharactersArray);
        };
        /**
         * Method simply returns the amount of selected characters.
         * @returns {Number}
         */
        this.getNumberSelectedCharacters = function() {
            return selectedCharactersArray.length;
        };

        /**
         * Method the amount of the same selected characters.
         * @param characterName
         * @returns {*}
         */
        this.getCharacterSelectCount = function(characterName) {
            if(!characterData.allCharacterIdentifierLookup[characterName]) {
                $log.warn(
                    'Attempted to get a non-existing character: ' + characterName
                );
                return null;
            }
            
            return selectedCharacters[characterName];
        };

        /**
         * Method adds a character to two data structures, our object that maintains the count of
         * each characters `selectedCharacters` and pushes the characterName to the `selectedCharactersArray`
         *
         * If the characterName parameter is invalid, an warning message will be logged and
         * the value returned will be null.
         *
         * @param characterName String, identifier of a character
         * @returns {*}
         */
        this.addCharacter = function(characterName) {
            if(!characterData.allCharacterIdentifierLookup[characterName]) {
                return $log.warn(
                    'Attempted to add a non-existing character: ' + characterName
                );
            }
            selectedCharactersArray.push(characterName);
            return selectedCharacters[characterName]++;
        };

        /**
         * Method removes a character from both data structures.  In our count data structure, it will
         * decrease the value by 1 (with a min threshold of 0, that is, if value is 0 and remove is applied
         * @param characterName
         * @returns {*}
         */
        this.removeCharacter = function(characterName) {
            if(!characterData.allCharacterIdentifierLookup[characterName]) {
                return $log.warn(
                    'Attempted to remove a non-existing character: ' + characterName
                );
            }

            // Subtract from the current value stored unless it goes below 0
            var curVal = selectedCharacters[characterName];
            if(curVal > 0) {
                selectedCharacters[characterName]--;
                selectedCharactersArray.splice(selectedCharactersArray.indexOf(characterName), 1);
            }
        };

        /**
         * Method applies the current selection to the URL GET params as comma seperated values
         * based on the selectedCharactersArray.
         * @param location $location angular service
         * @param key key to be used in URL (optional)
         */
        this.selectionToGetParams = function(location, key) {
            key = key || selectionSvc.DEFAULT_GET_PARAM_KEY;
            location.search(key, selectedCharactersArray.join(',') || null);
        };

        /**
         * Method applies GET parameters in the URL to the current selection.
         * @param location $location angular service
         * @param key key to be used to retrive GET params
         */
        this.getParamsToSelection = function(location, key) {
            key = key || selectionSvc.DEFAULT_GET_PARAM_KEY;
            var selection = location.search()[key];
            selection = (angular.isString(selection) ? selection.split(',') : []);
            selection.forEach(function(character) {
               selectionSvc.addCharacter(character);
            });
        }
    }
})();