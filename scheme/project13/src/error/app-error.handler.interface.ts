import { RequestOptionsArgs, Response } from '@angular/http';

export interface IAppErrorMessage {
  code: string;
  payload: any[];
}

export interface IAppError {
  success: boolean;
  message: IAppErrorMessage|string;
  error: string;
  exception: string;
  path: string;
  status: number;
  timestamp: number;
}

export class RequestError {

  constructor(
    public response: Response,
    public url: string,
    public options: RequestOptionsArgs
  ) {
  }
}
