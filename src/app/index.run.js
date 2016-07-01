(function() {
  'use strict';

  angular
    .module('owcast')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
