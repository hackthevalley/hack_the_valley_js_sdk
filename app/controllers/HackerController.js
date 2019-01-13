// @flow
import App                      from "../App";
import type {UpdateHackerInput} from "../../flow/graphql/UpdateHackerInput";

export default class HackerController {
    /**
     * Create a new hacker, return hacker ID if successful.
     */
    async create(emailAddress: string, password: string): Promise<string> {
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
    async createToken(emailAddress: string, password: string, expireAfter: number = 86400): Promise<string> {
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
    async update(id: string, hacker: UpdateHackerInput): Promise<string> {
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
    async sendPasswordResetEmail(emailAddress: string): Promise<string> {
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
    async resetPassword(emailAddress: string, code: string, newPassword: string): Promise<string> {
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
