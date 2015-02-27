# Strain Life

---

Calculating mean stress effects on strain-life fatigue behavior.

## Some random notes
  * [Cyclic Deformation & Strain-life (ε-N) Approach]( https://www.efatigue.com/training/Chapter_5.pdf )
  * [Fatigue Life Program Using Strain-life Methods](http://www.dtic.mil/cgi-bin/GetTRDoc?AD=ADA267310)

From FLP, pg. 54:

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

