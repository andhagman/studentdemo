import { lambdaHttpHandler } from '../../../utils/lambdaUtils';
import * as AWS from 'aws-sdk';
import * as joi from 'joi';
import { validateOrThrow } from '../../../utils/validationUtils'

const schema: joi.SchemaLike = joi.object().keys({
    email: joi.string().required(),
    password: joi.string().required(),
});

const cognitoProvider = new AWS.CognitoIdentityServiceProvider();

export const handler = lambdaHttpHandler(async (event) => {
    const body = JSON.parse(event.body);
    validateOrThrow(body, schema);

    const { email, password } = body;
    const res = await register(email, password);
    // await confirm(res.UserSub);

    return {
        statusCode: 200,
        response: res
    }
});

export const register = async (email: string, password: string): Promise<AWS.CognitoIdentityServiceProvider.SignUpResponse> => {

    const params: AWS.CognitoIdentityServiceProvider.SignUpRequest = {
        ClientId: process.env.UserPoolClientId,
        Password: password,
        Username: email,
        UserAttributes: [
            {
                Name: 'email',
                Value: email
            }
        ],
    };


    const res = await cognitoProvider.signUp(params).promise()

    return res;
}

// export const confirm = async (username: string) => {

//     const confirmation = await cognitoProvider.adminConfirmSignUp({
//         Username: username,
//         UserPoolId: process.env.UserPoolId,
//     })

//     console.log(confirmation);

// }