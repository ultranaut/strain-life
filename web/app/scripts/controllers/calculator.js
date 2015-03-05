/* jshint camelcase: false */
'use strict';

/**
 * @ngdoc function
 * @name strainLifeApp.controller:CalculatorCtrl
 * @description
 * # MainCtrl
 * Controller of the strainLifeApp
 */
angular.module('strainLifeApp')
  .controller('CalculatorCtrl', function ($scope, materialsData) {
    materialsData.list(function (materials) {
      $scope.materials = materials;
      });
    $scope.conditions = {
      's_mean': 40265.22776,
      'Ea':     0.001631858
      };
    $scope.cycles = null;
    $scope.compute = function () {
      $scope.cycles = 0;

      console.log($scope.currentMaterial);
      console.log($scope.conditions);
      // count loop iterations
      var i = 0;
      var sf_e;

      var sf        = $scope.currentMaterial.sf;
      var b         = $scope.currentMaterial.b;
      var ef        = $scope.currentMaterial.ef;
      var c         = $scope.currentMaterial.c;
      var e_modulus = $scope.currentMaterial.e_modulus;
      var s_mean    = $scope.conditions.s_mean;
      var Ea        = $scope.conditions.Ea;
      var e_error   = 1e-7;

      if (s_mean !== 0) {
        sf_e = (sf - s_mean) / e_modulus;
      }
      else {
        sf_e = sf / e_modulus;
      }
      var n = 1;

      while (true) {
        if (i++ > 100) {
          console.error('Uh oh.');
          break;
        }
        var e = $scope.life(n, s_mean);
        console.log(e);
        var e_prime = b * sf_e * Math.pow(2, b) * Math.pow(n, b-1) +
                      c * ef * Math.pow(2, c) * Math.pow(n, c-1);

        var n0 = n;
        // Newtons method
        n = n - (e - Ea) / e_prime;

        if (Math.abs(n0 - n) <= e_error) {
          break;
        }
      // print '**** %d iterations ****' % (i);
      }
      $scope.cycles = n;
    };

    $scope.life = function (n, s_mean) {
      s_mean = s_mean || null;

      var sf        = $scope.currentMaterial.sf;
      var b         = $scope.currentMaterial.b;
      var ef        = $scope.currentMaterial.ef;
      var c         = $scope.currentMaterial.c;
      var e_modulus = $scope.currentMaterial.e_modulus;
      var sf_e;

      if (s_mean !== 0) {
        sf_e = (sf - s_mean) / e_modulus;
      }
      else {
        sf_e = sf / e_modulus;
      }

      return sf_e * Math.pow((2 * n), b) + ef * Math.pow((2 * n), c);
    };

  });
