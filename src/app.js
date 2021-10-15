const network = require('./network')
const dataClass = require('./data')

async function startApp() {
    const unparsedApiReturn = await network.retrieveResults('EXCEL') // Change this to your desired search term
    const dataStore = new dataClass.Data(unparsedApiReturn)
    const rawUrls = dataStore.getXlsUrls()
    await network.downloadFile(rawUrls)
}

startApp()