const models = require('../models')

it('returns default degrees by schools data', async () => {
    let result = models.getDegreesBySchool()
    expect(result).toBeTruthy()
    expect(result[0].geometry.coordinates[0]).toBeTruthy()
    }
)