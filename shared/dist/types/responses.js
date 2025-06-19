"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSuccessResponse = isSuccessResponse;
exports.isErrorResponse = isErrorResponse;
// Type guard functions
function isSuccessResponse(response) {
    return response.success === true && response.data !== null;
}
function isErrorResponse(response) {
    return response.success === false && response.error !== undefined;
}
