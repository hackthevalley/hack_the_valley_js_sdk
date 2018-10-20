class HackerApplicationController {
    constructor(app){
        this.app = app;
        this.create = this.create.bind(this);
        this.updateQuestion = this.updateQuestion.bind(this);
    }

    /**
     * Create a new hacker hacker application, return hacker application ID if successful
     * @param application_id
     * @returns {Promise<any>}
     */
    create(application_id){
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation createHackerApplication($application_id: String!) {
                    createHackerApplication(application_id: $application_id) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                application_id,
            }).then(result => {
                resolve(result.createHackerApplication._id);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Update an existing hacker application
     * @param hacker_application_id
     * @param question_id
     * @param answer
     * @returns {Promise<any>}
     */
    updateQuestion(hacker_application_id, question_id, answer) {
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation updateHackerApplicationAnswer ($hacker_application_id: String!, $question_id: String!, $answer: [String]!) {
                    updateHackerApplicationAnswer(hacker_application_id: $hacker_application_id, question_id: $question_id, answer: $answer) {
                        _id
                    }
                }
            `;
            this.app.getAdaptor().mutate(mutationString, {
                hacker_application_id, question_id, answer
            }).then(result => {
                resolve(result.updateHackerApplicationAnswer._id);
            }).catch(e => {
                reject(e);
            });
        });
    }
}

module.exports = HackerApplicationController;
