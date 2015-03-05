'use strict';

angular.module('strainLifeApp')
  .factory('materialsData', function ($http) {

    function getData(callback) {
      $http({
        method: 'GET',
        url: 'data/materialsData.json',
        cache: true
      }).success(callback);
    }

    return {
      list: getData,
    };
  });
