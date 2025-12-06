const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Index HTML Structure', () => {
  let dom;
  let document;
    beforeAll(() => {
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  test('should have a div with id "historyContent"', () => {
    const historyContentDiv = document.getElementById('historyContent');
    expect(historyContentDiv).not.toBeNull();
  });
});