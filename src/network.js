const dataGovApi = require('./shared/dataGov')
const axios = require('axios').default;
const fs = require('fs')
const Path = require('path')

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
            console.log(`Fetching remote resource from catalog.data.gov, ${Math.round((index / totalRequests) * 100)}% complete (${index}/${totalRequests}) `)
            var response = await axios.get(value)
            results.push(response.data)
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

async function downloadFile(urls) {
    var failedFiles = 0
    var filterFileName = /[^/\\&\?]+\.\w{3,4}(?=([\?&].*$|$))/
    var promises = []
    for (const [index, value] of urls.entries()) {
        // var protocol = value.slice(4)
        var percentComplete = Math.round(((index - failedFiles) / urls.length) * 100)
        console.log(`${percentComplete}% complete. (${index - failedFiles}/${urls.length})`)
        try {
            const path = Path.resolve('collection', value.match(filterFileName)[0])
            const response = await axios({
                method: 'GET',
                url: value,
                responseType: 'stream'
            })
            response.data.pipe(fs.createWriteStream(path))
            const downloadStatus = new Promise((resolve, reject) => {
                response.data.on('end', () => {
                    resolve()
                })
    
                response.data.on('error', () => {
                    reject()
                })
            })
            promises.push(downloadStatus)
        } catch(err) {
            console.log('Could not fetch file from URL ' + value)
            failedFiles += 1
        }

        // const file = fs.createWriteStream(`./collection/${value.match(filterFileName)}`)

    }
    console.log(`Finished downloading ` + urls.length + ` files.`)
    console.log(`Failed to download ${failedFiles} out of ${urls.length}`)
    return promises
}

module.exports = {
    retrieveResults,
    downloadFile
}

// retrieveResults('EXCEL')

