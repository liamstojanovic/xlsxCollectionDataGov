const network = require('./network')
const dataClass = require('./data')

async function startApp() {
    const unparsedApiReturn = await network.retrieveResults('EXCEL')
    const dataStore = new dataClass.Data(unparsedApiReturn)
    console.log(dataStore.getXlsCount())
}

startApp()