(function() {
    'use strict';

    angular
        .module('owcast')
        .service('characterData', characterData);

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
    var attackCharacterArray= [
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
    var defenseCharacterArray = [
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
    var tankCharacterArray = [
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
    var supportCharacterArray = [
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

    var allCharacterArray = attackCharacterArray.concat(
        defenseCharacterArray,
        tankCharacterArray,
        supportCharacterArray
    );

    // TODO: Do a full character iteration once...
    var allCharacterNamesArray = [];
    // Keep a reference of all the available character names as a lookup "dictionary"
    // We can then use this to log potential errors of invalid characters being used.
    var allCharacterNames = allCharacterArray.reduce(function(obj, char) {
        obj[char.name] = true;
        allCharacterNamesArray.push(char.name);
        return obj;
    }, {});

    // This is merely a single digit identifier that is to be used with exporting data in the URL.
    var charCode = 0x41;
    var characterToCompressedLookup = {};
    var compressedCharacterLookup = allCharacterNamesArray.reduce(function(obj, name) {
        var c = String.fromCharCode(charCode++);
        obj[String.fromCharCode(charCode)] = name;
        characterToCompressedLookup[name] = c;
        return obj;
    }, {});

    /**
     * The purpose of this service is to provide information about all the available
     * characters in the game.
     */
    function characterData() {
        // Expose some constants
        this.ATTACK_GROUP = Object.freeze(ATTACK);
        this.DEFENSE_GROUP = Object.freeze(DEFENSE);
        this.TANK_GROUP = Object.freeze(TANK);
        this.SUPPORT_GROUP = Object.freeze(SUPPORT);
        
        this.attackCharacterObjectArray = Object.freeze(attackCharacterArray);
        this.defenseCharacterObjectArray = Object.freeze(defenseCharacterArray);
        this.tankCharacterObjectArray = Object.freeze(tankCharacterArray);
        this.supportCharacterObjectArray = Object.freeze(supportCharacterArray);
        /**
         * An array that contains all of the character objects.
         * @type {Object}
         */
        this.allCharacterObjectArray = Object.freeze(allCharacterArray);
        /**
         * An array that contains all of the character identifiers.
         * It is a "frozen" array and cannot be modified.
         * 
         * @type {Array}
         */
        this.allCharacterIdentifierArray = Object.freeze(allCharacterNamesArray);
        
        /**
         * An object with each character identifier as a key and a "true" boolean value for each key.
         * This can be used for O(1) lookups for identifier validations.
         * 
         * @type {Object}
         */
        this.allCharacterIdentifierLookup = Object.freeze(allCharacterNames);

        /**
         * An object that contains a unique (single digit) identifier for each character.
         * @type {Object}
         */
        this.compressedIdentifierLookup = Object.freeze(compressedCharacterLookup);
        this.identifierToCompressedLookup = Object.freeze(characterToCompressedLookup);
    }

})();