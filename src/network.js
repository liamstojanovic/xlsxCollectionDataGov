const dataGovApi = require('./shared/dataGov')
const axios = require('axios').default;

/**
 * Tests the catalog.data.gov api
 */
async function testApi () {
    try {
        var response = await axios.get(dataGovApi.baseUrl + dataGovApi.paths.status_show)
        var status = response.data.success
        if (status) {
            console.log(`${dataGovApi.baseUrl + dataGovApi.paths.status_show} returned success message ${status}`)
        }
    } catch(err) {
        console.log('Error connecting to data.gov api')
        console.log(err)
    }

}

/**
 * 
 * @param {string} searchTerm The search term
 * @returns an array containing API response objects. The length of the array is equal to the requests made
 */
async function retrieveResults (searchTerm) {
    try {
        var results = []
        var requests = await generateApiRequests(searchTerm)
        const totalRequests = requests.length
        for await (const [index, value] of requests.entries()) {
            console.log(`Fetching remote resource from catalog.data.gov, ${(index / totalRequests) * 100}% complete (${index}/${totalRequests}) `)
            var response = await axios.get(value)
            results.push(response)
        }
        console.log(`Fetched all remote resources, 100% complete (${totalRequests}/${totalRequests})`)
        return results
    } catch(err) {
        console.log(err)
        console.log('Error fetching URLs')
    }
}
/**
 * 
 * @param {string} term the search term to use
 * @returns an array with api requests to make, in order to retrieve all possible results
 */
async function generateApiRequests(term) { 
    try {
        var startValues = []
        var init = await axios.get(dataGovApi.baseUrl + dataGovApi.paths.package_search + `?q=${term}`)
        var resultCount = await init.data.result.count
        for (let i = 0; i < resultCount; i+= dataGovApi.MAXROWS) { // Creates an array of start values based on the resultCount response
            startValues.push(i)
        }
        // console.log(startValues)
        const apiRequests = startValues.map((element) => {
            return dataGovApi.baseUrl + dataGovApi.paths.package_search + `?q=${term}` + `&rows=${dataGovApi.MAXROWS}` + `&start=${element}`
        })
        return apiRequests
    } catch(err) {
        console.log(err)
        console.log('Error connecting to data.gov API')
    }
}

retrieveResults('EXCEL')