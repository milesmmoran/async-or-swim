import { AxiosError, AxiosResponse } from 'axios';

export interface AsyncResponse<ResponseType> {
  readonly ok: boolean;
  data?: ResponseType;
  error?: AxiosError;
}

export class AsyncSuccessResponse<ResponseType> implements AsyncResponse<ResponseType> {
  readonly ok: true = true;
  data: ResponseType;

  constructor(data: ResponseType) {
    this.data = data;
  }
}

export class AsyncErrorResponse<ResponseType> implements AsyncResponse<ResponseType> {
  readonly ok: false = false;
  error: AxiosError

  constructor(error: any) {
    this.error = error;
  }
}

export const asyncOkErrorDataWrapper = async <ResponseType>(
  asyncFunc: () => Promise<AxiosResponse<ResponseType>>
) => {
  try {
    return Promise.resolve(new AsyncSuccessResponse<ResponseType>((await asyncFunc()).data));
  } catch (error) {
    return Promise.resolve(new AsyncErrorResponse<AxiosError>(error));
  }
};


