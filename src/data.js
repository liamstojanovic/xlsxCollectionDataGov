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
                        urls.push(resources.url)
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