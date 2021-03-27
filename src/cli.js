import ora from 'ora'
import fs from 'fs/promises'
import process from 'process'

import fetchPackagesCompatibility from './fetchPackagesCompatibility'

export async function cli(args) {
    let packageJSON = await fs.readFile(`${process.cwd()}/package.json`).then(data => JSON.parse(data))

    let spinner = ora('Fetching packages compatibility information from Expo documentation')

    spinner.start()
    let compatibilityList = await fetchPackagesCompatibility(packageJSON.dependencies.expo.replace(/[^a-zA-Z0-9.]/g, ''))
    spinner.succeed()

    let uncompatibleWithAndroid = []
    let uncompatibleWithIOS = []
    let uncompatibleWithWeb = []

    let cantCheckCompatibility = []
    
    Object.keys(packageJSON.dependencies).forEach(packageName => {
        let compatibilityData = compatibilityList.find(data => data.packageName === packageName)

        if (compatibilityData) {
            if (!compatibilityData.compatibility.android) {
                uncompatibleWithAndroid.push(packageName)
            }
    
            if (!compatibilityData.compatibility.ios) {
                uncompatibleWithIOS.push(packageName)
            }
    
            if (!compatibilityData.compatibility.web) {
                uncompatibleWithWeb.push(packageName)
            }
        } else {
            if (
                packageName !== 'expo' 
                && packageName !== 'react' 
                && packageName !== 'react-dom' 
                && packageName !== 'react-native' 
                && packageName !== 'react-native-web'
            ) {
                cantCheckCompatibility.push(packageName)
            }
        }
    })

    console.log(`Uncompatible with Android:`)
    uncompatibleWithAndroid.forEach(packageName => console.log(`- ${packageName}`))

    console.log(`Uncompatible with IOS:`)
    uncompatibleWithIOS.forEach(packageName => console.log(`- ${packageName}`))

    console.log(`Uncompatible with Web:`)
    uncompatibleWithWeb.forEach(packageName => console.log(`- ${packageName}`))

    console.log(`Can't check:`)
    cantCheckCompatibility.forEach(packageName => console.log(`- ${packageName}`))

    process.exit()
}