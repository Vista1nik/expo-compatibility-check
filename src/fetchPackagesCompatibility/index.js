import fetchDocumentation from './fetchDocumentation'
import parseDocumentation from './parseDocumentation'

export default async (sdkVersion) => {
    let pages = await fetchDocumentation(sdkVersion).then(pages => pages.map(page => parseDocumentation(page)))

    return pages.filter(Boolean) // Remove pages that can't be parsed
}