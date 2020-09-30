import sinon from 'sinon';

import { FileDownloader } from '@/primary/FileDownloader';

const stubWindow = () => ({
  URL: { createObjectURL: sinon.stub(), revokeObjectURL: sinon.stub() },
  document: { createElement: sinon.stub(), body: { appendChild: sinon.stub(), removeChild: sinon.stub() } },
});

const stubLink = () => ({
  href: '',
  click: sinon.stub(),
  download: '',
});

describe('FileDownloader', () => {
  it('should download', () => {
    const windowStub = stubWindow();
    const link = stubLink();
    windowStub.document.createElement.returns(link);

    const fileDownloader = new FileDownloader(windowStub as any);
    fileDownloader.download('test.png', '', 'image/png');

    expect(windowStub.document.body.appendChild.calledOnce).toBeTruthy();
    expect(windowStub.document.body.removeChild.calledOnce).toBeTruthy();
    expect(windowStub.document.createElement.calledOnce).toBeTruthy();
    expect(windowStub.URL.createObjectURL.calledOnce).toBeTruthy();
    expect(windowStub.URL.revokeObjectURL.calledOnce).toBeTruthy();
    expect(link.click.calledOnce).toBeTruthy();
    expect(link.download).toBe('test.png');
  });
});
