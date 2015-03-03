"""Strain-life calculator."""

materials = [
    {
        'label': 'Austempered ductile iron',
        'sf':        209732.4442,
        'b':        -0.108094966,
        'ef':        0.76015,
        'c':        -0.7126,
        'e_modulus': 24800000
    },
    {
        'label': '60-40-18',
        'sf':        102.1,
        'b':        -0.0596,
        'ef':        0.5148,
        'c':        -0.6827,
        'e_modulus': 25000
    },
    {
        'label': 'SAE 1141 (AIFG)',
        'sf':        1207,
        'b':        -0.097,
        'ef':        0.85,
        'c':        -0.464,
        'e_modulus': 216
    },
]

def calculate(Ea, material, s_mean=None, e_error=1e-7):
    # count loop iterations
    i = 0

    sf        = material['sf']
    b         = material['b']
    ef        = material['ef']
    c         = material['c']
    e_modulus = material['e_modulus']

    if s_mean is not None:
        sf_e = (sf - s_mean) / e_modulus
    else:
        sf_e = sf / e_modulus
    n = 1

    while True:
        i += 1
        print '%d: %f' % (i, n)

        e = life(n, material, s_mean)
        e_prime = b * sf_e * (2**b) * n**(b-1) + c * ef * (2**c) * n**(c-1)

        n0 = n
        # Newtons method
        n = n - (e - Ea) / e_prime
        
        if abs(n0 - n) <= e_error:
            break
    print '**** %d iterations ****' % (i)
    return n

def life(n, material, s_mean=None):
    sf        = material['sf']
    b         = material['b']
    ef        = material['ef']
    c         = material['c']
    e_modulus = material['e_modulus']
    if s_mean is not None:
        sf_e = (sf - s_mean) / e_modulus
    else:
        sf_e = sf / e_modulus

    return sf_e * (2 * n)**b + ef * (2 * n)**c


def test():
    material = materials[1]
    Ea = 0.001631858
    s_mean = 40265.22776

    n = calculate(Ea, material)
    print '%f cycles' % (n)
    print 'check: ', life(n, material) - Ea

    n = calculate(Ea, material, s_mean)
    print '%f cycles' % (n)
    print 'check: ', life(n, material, s_mean) - Ea
