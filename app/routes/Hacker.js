//@flow

import HackerController from "../controllers/HackerController";

const hackerController = new HackerController();

export const Hacker = {
    create: hackerController.create,
    update: hackerController.update,
    createToken: hackerController.createToken,
    sendPasswordResetEmail: hackerController.sendPasswordResetEmail,
    resetPassword: hackerController.resetPassword
};
