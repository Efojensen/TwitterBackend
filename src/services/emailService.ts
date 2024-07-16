import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { error } from "console";
require ('dotenv').config();

const ses = new SESClient({
    region: 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
});

function createSendEmailCommand(toAddress: string, fromAddress: string, message: string){
    return new SendEmailCommand({
        Destination: {
            ToAddresses: [toAddress],
        },
        Source: fromAddress,
        Message: {
            Subject: {
                Charset: 'UTF-8',
                Data: "Your one time password"
            },
            Body: {
                Text: {
                    Charset: 'UTF-8',
                    Data: message
                }
            },
        }
    })
}

export async function sendEmailToken(email: string, token: string){
    console.log("email: ", email, token);

    const message = `Your one time password: ${token}`
    const command = createSendEmailCommand(email, "sedemadjei419@gmail.com", message)

    try{
        return await ses.send(command);
    }catch (e){
        console.log("Error sending email", e);
        return error;
    }
}
