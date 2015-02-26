'''
Function strain_life_morrow(e_target, e_error, sf, b, ef, c, e_modulus, s_mean)
  n = 1
  Do Until Abs(e - e_target) <= e_error
    e = ((sf - s_mean) / e_modulus) * (2 * n) ^ b + ef * (2 * n) ^ c
    Slope = ((sf - s_mean) / e_modulus) * (2 ^ b) * n ^ (b - 1) + ef * (2 ^ c) * n ^ (c - 1)
    n = n + ((e - (e_target)) / Slope)
  Loop
  strain_life_morrow = n
End Function
'''


def strain_life_morrow(e_target, e_error, sf, b, ef, c, e_modulus, s_mean):
    """
    Strain life calculator.

    https://www.efatigue.com/training/Chapter_5.pdf

    s_mean: mean stress

    """
    n = 1
    sig_f = sf - s_mean
    E = e_modulus
    foo = sig_f / E

    while True:
      # e = ((sf - s_mean) / e_modulus) * (2 * n) ^ b + ef * (2 * n) ^ c
        e = foo * (2 * n)**b + ef * (2 * n)**c
        Slope = foo * (2**b) * n**(b - 1) + ef * (2**c) * n**(c - 1)
        n = n + ((e - (e_target)) / Slope)

        # pretty sure this is the same as testing delta-n
        if abs(e - e_target) <= e_error:
            break;
    return n


"""
http://www.dtic.mil/cgi-bin/GetTRDoc?AD=ADA267310

'============================  EQUATIONS2  ============================
'  subroutine to evaluate Morrow's Strain-Life equation
'======================================================================
SUB EQUATIONS2
REM $DYNAMIC

DIM Yprime AS DOUBLE, Y AS DOUBLE, loopcount AS LONG

NNf(i) = 10000
loopcount = 0

DO
    loopcount = loopcount + 1
    Y = -deltaeps(i) / 2 + ((sigff - sigO(i)) / E) * (2 * NNf(i)) b + epsff *
             (2 * NNf(i)) ^ c
    IF ABS(Y) > .0000000001# THEN
        Yprime = (b *(sigff sig0(i)) / E) * (2 ^ b) *(NNf(i)) (b- 1) + c
             * epsff * (2 ^ c) * (NNf(i)) ' (c - 1)
        IF (Y / Yprime < NNf(i)) THEN
              NNf(i) = NNf(i) Y / Yprime
          ELSE
              NNf(i) = NNf(i) / 2
          END IF
      END IF
    LOOP UNTIL (ABS(Y) <=.0000000001#) OR (NNf(i) > 100000000) OR (loopcount=10000)

    usedlife = usedlife + 1 / NNf(i)

    IF loopcount = 10000 THEN PRINT "*"      'indication of convergence dificulties

    END SUB
"""
