import { JqEle } from './define';
import { getCnTranslation, getTwTranslation, isPureText } from './translation';
import * as $ from 'jquery';

// for terms_edit page
export class TermsRowHandler {
  private rowsEle: JqEle;

  constructor(rootEle: JqEle) {
    this.rowsEle = rootEle.find('div[class="row mx-0 position-relative"]');
  }

  addTwToCnTransBtn(): void {
    // create trans btn
    const btn = $('<button class="po-terms-btn">繁轉簡</button>');

    // create trans btn click event handler
    btn.on('click', () => {
      const twText = this.getTwText();
      if (twText) {
        this.clickCnEditArea();

        const cnText = getCnTranslation(twText);
        console.log(`translation CN: ${cnText}`);
        if (cnText) {
          this.setCnText(cnText);
        }
      }
    });

    if (this.cnTransRow) {
      this.cnTransRow.find('div').eq(0).prepend(btn);
    }
  }

  addCnToTwTransBtn(): void {
    // create trans btn
    const btn = $('<button class="po-terms-btn">簡轉繁</button>');

    // create trans btn click event handler
    btn.on('click', () => {
      const cnText = this.getCnText();
      if (cnText) {
        this.clickTwEditArea();

        const twText = getTwTranslation(cnText);
        console.log(`translation TW: ${twText}`);
        if (twText) {
          this.setTwText(twText);
        }
      }
    });

    if (this.twTransRow) {
      this.twTransRow.find('div').eq(0).prepend(btn);
    }
  }

  private get cnTransRow(): JqEle | null {
    return this.findTransRow('zh-Hans');
  }

  private get twTransRow(): JqEle | null {
    return this.findTransRow('zh-TW');
  }

  private get cnEditArea(): JqEle | null {
    return this.findEditArea(this.cnTransRow);
  }

  private get twEditArea(): JqEle | null {
    return this.findEditArea(this.twTransRow);
  }

  private findTransRow(lang: string): JqEle | null {
    let index = null;
    this.rowsEle.each((i) => {
      const row = this.rowsEle.eq(i);
      if (row.find(`span[title*="${lang}"], span[aria-label*="${lang}"]`).length > 0) {
        index = i;
      }
    });
    if (index === null) {
      console.log('can not find trans row', lang);
    }
    return index !== null ? this.rowsEle.eq(index) : null;
  }

  private findEditArea(row: JqEle | null): JqEle | null {
    if (row !== null) {
      return row.find('.js-edit-area');
    }
    return null;
  }

  private getCnText(): string | null {
    if (this.cnEditArea) {
      const text = this.cnEditArea.html();
      console.log(`Find zh_Hans string: ${text}`);
      return isPureText(text) ? text : null;
    }
    return null;
  }

  private getTwText(): string | null {
    if (this.twEditArea) {
      const text = this.twEditArea.html();
      console.log(`Find zh_TW string: ${text}`);
      return isPureText(text) ? text : null;
    }
    return null;
  }

  private setCnText(text: string): void {
    if (this.cnEditArea) {
      const cnTextInput = this.cnEditArea.find('textarea');
      cnTextInput.val(text);
    } else {
      console.log('cnEditArea not found');
    }
  }

  private setTwText(text: string): void {
    if (this.twEditArea) {
      const twTextInput = this.twEditArea.find('textarea');
      twTextInput.val(text);
    } else {
      console.log('twEditArea not found');
    }
  }

  private clickCnEditArea(): void {
    if (this.cnEditArea) {
      console.log('trigger click cnEditArea');
      this.cnEditArea.trigger('click');
    }
  }

  private clickTwEditArea(): void {
    if (this.twEditArea) {
      console.log('trigger click twEditArea');
      this.twEditArea.trigger('click');
    }
  }
}
