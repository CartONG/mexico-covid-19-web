import sinon, { SinonStub } from 'sinon';

import { AxiosError, AxiosInstance } from 'axios';

export interface AxiosInstanceStub extends AxiosInstance {
  get: SinonStub;
  put: SinonStub;
  post: SinonStub;
  delete: SinonStub;
}

export const stubAxiosInstance = (): AxiosInstanceStub =>
  ({
    get: sinon.stub(),
    put: sinon.stub(),
    post: sinon.stub(),
    delete: sinon.stub(),
  } as any);

export const stubAxiosNotFound = (message: string): AxiosError =>
  ({
    status: 404,
    message,
    stack: `NotFound: ${message}`,
  } as any);
