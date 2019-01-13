// @flow

import HackerApplicationController from "../controllers/HackerApplicationController";

const hackerApplicationController = new HackerApplicationController();

export const HackerApplication = {
    create: hackerApplicationController.create,
    updateQuestion: hackerApplicationController.updateQuestion,
    submit: hackerApplicationController.submit
};
