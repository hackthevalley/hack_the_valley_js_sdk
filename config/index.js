// @flow

import {ENDPOINTS}                   from "./endpoints";
import type {EndpointsConfiguration} from "./endpoints";

export const CONFIG = {
    endpoints: ENDPOINTS
};

export type Configuration = {
    endpoints: EndpointsConfiguration
}