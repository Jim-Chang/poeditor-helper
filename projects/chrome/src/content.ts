import * as $ from 'jquery';
import { Converter } from 'opencc-js';

function isPureText(str) {
  return !str.startsWith('<');
}

// async function loadConfig(): Promise<any> {
//   return new Promise((resolve) => {
//     chrome.storage.sync.get(['apiKey'], (items) => {
//       resolve(items);
//     });
//   });
// }

function getCNTranslation(str) {
  const convert = Converter({ from: 'tw', to: 'cn' });
  return convert(str);
}

type JqEle = any;

class TransRowsHandler {
  private rowsEle: JqEle;

  constructor(rootEle: JqEle) {
    this.rowsEle = rootEle.find('div[class="row mx-0 position-relative"]');
  }

  private get cnTransRow(): JqEle {
    return this.rowsEle.eq(0); // temp hard code first row
  }

  private get twTransRow(): JqEle {
    return this.rowsEle.eq(1); // temp hard code second row
  }

  private get cnEditArea(): JqEle {
    return this.findEditArea(this.cnTransRow);
  }

  private get twEditArea(): JqEle {
    return this.findEditArea(this.twTransRow);
  }

  get twText(): string | null {
    const text = this.twEditArea.html();
    console.log(`Find zh_TW string: ${text}`);
    return isPureText(text) ? text : null;
  }

  addTransButton(btn: JqEle): void {
    this.cnTransRow.find('div').eq(0).prepend(btn);
  }

  clickCnEditArea(): void {
    console.log('trigger click cnEditArea');
    this.cnEditArea.trigger('click');
  }

  setCnText(text: string): void {
    const cnTextInput = this.cnEditArea.find('textarea');
    cnTextInput.val(text);
  }

  private findEditArea(row: JqEle): JqEle {
    return row.find('.js-edit-area');
  }
}

function handleMutation(mutations: MutationRecord[]) {
  mutations.forEach((m) => {
    const ele = $(m.target);

    // when create translation block
    if (ele.hasClass('off-body')) {
      const rowsHandler = new TransRowsHandler(ele);

      // create trans btn
      const transBtn = $('<button class="po-helper-btn">Trans</button>');

      // create trans btn click event handler
      transBtn.on('click', () => {
        const twText = rowsHandler.twText;
        if (twText) {
          rowsHandler.clickCnEditArea();

          const cnText = getCNTranslation(twText);
          console.log(`translation CN: ${cnText}`);
          if (cnText) {
            rowsHandler.setCnText(cnText);
          }
        }
      });

      rowsHandler.addTransButton(transBtn);
    }
  });
}

function init() {
  const observer = new MutationObserver(handleMutation);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

init();
