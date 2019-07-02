import { expect } from '@open-wc/testing';

import '../src/location-picker.js';

describe('Location Picker', () => {
  describe('Popup Modal', () => {
    it('should hide the modal by default', () => {
      expect(true).to.be.false;
    });

    it('should take up the full screen when toggled', () => {
      expect(true).to.be.false;
    });

    it("should apply a 'visible' class to the modal when toggled", () => {
      expect(true).to.be.false;
    });

    it('should display when the form input is in focus', () => {
      expect(true).to.be.false;
    });

    it('should hide when the form input is blurred', () => {
      expect(true).to.be.false;
    });

    it('should hide when the modal close button is pressed', () => {
      expect(true).to.be.false;
    });

    it('should hide when an options from the list has been selected', () => {
      expect(true).to.be.false;
    });
  });
});
// it('is false by default', async () => {
//   const el = await fixture('<get-result></get-result>');
//   expect(el.success).to.be.false;
// });

// it('false values will have a light-dom of <p>NOPE</p>', async () => {
//   const el = await fixture('<get-result></get-result>');
//   expect(el).dom.to.equal('<get-result><p>NOPE</p></get-result>');
// });

// it('true values will have a light-dom of <p>YEAH</p>', async () => {
//   const foo = 1;
//   const el = await fixture(html`<get-result .success=${foo === 1}></get-result>`);
//   expect(el.success).to.be.true;
//   expect(el).dom.to.equal('<get-result><p>YEAH</p></get-result>');
// });
