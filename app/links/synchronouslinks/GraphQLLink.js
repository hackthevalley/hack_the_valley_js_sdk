// @flow
/**
 * Class representing a simple Apollo server link
 * Author: Jun Zheng
 * License: MIT
 */

import SynchronousLink from "./SynchronousLink";
import {GraphQLClient} from "graphql-request";

export type GraphQLLinkConfiguration = {
    headers: any
};

export type GraphQLLinkRunConfiguration = {
    query: string,
    variables: any
};

export default class GraphQLLink extends SynchronousLink {

    client: GraphQLClient;

    /**
     * Construct a new GraphQLLink.
     */
    constructor(url: string, config: GraphQLLinkConfiguration = {}) {
        super(url);
        this.client = new GraphQLClient(url, {headers: config.headers || {}});
    }

    /**
     * Alias for run.
     */
    async query(config: GraphQLLinkRunConfiguration) {
        return this.run(config);
    }

    /**
     * Alias for run.
     */
    async mutate(config: GraphQLLinkRunConfiguration): any {
        return this.run(config);
    }

    /**
     * Run a new apollo request
     */
    async run(config: GraphQLLinkRunConfiguration): any {
        return await this.client.request(config.query, config.variables || {});
    }
}
