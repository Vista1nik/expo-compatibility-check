export default page => {
    if (page.match(`packageName="(.*)"`) && page.match("<PlatformsSection(.*)/>")) {
        return {
            packageName: page.match(`packageName="(.*)"`)[1].includes('"') ? page.match(`packageName="(.*)"`)[1].substring(0, page.match(`packageName="(.*)"`)[1].indexOf('"')) : page.match(`packageName="(.*)"`)[1],
            compatibility: {
                android: page.match("<PlatformsSection(.*)/>")[1].includes('android'),
                ios: page.match("<PlatformsSection(.*)/>")[1].includes('ios'),
                web: page.match("<PlatformsSection(.*)/>")[1].includes('web'),
            }
        }
    }
}