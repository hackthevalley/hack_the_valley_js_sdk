// @flow
import App from "../App";

export default class UserController {

    /**
     * Create a new user token.
     */
    async createToken(username: string, password: string, expireAfter: number = 86400): Promise<string> {
        return (await App.getInstance().getAdaptor().mutate(`
            mutation ($username: String!, $password: String!, $expireAfter: Int) {
                createUserToken(username: $username, password: $password, expire_after: $expireAfter) {
                    token_body
                }
            }
        `, {
            username, password, expireAfter
        })).createUserToken.token_body;
    }

}
