// @flow
import App from "../App";

export default class UserController {

    /**
     * Create a new user token.
     */
    createToken = async (username: string, password: string, expireAfter: number = 86400) => {
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
