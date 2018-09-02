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
    const query = `
        SELECT schools.UNITID as id, INSTNM AS name, LONGITUD as longitude, LATITUDE as latitude, sum(degrees) as degree_count
        from schools LEFT JOIN degree_completions on schools.UNITID = degree_completions.UNITID
        group by schools.UNITID
        order by degree_count desc
    `

    const schoolsDegreesData = db.prepare(query).all()
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