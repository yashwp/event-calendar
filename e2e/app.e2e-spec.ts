import { EventCalendarPage } from './app.po';

describe('event-calendar App', () => {
  let page: EventCalendarPage;

  beforeEach(() => {
    page = new EventCalendarPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
