// @flow
import {CONFIG}                    from "../config";
import type {Configuration}        from "../config";
import HackTheValleyGraphQLAdaptor from "./adaptors/HackTheValleyGraphQLAdaptor";
import FileController              from "./controllers/FileController";
import GraphController             from "./controllers/GraphController";
import HackerController            from "./controllers/HackerController";
import HackerApplicationController from "./controllers/HackerApplicationController";
import UserController              from "./controllers/UserController";

let instance = null;

/**
 * Main entry point
 */
export default class App {

    Graph: GraphController                         = new GraphController();
    Hacker: HackerController                       = new HackerController();
    HackerApplication: HackerApplicationController = new HackerApplicationController();
    User: UserController                           = new UserController();
    File: FileController                           = new FileController();

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
     */
    getConfiguration(): Configuration {
        return this.config;
    }

    /**
     * Get current adaptor.
     */
    getAdaptor(): HackTheValleyGraphQLAdaptor {
        return this.adaptor;
    }

    /**
     * Set authentication token to passed to server
     */
    setAuthenticationToken(token: string): void {
        this.token = token;
        (this.adaptor: HackTheValleyGraphQLAdaptor).setAuthenticationToken(token);
    }

    /**
     * Get current authentication token.
     */
    getAuthenticationToken(): ?string {
        return this.token;
    }

    /**
     * Get App singleton instance.
     */
    static getInstance(): App {
        if (!instance) instance = new App();
        return instance;
    }
}
