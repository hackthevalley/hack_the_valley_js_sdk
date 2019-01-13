// @flow
/**
 * Class representing a network link that has request/response structure
 * Author: Jun Zheng
 * License: MIT
 */

import Link from "../Link";

export default class SynchronousLink extends Link {

    type: string = "sync";

    constructor(url: string) {
        super(url);
    }
}
