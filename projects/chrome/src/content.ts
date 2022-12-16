import { JqEle } from './define';
import { TermsRowHandler } from './terms-row-handler';
import { TransRowHandler } from './trans-row-handler';
import * as $ from 'jquery';

// async function loadConfig(): Promise<any> {
//   return new Promise((resolve) => {
//     chrome.storage.sync.get(['apiKey'], (items) => {
//       resolve(items);
//     });
//   });
// }

function handleMutation(mutations: MutationRecord[]) {
  mutations.forEach((m) => {
    const ele = $(m.target);

    // when create translation block
    if (ele.hasClass('off-body')) {
      const rowsHandler = new TermsRowHandler(ele as JqEle);
      rowsHandler.addTwToCnTransBtn();
      rowsHandler.addCnToTwTransBtn();
    }
  });
}

function init() {
  const observer = new MutationObserver(handleMutation);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  const handler = new TransRowHandler();
  handler.handle();
}

init();
