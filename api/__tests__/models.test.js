const models = require('../models')

function getTotalDegrees(queryResults) {
    return queryResults.reduce((a, b) => {
        return a+b.properties.degreeCount
    }, 0)
}

it('returns default degrees by schools data', async () => {
    let result = models.getDegreesBySchool()
    expect(result).toBeTruthy()
    expect(result[0].geometry.coordinates[0]).toBeTruthy()
    }
)

it('returns degrees by gender', async () => {
    let args = {
        gender: "men"
    }
    let resultsMen = models.getDegreesBySchool(args)
    expect(resultsMen).toBeTruthy()
    let resultsCountMen = resultsMen.reduce((a,b) => {
        return a + b.properties.degreeCount
    }, 0)

    let resultsWomen = models.getDegreesBySchool({gender: "women"})
    expect(resultsWomen).toBeTruthy()
    let resultsCountWomen = resultsWomen.reduce((a,b) => {
        return a + b.properties.degreeCount
    }, 0)

    let resultsAll = models.getDegreesBySchool()
    let resultsCountAll = resultsAll.reduce((a,b) => {
        return a + b.properties.degreeCount
    }, 0)

    expect(resultsCountAll).toEqual(resultsCountMen + resultsCountWomen)
})

it('returns degrees with minimum degree level', async() => {
    let argsBachelors = {
        minDegree: 'bachelors'
    }
    let resultsBa = models.getDegreesBySchool(argsBachelors)
    let degreeCountBa = getTotalDegrees(resultsBa)

    let argsMasters = {
        minDegree: 'masters'
    }
    let resultsMa = models.getDegreesBySchool(argsMasters)
    let degreeCountMa = getTotalDegrees(resultsMa)


    let argsDoc= {
        minDegree: 'doctorate'
    }
    let resultsDoc = models.getDegreesBySchool(argsDoc)
    let degreeCountDoc = getTotalDegrees(resultsDoc)

    let degreesTotal = getTotalDegrees(models.getDegreesBySchool())
    
    expect(degreesTotal).toBeGreaterThanOrEqual(degreeCountBa + degreeCountMa + degreeCountDoc)

})

it('generates a good list string', () => {
    let test = models.generateSqlList(3)
    expect(test).toBe('AND degree_completions.race_ethnicity IN (?,?,?)')

    let test2 = models.generateSqlList(0)
    expect(test2).toBe('')
})

it('gets races', async () => {
    let rnoList = ['White', 'Asian']
    let resultsWhiteAsian = models.getDegreesBySchool({raceEthnicity: rnoList})
    expect(resultsWhiteAsian).toBeTruthy()
    let whiteAndAsianCount = getTotalDegrees(resultsWhiteAsian)
    expect(whiteAndAsianCount).toBeTruthy()
    let resultsBlack = models.getDegreesBySchool({raceEthnicity: ['Black or African American']})
    expect(resultsBlack).toBeTruthy()
    let blackCount = getTotalDegrees(resultsBlack)
    expect(whiteAndAsianCount).toBeGreaterThan(blackCount)
    
})

it('gets races from args', () => {
    args = {raceEthnicity: ['unknown']}
    let raceArray = models.getRacesFromArg(args)
    expect(raceArray[0]).toBe('Race/ethnicity unknown')
})
