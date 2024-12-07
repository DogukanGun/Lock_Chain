declare global {
  namespace Express {
    interface Request {
      web3Provider?: any;
      dataProtector?: any;
      dataProtect?: string;
    }
  }
}
export { };
