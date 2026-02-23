import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Tab5Page } from './tab5.page';

@NgModule({
  declarations: [Tab5Page],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: Tab5Page }]),
  ],
})
export class Tab5PageModule {}
