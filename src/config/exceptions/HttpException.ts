class HttpException extends Error {
    status: number;
    error: any;
    constructor(status: number, error: any) {
      super(error);
      this.status = status;
      this.error = error;
    }
  }
   
  export default HttpException;