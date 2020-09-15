import { stubAxiosInstance, stubAxiosNotFound } from '../TestUtils';

import { NotFound } from '@/domain/NotFound';
import { LocalFetcher } from '@/secondary/LocalFetcher';

describe('LocalFetcher', () => {
  it('should raise an error', next => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.get.rejects(stubAxiosNotFound('No file found'));
    const localFetcher = new LocalFetcher(axiosInstance);
    localFetcher.fetch('test.json').catch(error => {
      expect(error).toBeInstanceOf(NotFound);
      expect(error.message).toContain('at the url');
      expect(error.stack).toContain('Caused by');
      expect(error.stack).toContain('No file found');
      next();
    });
  });

  it('should fetch data', async () => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.get.resolves({ data: 'test' });
    const localFetcher = new LocalFetcher(axiosInstance);
    const data = await localFetcher.fetch('test.json');
    expect(axiosInstance.get.getCall(0).args[0]).toBe('test.json');
    expect(data).toBe('test');
  });
});
