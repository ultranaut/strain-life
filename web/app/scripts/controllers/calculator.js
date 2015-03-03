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
      { 'label':'Custom...',       'sf': null,        'b': null,         'ef': null,    'c': null,    'eModulus': null     },
      { 'label':'Ductile iron',    'sf': 209732.4442, 'b': -0.108094966, 'ef': 0.76015, 'c': -0.7126, 'eModulus': 24800000 },
      { 'label':'SAE 1114 (AlFG)', 'sf': 1207,        'b': -0.097,       'ef': 0.85,    'c': -0.46,   'eModulus': 216      },
      { 'label':'SAE 1114 (AlFG)', 'sf': 1405,        'b': -0.066,       'ef': 0.88,    'c': -0.51,   'eModulus': 227      },
      { 'label':'SAE 1114 (NbFG)', 'sf': 999,         'b': -0.096,       'ef': 0.76,    'c': -0.46,   'eModulus': 220      },
      { 'label':'SAE 1114 (NbFG)', 'sf': 1228,        'b': -0.079,       'ef': 0.77,    'c': -0.50,   'eModulus': 217      },
      { 'label':'SAE 1114 (VFG)',  'sf': 1087,        'b': -0.102,       'ef': 0.68,    'c': -0.52,   'eModulus': 214      },
      { 'label':'SAE 1114 (VFG)',  'sf': 1243,        'b': -0.086,       'ef': 0.88,    'c': -0.55,   'eModulus': 215      },
      { 'label':'SAE 1114 (VFG)',  'sf': 1117,        'b': -0.103,       'ef': 0.64,    'c': -0.58,   'eModulus': 220      },
      { 'label':'SAE 1038',        'sf': 898,         'b': -0.107,       'ef': 0.77,    'c': -0.48,   'eModulus': 201      },
      { 'label':'SAE 1038',        'sf': 1051,        'b': -0.098,       'ef': 0.76,    'c': -0.44,   'eModulus': 219      },
      { 'label':'SAE 1038',        'sf': 1197,        'b': -0.097,       'ef': 1.10,    'c': -0.46,   'eModulus': 219      },
      ];
    $scope.labels = {
      'sf':        'Fatigue strength coefficient',
      'b':         'Fatigue strength exponent',
      'ef':        'Fatigue ductility coefficient',
      'c':         'Fatigue ductility exponent',
      'eModulus': 'Elastic modulus'
      };
    $scope.currentMaterial = $scope.materials[1];
    $scope.compute = function () {
      // def calculate(Ea, material, s_mean=None, e_error=1e-7):
          // count loop iterations
          /*
          var i = 0;

          var sf       = $scope.currentMaterial.sf;
          var b        = $scope.currentMaterial.b;
          var ef       = $scope.currentMaterial.ef;
          var c        = $scope.currentMaterial.c;
          var eModulus = $scope.currentMaterial.eModulus;
          */

          // if s_mean is not None:
          //     sf_e = (sf - s_mean) / eModulus
          // else:
          //     sf_e = sf / eModulus
          // n = 1

          // while True:
          //     i += 1
          //     print '%d: %f' % (i, n)

          //     e = life(n, material, s_mean)
          //     e_prime = b * sf_e * (2**b) * n**(b-1) + c * ef * (2**c) * n**(c-1)

          //     n0 = n
          //     # Newtons method
          //     n = n - (e - Ea) / e_prime

          //     if abs(n0 - n) <= e_error:
          //         break
          // print '**** %d iterations ****' % (i)
          // return n
    };

  });
