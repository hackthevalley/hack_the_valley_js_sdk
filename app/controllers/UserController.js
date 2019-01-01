class UserController {
    constructor(app){
        this.app = app;
    }

    /**
     * Create a new user token
     * @param username
     * @param password
     * @param expire_after
     * @returns {Promise<any>}
     */
    createToken = async (username, password, expire_after = 86400) => {
        let result = await this.app.getAdaptor().mutate(`
            mutation createUserToken ($username: String!, $password: String!, $expire_after: Int) {
                createUserToken(username: $username, password: $password, expire_after: $expire_after) {
                    token_body
                }
            }
        `, {
            username, password, expire_after
        });
        return result.createUserToken.token_body;
    }

}

module.exports = UserController;
