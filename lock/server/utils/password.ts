
import { IExecDataProtector, ProtectedDataWithSecretProps } from '@iexec/dataprotector';

export const generatePassword = async (dataProtector: IExecDataProtector): Promise<ProtectedDataWithSecretProps> => {
    const res = await dataProtector.core.protectData({
        data: {
            password: makePassword(8),
        },
    });
    console.log("Password is generated")
    await dataProtector.sharing.setProtectedDataToRenting({
                protectedData: res.address,
                price: 1,
                duration: 60 * 60 * 24 * 30,
            });
    console.log("Password is set to renting")
    return res
}

const makePassword = (length:number):string => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}