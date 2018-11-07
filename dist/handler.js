'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless v1.0! Your function executed successfully!',
            input: event,
        }),
    };
    callback(null, response);
};
//# sourceMappingURL=handler.js.map