const models = require('../models')

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