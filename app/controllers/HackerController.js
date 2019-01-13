// @flow
import App                      from "../App";
import type {UpdateHackerInput} from "../../flow/graphql/UpdateHackerInput";

export default class HackerController {
    /**
     * Create a new hacker, return hacker ID if successful.
     */
    create = async (emailAddress: string, password: string) => {
        return await (App.getInstance().getAdaptor().mutate(`
            mutation ($emailAddress: String!, $password: String!) {
                createHacker(email_address: $email_address, password: $password) {
                    _id
                }
            }
        `, {
            emailAddress, password
        })).createHacker._id;
    };

    /**
     * Create a new hacker token.
     */
    createToken = async (emailAddress: string, password: string, expireAfter: number = 86400) => {
        return (await App.getInstance().getAdaptor().mutate(`
            mutation ($emailAddress: String!, $password: String!, $expireAfter: Int) {
                createHackerToken(email_address: $emailAddress, password: $password, expire_after: $expireAfter) {
                    token_body
                }
            }
        `, {
            emailAddress, password, expireAfter
        })).createHackerToken.token_body;
    };

    /**
     * Update an existing hacker.
     */
    update = async (id: string, hacker: UpdateHackerInput) => {
        return (await App.getInstance().getAdaptor().mutate(`
            mutation ($id: String!, $hacker: UpdateHackerInput!) {
                updateHacker(id: $id, hacker: $hacker) {
                    _id
                }
            }
        `, {
            id, hacker
        })).updateHacker._id;
    };

    /**
     * Send password reset email to hacker.
     */
    sendPasswordResetEmail = async (emailAddress: string) => {
        return (await App.getInstance().getAdaptor().mutate(`
            mutation sendHackerPasswordResetEmail ($emailAddress: String!) {
                sendHackerPasswordResetEmail(email_address: $emailAddress)
            }
        `, {
            emailAddress
        })).sendHackerPasswordResetEmail;
    };

    /**
     * Reset hacker's password using reset code.
     */
    resetPassword = async (emailAddress: string, code: string, newPassword: string) => {
        return (await App.getInstance().getAdaptor().mutate(`
            mutation ($emailAddress: String!, $code: String!, $newPassword: String!) {
                resetHackerPassword (email_address: $emailAddress, code: $code, new_password: $newPassword) {
                    _id
                }
            }
        `, {
            emailAddress, code, newPassword
        })).resetHackerPassword._id;
    }
}
