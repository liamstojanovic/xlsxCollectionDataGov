const dataGovApi = require('./shared/dataGov')
const axios = require('axios').default;

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

async function searchPackages (searchTerm) {
    try {
        var response = await axios.get(dataGovApi.baseUrl + dataGovApi.paths.package_search + `?q=${searchTerm}`)
        var resultCount = await response.data.result.count
        console.log(response.data.result)
    } catch(err) {
        console.log('Error connecitng to data.gov API')
        console.log(err)
    }
}

searchPackages('EXCEL')