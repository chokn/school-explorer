// const sqlite = require('sqlite')
const Database = require('better-sqlite3')
// const { SQL } = require('sql-template-strings')

// const dbPromise = sqlite.open('./sqlite/ipeds.sqlite', {cached: true})
const options = {
    readonly: true,
    fileMustExist: true
}
const db = new Database('./sqlite/ipeds.sqlite', options)


function getDegreesBySchool(args) {
    var gender;
    if (args && args.gender && args.gender !== 'all') {
        gender = args.gender
    } else {
        gender = '%'
    }
    const query = `
        SELECT schools.UNITID as id, INSTNM AS name, LONGITUD as longitude, LATITUDE as latitude, sum(degrees) as degree_count
        from schools LEFT JOIN degree_completions on schools.UNITID = degree_completions.UNITID
        where degree_completions.gender LIKE @gender
        group by schools.UNITID
        having degree_count is not null
        order by degree_count desc
    `

    const schoolsDegreesData = db.prepare(query).all({
        gender
    })
    let schoolFeatures = schoolsDegreesData.map(element => {
        let longitude = parseFloat(element.longitude)
        let latitude = parseFloat(element.latitude)
        return {
            type: "Feature", 
            geometry: {
                type: "Point",
                coordinates: [longitude, latitude]
            },
            properties: {
                id: element.id,
                name: element.name,
                degreeCount: element.degree_count,
                lon: longitude,
                lat: latitude
            }
        }
    })
    return schoolFeatures
}

module.exports = {
    getDegreesBySchool
}