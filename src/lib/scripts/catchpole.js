function bp(rosHead, lwr, t) {
    const eccent = Math.sqrt(lwr * lwr - 1) / lwr
    const rosBack = rosHead * (1 - eccent) / (1 + eccent)
    const rosMajor = rosHead + rosBack
    const rosMinor = rosMajor / lwr
    const rosB = rosMinor
    const rosA = 0.5 * rosMajor
    const rosC = rosA - rosBack
    // The following is Catchpole & Alexander Eq 10, which produces same result as BP
    // requires knowing rosA (half the major axis ros) in advance 
    const rosC2 = rosA * Math.sqrt(1-Math.pow(lwr, -2))
    return {rosHead, lwr, eccent, rosBack, rosMajor, rosMinor, rosA, rosB, rosC, rosC2}
}

console.log(bp(10, 3, 1))