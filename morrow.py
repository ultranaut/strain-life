"""Strain life calculator."""

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
