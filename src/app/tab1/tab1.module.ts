import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { ProfileCardComponent } from '../components/profile-card/profile-card.component';

@NgModule({
  declarations: [Tab1Page, ProfileCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
  ],
})
export class Tab1PageModule {}
