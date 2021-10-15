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

async function retrieveUrlsFromPackages (searchTerm) {
    try {
        var start = 0
        var response = await axios.get(dataGovApi.baseUrl + dataGovApi.paths.package_search + `?q=${searchTerm}` + `&rows=1000` + `&start=${start}`)
        var resultCount = await response.data.result.count
        console.log(response.data)
    } catch(err) {

    }
}

async function generateApiRequests(term) {
    try {
        var startValues = []
        var start = 0
        var init = await axios.get(dataGovApi.baseUrl + dataGovApi.paths.package_search + `?q=${term}`)
        var resultCount = await init.data.result.count
        for (let i = 0; i < resultCount; i+= dataGovApi.MAXROWS) {
            startValues.push(i)
        }
        console.log(startValues)
        const apiRequests = startValues.map((element) => {
            return dataGovApi.baseUrl + dataGovApi.paths.package_search + `?q=${term}` + `&rows=${dataGovApi.MAXROWS}` + `&start=${element}`
        })
        console.log(apiRequests)
    } catch(err) {
        console.log(err)
        console.log('Error connecting to data.gov API')
    }
}

generateApiRequests('EXCEL')