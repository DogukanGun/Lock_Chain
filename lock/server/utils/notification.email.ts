import { Web3SignerProvider } from '@iexec/dataprotector';
import { IExecWeb3mail } from '@iexec/web3mail';


export const sendMessage = async (
    web3Provider: Web3SignerProvider,
    protectedDataAddress: string,
    userWalletAddress: string
) => {
    const web3mail = new IExecWeb3mail(web3Provider);

    const sendEmail = await web3mail.sendEmail({
        protectedData: protectedDataAddress,
        emailSubject: 'Door is opened',
        emailContent: `The user ${userWalletAddress} opened the door,now he/she is at the home. `,
    });
    console.log(`The email is sent. The task id is ${sendEmail.taskId}`)
}