// @flow
/**
 * Class representing a network link
 * Author: Jun Zheng
 * License: MIT
 */

export default class Link {

    url: ?string = null;

    /**
     * Initialize the link with an URL
     * @param url
     */
    constructor(url: string) {
        this.url = url;
    }


    /**
     * Run a request
     * @param config
     */
    run(config: any) {
        throw new Error("Not implemented");
    }
}

