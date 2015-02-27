"""
Strain life calculator.

https://www.efatigue.com/training/Chapter_5.pdf
http://www.dtic.mil/cgi-bin/GetTRDoc?AD=ADA267310
"""

def morrow(e_target, sf, b, ef, c, e_modulus, s_mean, e_error=1e-7):
    n = 1
    sf_e = (sf - s_mean) / e_modulus

    i = 1

    while True:
        i += 1
        print ('%d: %f' % (i, n))
        if i > 1000:
            print 'not converging?'
            break
        e = sf_e * (2**b) * n**b + ef * (2**c) * n**c
        Slope = sf_e * (2**b) * n**(b-1) + ef * (2**c) * n**(c-1)
        n = n + (e - e_target) / Slope

        if abs(e - e_target) <= e_error:
            break
    return n

def morrow2(Ea, sf, b, ef, c, e_modulus, s_mean, e_error=1e-7):
    # count loop iterations
    i = 0

    sf_e = (sf - s_mean) / e_modulus
    n = 1

    while True:
        i += 1
        print ('%d: %f' % (i, n))
        if i > 1000:
            print 'not converging?'
            break
        e = sf_e * (2**b) * n**b + ef * (2**c) * n**c - Ea
        e_prime = b * sf_e * (2**b) * n**(b-1) + c * ef * (2**c) * n**(c-1)

        n0 = n
        n = n - (e / e_prime)
        if abs(n0 - n) <= e_error:
            break
    return n


def test():
    Ea = 0.001631858
    sf = 209732.4442
    b = -0.108094966
    ef = 0.76015
    c = -0.7126
    e_modulus = 24800000
    s_mean = 40265.22776

    n = morrow(Ea, sf, b, ef, c, e_modulus, s_mean)
    print '%f cycles' % (n)
    print 'check: ', check(Ea, n, sf, b, ef, c, e_modulus, s_mean)

    n = morrow2(Ea, sf, b, ef, c, e_modulus, s_mean)
    print '%f cycles' % (n)
    print 'check: ', check(Ea, n, sf, b, ef, c, e_modulus, s_mean)


def check(e_target, n, sf, b, ef, c, e_modulus, s_mean):
    return ((sf - s_mean) / e_modulus) * (2 * n)**b + ef * (2 * n)**c - e_target


"""
http://www.dtic.mil/cgi-bin/GetTRDoc?AD=ADA267310
pg. 54

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
    Y = -deltaeps(i) / 2 + ((sigff - sigO(i)) / E) * (2 * NNf(i)) ^ b + epsff *
             (2 * NNf(i)) ^ c
    IF ABS(Y) > .0000000001# THEN
        Yprime = (b * (sigff - sigO(i)) / E) * (2 ^ b) * (NNf(i)) ^ (b- 1) + c
             * epsff * (2 ^ c) * (NNf(i)) ^ (c - 1)
        IF (Y / Yprime < NNf(i)) THEN
              NNf(i) = NNf(i) - Y / Yprime
          ELSE
              NNf(i) = NNf(i) / 2
          END IF
      END IF
    LOOP UNTIL (ABS(Y) <= .0000000001#) OR (NNf(i) > 100000000) OR (loopcount=10000)

    usedlife = usedlife + 1 / NNf(i)

    IF loopcount = 10000 THEN PRINT "*"      'indication of convergence dificulties

    END SUB
"""


"""
let foo = ((sigff - sigO(i)) / E)
let Ea = deltaeps(i) / 2
let Ef = epsff
let N = NNf(i)

Y  =     foo * (2 ^ b) * N ^ b      +     Ef * (2 ^ c) * N ^ c       - Ea
Y' = b * foo * (2 ^ b) * N ^ (b- 1) + c * Ef * (2 ^ c) * N ^ (c - 1)
"""




















