class HackerController {
    constructor(app){
        this.app = app;
        this.create = this.create.bind(this);
        this.createToken = this.createToken.bind(this);
    }

    /**
     * Create a new hacker, return hacker ID if successful
     * @param email_address
     * @param password
     * @returns {Promise<any>}
     */
    create(email_address, password){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation createHacker ($email_address: String!, $password: String!) {
                    createHacker(email_address: $email_address, password: $password) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                email_address, password
            }).then(result => {
                resolve(result.createHacker._id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Create a new hacker token
     * @param email_address
     * @param password
     * @param expire_after
     * @returns {Promise<any>}
     */
    createToken(email_address, password, expire_after = 86400) {
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation createHackerToken ($email_address: String!, $password: String!, $expire_after: Int) {
                    createHackerToken(email_address: $email_address, password: $password, expire_after: $expire_after) {
                        token_body
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                email_address, password, expire_after
            }).then(result => {
                resolve(result.createHackerToken.token_body);
            }).catch(e => {
                reject(e);
            });
        });
    }

}

module.exports = HackerController;
