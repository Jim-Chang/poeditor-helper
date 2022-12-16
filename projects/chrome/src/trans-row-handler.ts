import { JqEle } from './define';
import { getCnTranslation } from './translation';
import * as $ from 'jquery';

// for po_edit page
export class TransRowHandler {
  private rowsEle: JqEle;

  constructor() {
    this.rowsEle = $('div[id*="row-term-"]');
  }

  handle(): void {
    this.rowsEle.each((_, htmlEle) => {
      const ele = $(htmlEle);
      // if enable reference language, then we can get zh_TW from reference
      if (ele.find('.reference_language').length > 0) {
        this.addTwToCnTransBtn(ele);
      }
    });
  }

  private addTwToCnTransBtn(ele: JqEle): void {
    // create trans btn
    const btn = $('<button class="po-edit-btn">繁轉簡</button>');

    // create trans btn click event handler
    btn.on('click', () => {
      // get zh_TW from ref string
      const twText = ele.find('span[id*="reference"]').html();
      console.log(`Find zh_TW string: ${twText}`);

      const cnText = getCnTranslation(twText);
      console.log(`translation CN: ${cnText}`);

      // click zh_Hans edit region and set value
      ele.find('div[id*="textonly"').trigger('click');
      ele.find('textarea').val(cnText);
    });

    ele.find('.reference_language').append(btn);
  }
}
