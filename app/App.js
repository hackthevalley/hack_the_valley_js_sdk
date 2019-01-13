// @flow
import Adaptor                                  from "./adaptors/Adaptor";
import {Graph, Hacker, HackerApplication, User} from "./routes";
import {CONFIG}                                 from "../config";
import type {Configuration}                     from "../config";
import HackTheValleyGraphQLAdaptor              from "./adaptors/HackTheValleyGraphQLAdaptor";

let instance = null;

export default class App {

    Graph             = Graph;
    Hacker            = Hacker;
    HackerApplication = HackerApplication;
    User              = User;

    token: string;
    adaptor: HackTheValleyGraphQLAdaptor;
    config: Configuration = CONFIG;

    /**
     * Construct the App instance
     */
    constructor() {
        this.adaptor = new HackTheValleyGraphQLAdaptor({
            graphqlEndpoint: this.getConfiguration().endpoints.graphqlEndpoint
        });
    }

    /**
     * Get current configuration.
     * @returns {Object}
     */
    getConfiguration(): Configuration {
        return this.config;
    }

    /**
     * Get current adaptor.
     * @returns {Adaptor}
     */
    getAdaptor(): HackTheValleyGraphQLAdaptor {
        return this.adaptor;
    }

    /**
     * Set authentication token to passed to server
     * @param {string} token
     */
    setAuthenticationToken(token: string): void {
        this.token = token;
        (this.adaptor: HackTheValleyGraphQLAdaptor).setAuthenticationToken(token);
    }

    /**
     * Get current authentication token.
     * @returns {null|string}
     */
    getAuthenticationToken(): ?string {
        return this.token;
    }

    /**
     * Get App singleton instance.
     * @returns {App}
     */
    static getInstance(): App {
        if (!instance) instance = new App();
        return instance;
    }
}
