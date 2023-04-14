import { LocaleMiddleware } from './locale.middleware';

describe('LocaleMiddleware', () => {
  it('should be defined', () => {
    expect(new LocaleMiddleware())
      .toBeDefined();
  });
});
