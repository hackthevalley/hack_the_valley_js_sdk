// @flow
import App from "../App";

export default class HackerApplicationController {
    /**
     * Create a new hacker hacker application, return hacker application ID if successful
     */
    create = async (applicationID: string) => {
        return (await App.getInstance().getAdaptor().mutate(`
            mutation ($applicationID: String!) {
                createHackerApplication(application_id: $applicationID) {
                    _id
                }
            }
        `, {
            applicationID,
        })).createHackerApplication._id;
    };

    /**
     * Update an existing hacker application.
     */
    updateQuestion = async (hackerApplicationID: string, questionID: string, answer: string[]) => {
        return (await App.getInstance().getAdaptor().mutate(`
            mutation ($hackerApplicationID: String!, $questionID: String!, $answer: [String]!) {
                updateHackerApplicationAnswer(hacker_application_id: $hackerApplicationID, question_id: $questionID, answer: $answer) {
                    _id
                }
            }
        `, {
            hackerApplicationID, questionID, answer
        })).updateHackerApplicationAnswer._id;
    };

    /**
     * Mark an application as submitted
     */
    submit = async (hackerApplicationID: string) => {
        return (await App.getInstance().getAdaptor().mutate(`
            mutation ($hackerApplicationID: String!) {
                submitHackerApplication(hacker_application_id: $hackerApplicationID) {
                    _id
                }
            }
        `, {
            hackerApplicationID
        })).submitHackerApplication._id;
    }
}
