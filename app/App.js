const HackTheValleyApolloAdaptor = require('./adaptors/HackTheValleyApolloAdaptor');

// Controllers
const GraphController = require('./controllers/GraphController');

class App {
    /**
     * Construct the App instance
     */
    constructor() {
        this.config = {
            endpoints: require('../config/endpoints')
        };

        this._adaptor = new HackTheValleyApolloAdaptor({
            apolloEndpoint: this.getConfiguration().endpoints.apolloEndpoint
        });

        // Initialize controllers
        this._graphController = new GraphController(this);

        // Expose routes
        this.Graph = {
            query: this._graphController.query
        }
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
}

module.exports = App;
