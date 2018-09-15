/**
 * Class representing a simple Apollo server link
 * Author: Jun Zheng
 * License: MIT
 */

const SynchronousLink = require('./SynchronousLink');

// apollo-client stuff
const ApolloClient = require('apollo-client').default;
const { InMemoryCache: ApolloInMemoryCache } = require('apollo-cache-inmemory/lib/inMemoryCache');
const { HttpLink: ApolloHttpLink } = require('apollo-link-http/lib/httpLink');
const gql = require('graphql-tag');
const ApolloLinkContext = require('apollo-link-context');

// Node.js does not support ES6 natively
require('cross-fetch/polyfill');


class ApolloLink extends SynchronousLink {

    /**
     * Construct a new ApolloLink
     * @param {string} url
     * @param {object} config = {}
     */
    constructor(url, config = {}) {
        super(url);
        this._headers = {};

        let cache = new ApolloInMemoryCache();

        let link = new ApolloHttpLink({
            uri: url,
            fetch
        });

        if (config.headers) {
            let headersLink = ApolloLinkContext.setContext(() => {
                return {
                    headers: config.headers
                }
            });
            link = headersLink.concat(link);
            this._headers = config.headers;
        }

        this._client = new ApolloClient({
            link,
            cache,
            defaultOptions: {
                query: {
                    fetchPolicy: 'network-only'
                }
            }
        });
        this._link = link;
    }

    /**
     * Alias for run but automatically sets type as query
     * @param config
     * @returns {Promise<Object>}
     */
    query(config){
        return this.run(Object.assign(config, {type: 'query'}));
    }

    /**
     * Alias for run, but automatically sets type as mutation
     * @param config
     * @returns {Promise<Object>}
     */
    mutate(config){
        return this.run(Object.assign(config, {type: 'mutation'}));
    }

    /**
     * Run a new apollo request
     * @param config
     * @returns {Promise<object>}
     */
    run(config) {
        return new Promise((resolve, reject) => {
            const query = gql(config.query);
            // If the type is query, we call the query
            if (config.type === 'query') {
                this._client.query({
                    query,
                    variables: config.variables ? config.variables : {}
                }).then(data => {
                    resolve(data.data);
                }).catch(e => {
                    reject(e);
                })
                // Otherwise, we call the mutation
            } else {
                this._client.mutate({
                    mutation: query,
                    variables: config.variables ? config.variables : {}
                }).then(data => {
                    resolve(data.data);
                }).catch(e => {
                    reject(e);
                })
            }
        });
    }
}

module.exports = ApolloLink;
