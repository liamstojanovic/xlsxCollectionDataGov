class Data {
    constructor(dataArr) {
        this.unparsedData = dataArr
    }
    

    getXlsUrls () {
        var urls = []
        for (let i = 0; i < this.unparsedData.length; i++) { // Make this a for of loop
            for (let results of this.unparsedData[i].result.results) {
                for (let resources of results.resources) {
                    if (resources.format == 'XLS') {
                        var extension = resources.url.slice(-4).toLowerCase()
                        if (extension == 'xlsx' || extension == '.xls' && resources.url !== null) { // Ensure file extension matches one of these two.
                            urls.push(resources.url)
                        }
                    }
                }
            }
        }
        return urls
    }
}

module.exports = {
    Data
}