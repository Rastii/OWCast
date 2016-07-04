(function() {
    'use strict';

    angular
        .module('owcast')
        .service('characterSelectionSvc', characterSelectionSvc);

    // Constants for the available groups.
    var ATTACK = 'attack';
    var DEFENSE = 'defense';
    var TANK = 'tank';
    var SUPPORT = 'support';

    /**
     * An array of all the available characters in OverWatch
     * The data structure for each character is as follows:
     * {
     *      name: String, the internal identifier
     *      displayName: String, what the user will see for each character
     *      group: String, what group they belong to (see above constants)
     *      index: Int, How they will be ordered in the selection.
     *          We want a deterministic ordering that mimics the game.
     * }
     */
    var attackCharacterList = [
        {
            name: 'genji',
            displayName: 'Genji',
            group: ATTACK,
            index: 0
        },
        {
            name: 'mccree',
            displayName: 'McCree',
            group: ATTACK,
            index: 1
        },
        {
            name: 'pharah',
            displayName: 'Pharah',
            group: ATTACK,
            index: 2
        },
        {
            name: 'reaper',
            displayName: 'Reaper',
            group: ATTACK,
            index: 3
        },
        {
            name: 'soldier76',
            displayName: 'Soldier: 76',
            group: ATTACK,
            index: 4
        },
        {
            name: 'tracer',
            displayName: 'Tracer',
            group: ATTACK,
            index: 5
        },
    ];

    var defenseCharacterList = [
        {
            name: 'bastion',
            displayName: 'Bastion',
            group: DEFENSE,
            index: 0
        },
        {
            name: 'hanzo',
            displayName: 'Hanzo',
            group: DEFENSE,
            index: 1
        },
        {
            name: 'junkrat',
            displayName: 'Junkrat',
            group: DEFENSE,
            index: 2
        },
        {
            name: 'mei',
            displayName: 'Mei',
            group: DEFENSE,
            index: 3
        },
        {
            name: 'torbjorn',
            displayName: 'Torbjörn',
            group: DEFENSE,
            index: 4
        },
        {
            name: 'widowmaker',
            displayName: 'Widowmaker',
            group: DEFENSE,
            index: 5
        },
    ];

    var tankCharacterList = [
        {
            name: 'dva',
            displayName: 'D.Va',
            group: TANK,
            index: 0
        },
        {
            name: 'reinhardt',
            displayName: 'Reinhardt',
            group: TANK,
            index: 1
        },
        {
            name: 'roadhog',
            displayName: 'Roadhog',
            group: TANK,
            index: 2
        },
        {
            name: 'winston',
            displayName: 'Winston',
            group: TANK,
            index: 3
        },
        {
            name: 'zarya',
            displayName: 'Zarya',
            group: TANK,
            index: 4
        },
    ];

    var supportCharacterList = [
        {
            name: 'lucio',
            displayName: 'Lúcio',
            group: SUPPORT,
            index: 0
        },
        {
            name: 'mercy',
            displayName: 'Mercy',
            group: SUPPORT,
            index: 1
        },
        {
            name: 'symmetra',
            displayName: 'Symmetra',
            group: SUPPORT,
            index: 2
        },
        {
            name: 'zenyatta',
            displayName: 'Zenyatta',
            group: SUPPORT,
            index: 3
        },
    ];

    var allCharacterList = attackCharacterList.concat(
        defenseCharacterList,
        tankCharacterList,
        supportCharacterList
    );

    var allCharacterNamesArray = [];
    // Keep a reference of all the available character names as a lookup "dictionary"
    // We can then use this to log potential errors of invalid characters being used.
    var allCharacterNames = allCharacterList.reduce(function(obj, char) {
        obj[char.name] = true;
        allCharacterNamesArray.push(char.name);
        return obj;
    }, {});

    /** @ngInject */
    function characterSelectionSvc($log) {
        // Expose some constants
        this.ATTACK_GROUP = Object.freeze(ATTACK);
        this.DEFENSE_GROUP = Object.freeze(DEFENSE);
        this.TANK_GROUP = Object.freeze(TANK);
        this.SUPPORT_GROUP = Object.freeze(SUPPORT);

        // The initial state of the service has no characters selected.
        // A dictionary of all the characters with the values set to 0
        var selectedCharacters = allCharacterList.reduce(function(obj, char) {
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
            if(!allCharacterNames[characterName]) {
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
            if(!allCharacterNames[characterName]) {
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
            if(!allCharacterNames[characterName]) {
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
         * Return an array of all the characters available.
         */
        this.getAllAvailableCharacters = function() {
            return angular.copy(allCharacterList);
        };

        this.getAvailableCharactersByGroup = function(group) {
            switch(group) {
                case ATTACK:
                    return angular.copy(attackCharacterList);
                case DEFENSE:
                    return angular.copy(defenseCharacterList);
                case TANK:
                    return angular.copy(tankCharacterList);
                case SUPPORT:
                    return angular.copy(supportCharacterList);
                default:
                    return $log.warn('Unknown group type: ' + group);
            }
        };
    }
})();