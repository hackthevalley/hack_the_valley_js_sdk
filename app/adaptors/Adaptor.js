// @flow
export default class Adaptor {

    config: any = null;

    /**
     * Construct the adaptor
     */
    constructor(config: any) {
        this.config = config;
    }

    /**
     * Run an adaptor request
     */
    run(config: any): any {
        throw new Error("Not implemented");
    }
}
