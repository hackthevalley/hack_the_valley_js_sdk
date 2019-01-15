// @flow
import App from "../App";

export default class GraphController {
    /**
     * Query the graph.
     */
    query(query: string, variables: any = {}): Promise<any> {
        return App.getInstance().getAdaptor().query(query, variables);
    }
}
