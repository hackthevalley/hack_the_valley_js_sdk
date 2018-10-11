const HackTheValleyApolloAdaptor = require('./adaptors/HackTheValleyApolloAdaptor');

// Controllers
const GraphController = require('./controllers/GraphController');
const HackerController = require('./controllers/HackerController');

class App {
    /**
     * Construct the App instance
     */
    constructor() {
        this._token = null;

        this.config = {
            endpoints: require('../config/endpoints')
        };

        this._adaptor = new HackTheValleyApolloAdaptor({
            apolloEndpoint: this.getConfiguration().endpoints.apolloEndpoint
        });

        // Initialize controllers
        this._graphController = new GraphController(this);
        this._hackerController = new HackerController(this);

        // Expose routes
        this.Graph = {
            query: this._graphController.query
        };

        this.Hacker = {
            create: this._hackerController.create,
            update: this._hackerController.update,
            createToken: this._hackerController.createToken
        };
    }

    /**
     * Get current configuration
     * @returns {{endpoints: ({apolloEndpoint: string}|{apolloEndpoint})}|*}
     */
    getConfiguration() {
        return this.config;
    }

    /**
     * Get current adaptor
     * @returns {HackTheValleyApolloAdaptor}
     */
    getAdaptor() {
        return this._adaptor;
    }

    /**
     * Set authentication token to passed to server
     * @param token
     */
    setAuthenticationToken(token) {
        this._token = token;
        this._adaptor.setAuthenticationToken(token);
    }

    /**
     * Get current authentication token
     * @returns {null|string}
     */
    getAuthenticationToken() {
        return this._token;
    }
}

module.exports = App;
