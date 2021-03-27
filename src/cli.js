import ora from 'ora'

import fetchPackagesCompatibility from './fetchPackagesCompatibility'

export async function cli(args) {
    ora('Fetching packages compatibility information from Expo documentation').start()

    let compatibilityList = await fetchPackagesCompatibility('40.0.0')

    ora('Fetching packages compatibility information from Expo documentation').succeed()

    

    console.log(compatibilityList)
}