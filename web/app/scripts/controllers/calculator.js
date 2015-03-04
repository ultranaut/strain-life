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
  .controller('CalculatorCtrl', function ($scope) {
    $scope.materials = [
      { 'label':'Custom...',       'sf': null,        'b': null,         'ef': null,    'c': null,    'e_modulus': null     },
      { 'label':'Ductile iron',    'sf': 209732.4442, 'b': -0.108094966, 'ef': 0.76015, 'c': -0.7126, 'e_modulus': 24800000 },
      { 'label':'SAE 1114 (AlFG)', 'sf': 1207,        'b': -0.097,       'ef': 0.85,    'c': -0.464,   'e_modulus': 216      },
      { 'label':'SAE 1114 (AlFG)', 'sf': 1405,        'b': -0.066,       'ef': 0.88,    'c': -0.514,   'e_modulus': 227      },
      { 'label':'SAE 1114 (NbFG)', 'sf': 999,         'b': -0.096,       'ef': 0.76,    'c': -0.462,   'e_modulus': 220      },
      { 'label':'SAE 1114 (NbFG)', 'sf': 1228,        'b': -0.079,       'ef': 0.77,    'c': -0.508,   'e_modulus': 217      },
      { 'label':'SAE 1114 (VFG)',  'sf': 1087,        'b': -0.102,       'ef': 0.68,    'c': -0.529,   'e_modulus': 214      },
      { 'label':'SAE 1114 (VFG)',  'sf': 1243,        'b': -0.086,       'ef': 0.88,    'c': -0.555,   'e_modulus': 215      },
      { 'label':'SAE 1114 (VFG)',  'sf': 1117,        'b': -0.103,       'ef': 0.64,    'c': -0.581,   'e_modulus': 220      },
      { 'label':'SAE 1038',        'sf': 898,         'b': -0.107,       'ef': 0.77,    'c': -0.481,   'e_modulus': 201      },
      { 'label':'SAE 1038',        'sf': 1051,        'b': -0.098,       'ef': 0.76,    'c': -0.440,   'e_modulus': 219      },
      { 'label':'SAE 1038',        'sf': 1197,        'b': -0.097,       'ef': 1.10,    'c': -0.460,   'e_modulus': 219      },
      ];
    $scope.currentMaterial = $scope.materials[1];
    $scope.conditions = {
      's_mean':          40265.22776,
      'Ea': 0.001631858
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
