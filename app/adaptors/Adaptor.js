// @flow
/**
 * Class representing a simple network adaptor
 * Author: Jun Zheng
 * License: MIT
 */

class Adaptor {

    config: any = null;

    /**
     * Construct the adaptor
     * @param config
     */
    constructor(config: any) {
        this.config = config;
    }

    /**
     * Run an adaptor request
     * @param config
     */
    run(config: any): any {
        throw new Error("Not implemented");
    }
}

export default Adaptor;