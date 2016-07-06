(function () {
    'use strict';

    angular
        .module('owcast')
        .service('counterGenerator', counterGenerator)
        .factory('CounterCastList', CounterCastList);

    function counterGenerator() {
        // Takes an array of enemy hero names and a score matrix and returns the top counter heroes
        this.getCounterPlayers = function (enemyTeam, scores) {
            // Helper to get the enemy heros that a hero is strong or weak against
            function enemies(hero) {
                var weak = -1;
                var strong = 1;
                return {
                    isWeakAgainst: function () {
                        return this.is(weak).against();
                    },
                    isStrongAgainst: function () {
                        return this.is(strong).against();
                    },
                    is: function (x) {
                        return {
                            against: function () {
                                return enemyTeam.filter(function (enemy) {
                                    return scores[hero] && scores[hero][enemy] == x;
                                });
                            }
                        };
                    }
                };
            };

            var heroes = Object.keys(scores);
            // Assign a score to each hero that describes how strong it is against the enemy team as a whole
            var heroScores = heroes.map(function (hero) {
                var scoreSum = enemyTeam.reduce(function (sum, enemyHero) {
                    // if hero is strong against enemyHero, then score[hero][enemyHero] = 1
                    var score = scores[hero] && scores[hero][enemyHero];
                    if (score != undefined) {
                        return sum + score;
                    }
                    return sum;
                }, 0);
                return {name: hero, score: scoreSum};
            });
            // Filter heroes that have no score
            var bestAndWorstHeroes = heroScores.filter(function(hero) {
                return hero.score != 0;
            }).sort(function (a, b) {
                return b.score - a.score;
            });

            // Return some additional info with the top heroes
            return bestAndWorstHeroes.map(function (hero) {
                return {
                    hero: hero.name,
                    strongAgainst: enemies(hero.name).isStrongAgainst(),
                    weakAgainst: enemies(hero.name).isWeakAgainst(),
                    score: hero.score
                };
            });
        }
    }

    function CounterCastList() {
        function Model(initialList) {
            this.castList = initialList || [];
        }

        Model.prototype.updateList = function(newList) {
            this.castList = newList;
        };

        Model.prototype.clearList = function() {
            this.castList = [];
        }


        return Model;
    }
})();
