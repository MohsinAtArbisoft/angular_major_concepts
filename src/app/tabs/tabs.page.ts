import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  standalone: false,
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1">
          <ion-icon name="person-outline"></ion-icon>
          <ion-label>Profile</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2">
          <ion-icon name="code-slash-outline"></ion-icon>
          <ion-label>Binding</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3">
          <ion-icon name="construct-outline"></ion-icon>
          <ion-label>Tasks</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4">
          <ion-icon name="infinite-outline"></ion-icon>
          <ion-label>RxJS</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab5">
          <ion-icon name="cloud-download-outline"></ion-icon>
          <ion-label>HTTP</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab6">
          <ion-icon name="navigate-outline"></ion-icon>
          <ion-label>Routing</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab7">
          <ion-icon name="layers-outline"></ion-icon>
          <ion-label>Architecture</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  `,
})
export class TabsPage {}
