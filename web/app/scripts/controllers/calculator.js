'use strict';

/**
 * @ngdoc function
 * @name strainLifeApp.controller:CalculatorCtrl
 * @description
 * # MainCtrl
 * Controller of the strainLifeApp
 */
angular.module('strainLifeApp')
  .controller('CalculatorCtrl', function ($scope) {
    $scope.materials = [
      { 'label': 'Custom...2',
        'properties': {
          'sf':        null,
          'b':         null,
          'ef':        null,
          'c':         null,
          'e_modulus': null
        }
      },
      { 'label': 'Ductile iron',
        'properties': {
          'sf':        209732.4442,
          'b':        -0.108094966,
          'ef':        0.76015,
          'c':        -0.7126,
          'e_modulus': 24800000
        }
      },
      { 'label': '60-40-18',
        'properties': {
          'sf':        102.1,
          'b':        -0.0596,
          'ef':        0.5148,
          'c':        -0.6827,
          'e_modulus': 25000
        }
      }
    ];
    $scope.currentMaterial = $scope.materials[1];

  });
