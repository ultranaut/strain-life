/* jshint camelcase: false */
'use strict';

/**
 * @ngdoc function
 * @name strainLifeApp.controller:CalculatorCtrl
 * @description
 * # CalculatorCtrl
 * Controller of the strainLifeApp
 */
angular.module('strainLifeApp')
  .controller('CalculatorCtrl', function ($scope, materialsData) {
    /*
     * Materials data and properties
     */
    $scope.materials = {
      staged: null,
      loaded: null,
      data: null,

      // property => label
      properties: [
        { notation: 'sigma_subf_prime',   label: 'Fatigue strength coefficient' },
        { notation: 'b',                  label: 'Fatigue strength exponent' },
        { notation: 'epsilon_subf_prime', label: 'Fatigue ductility coefficient' },
        { notation: 'c',                  label: 'Fatigue ductility exponent' },
        { notation: 'Epsilon',            label: 'Elastic modulus' }
      ],
    };

    // fetch materials data
    materialsData.list(function (data) {
      $scope.materials.data = data;
    });

    /*
     * Loading data and properties
     */
    $scope.loading = {
      // current values
      sigma_subm    : 40265.22776,
      epsilon_suba  : 0.001631858,

      // property => label
      properties: [
        { notation: 'sigma_subm',   label: 'Mean stress' },
        { notation: 'epsilon_suba', label: 'Strain amplitude(?)' }
      ]
    };

    $scope.Nu = null;

    /*
     * Calculations
     */
    $scope.compute = function () {
      $scope.Nu = 0;

      // count loop iterations
      var i = 0;
      var sf_e;
      var error_tolerance = 1e-3;

      var sigma_subf_prime   = $scope.materials.loaded.sigma_subf_prime;
      var b                  = $scope.materials.loaded.b;
      var epsilon_subf_prime = $scope.materials.loaded.epsilon_subf_prime;
      var c                  = $scope.materials.loaded.c;
      var Epsilon            = $scope.materials.loaded.Epsilon;

      var sigma_subm         = $scope.loading.sigma_subm;
      var epsilon_suba       = $scope.loading.epsilon_suba;

      if (sigma_subm !== 0) {
        sf_e = (sigma_subf_prime - sigma_subm) / Epsilon;
      }
      else {
        sf_e = sigma_subf_prime / Epsilon;
      }
      var Nu = 1;

      while (true) {
        if (i++ > 100) {
          console.error('Uh oh.');
          break;
        }
        var e = $scope.life(Nu, sigma_subm);
        // console.log(e);
        var e_prime = b * sf_e * Math.pow(2, b) * Math.pow(Nu, b-1) +
                      c * epsilon_subf_prime * Math.pow(2, c) * Math.pow(Nu, c-1);

        var Nu0 = Nu;
        // Newtons method
        Nu = Nu - (e - epsilon_suba) / e_prime;

        if (Math.abs(Nu0 - Nu) <= error_tolerance) {
          break;
        }
      }
      $scope.Nu = Nu;
    };

    $scope.life = function (Nu, sigma_subm) {
      sigma_subm = sigma_subm || null;

      var sigma_subf_prime   = $scope.materials.loaded.sigma_subf_prime;
      var b                  = $scope.materials.loaded.b;
      var epsilon_subf_prime = $scope.materials.loaded.epsilon_subf_prime;
      var c                  = $scope.materials.loaded.c;
      var Epsilon            = $scope.materials.loaded.Epsilon;
      var sf_e;

      if (sigma_subm !== 0) {
        sf_e = (sigma_subf_prime - sigma_subm) / Epsilon;
      }
      else {
        sf_e = sigma_subf_prime / Epsilon;
      }

      return sf_e * Math.pow((2 * Nu), b) + epsilon_subf_prime * Math.pow((2 * Nu), c);
    };
  });
