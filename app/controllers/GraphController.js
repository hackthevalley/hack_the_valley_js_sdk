/**
 * Controller for the graph, used to query stuff :)
 * Author: Jun Zheng
 * License: MIT
 */

class GraphController {
    constructor(app){
        this.app = app;
        this.query = this.query.bind(this);
    }

    /**
     * Query the graph
     * @param query
     * @param variables
     */
    query(query, variables = {}){
        return this.app.getAdaptor().query(query, variables);
    }
}

module.exports = GraphController;
