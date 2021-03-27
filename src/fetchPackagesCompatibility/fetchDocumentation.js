import axios from "axios";
import Queue from "promise-queue";

export default async (sdkVersion) => {
    const queue = new Queue(4, Infinity);

    const documentationPagesURLS = await    axios
                                            .get(
                                                `https://api.github.com/repos/expo/expo/contents/docs/pages/versions/v${sdkVersion}/sdk`
                                            )
                                            .then((res) => res.data)

    const documentationPages = await        Promise.all(
                                                documentationPagesURLS.map((file) => {
                                                    return  queue.add(() => {
                                                                return axios.get(file.download_url);
                                                            });
                                                })
                                            )
                                            .then(arrayOfRes => arrayOfRes.map(res => res.data))

    return documentationPages
}
