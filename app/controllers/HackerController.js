class HackerController {
    constructor(app){
        this.app = app;
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
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

    /**
     * Update an existing hacker
     * @param id
     * @param hacker
     * @returns {Promise<any>}
     */
    update(id, hacker) {
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation updateHacker ($id: String!, $hacker: UpdateHackerInput!) {
                    updateHacker(id: $id, hacker: $hacker) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                id, hacker
            }).then(result => {
                resolve(result.updateHacker._id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    sendPasswordResetEmail = async (email_address) => {
        let result = await this.app.getAdaptor().mutate(`
            mutation sendHackerPasswordResetEmail ($email_address: String!) {
                sendHackerPasswordResetEmail(email_address: $email_address)
            }
        `, {
            email_address
        });
        return result.sendHackerPasswordResetEmail;
    };

    resetPassword = async (email_address, code, new_password) => {
        let result = await this.app.getAdaptor().mutate(`
            mutation resetHackerPassword ($email_address: String!, $code: String!, $new_password: String!) {
                resetHackerPassword (email_address: $email_address, code: $code, new_password: $new_password) {
                    _id
                }
            }
        `, {
            email_address, code, new_password
        });
        return result.resetHackerPassword._id;
    }

}

module.exports = HackerController;
