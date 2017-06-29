import { MadlibsPage } from './app.po';

describe('madlibs App', () => {
  let page: MadlibsPage;

  beforeEach(() => {
    page = new MadlibsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
