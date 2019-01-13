// @flow
/**
 * Network adaptor for Hack the Valley GraphQL
 * Author: Jun Zheng
 * License: MIT
 */

import Adaptor                       from "./Adaptor";
import GraphQLLink                   from "../links/synchronouslinks/GraphQLLink";
import type {EndpointsConfiguration} from "../../config/endpoints";

export default class HackTheValleyGraphQLAdaptor extends Adaptor {

    link: GraphQLLink;

    constructor(config: EndpointsConfiguration) {
        super(config);
        this.link = new GraphQLLink(config.graphqlEndpoint);
    }

    setAuthenticationToken(token: string) {
        this.link = new GraphQLLink(this.config.graphqlEndpoint, {
            headers: {
                authorization: "Bearer " + token
            }
        });
    }

    setGraphQLEndpoint(url: string) {
        this.link                   = new GraphQLLink(url);
        this.config.graphqlEndpoint = url;
    }

    query(query: string, variables: any = {}) {
        return this.link.query({query, variables});
    }

    mutate(query: string, variables: any = {}) {
        return this.link.mutate({query, variables});
    }
}
