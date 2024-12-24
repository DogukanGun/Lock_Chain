declare global {
  namespace Express {
    interface Request {
      web3Provider?: any;
      dataProtector?: any;
      dataProtect?: string;
      wallet: any;
      passwordAddress:string;
    }
  }
}
export { };
