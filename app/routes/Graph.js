// @flow

import GraphController from '../controllers/GraphController';

const graphController = new GraphController();

export const Graph = {
    query: graphController.query
};
