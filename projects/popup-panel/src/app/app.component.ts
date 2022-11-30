import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  apiKey = '';
  showSaved = false;

  constructor(private zone: NgZone) {}

  onClickSaveBtn(): void {
    this.showSaved = false;
    chrome.storage.sync.set({ apiKey: this.apiKey }, () => {
      this.zone.run(() => {
        this.showSaved = true;
      });
    });
  }
}
