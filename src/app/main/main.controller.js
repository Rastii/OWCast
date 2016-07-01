(function() {
  'use strict';

  angular
    .module('owcast')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, toastr) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1467334525945;
    vm.showToastr = showToastr;
  }
})();
