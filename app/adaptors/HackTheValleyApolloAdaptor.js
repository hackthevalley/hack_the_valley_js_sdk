/**
 * Network adaptor for Hack the Valley GraphQL
 * Author: Jun Zheng
 * License: MIT
 */

const Adaptor = require('./Adaptor');
const ApolloLink = require('../links/synchronouslinks/ApolloLink');

class HackTheValleyApolloAdaptor extends Adaptor {
    constructor(config){
        super(config);
        this._apolloLink = new ApolloLink(config.apolloEndpoint);
    }

    setAuthenticationToken(token){
        this._apolloLink = new ApolloLink(this._config.apolloEndpoint, {
            headers: {
                authorization: "Bearer " + token
            }
        });
    }

    setApolloEndpoint(url){
        this._apolloLink = new ApolloLink(url);
        this._config.apolloEndpoint = url;
    }

    query(query, variables = {}){
        return this._apolloLink.query({ query, variables });
    }

    mutate(query, variables = {}){
        return this._apolloLink.mutate({ query, variables });
    }
}

module.exports = HackTheValleyApolloAdaptor;
