import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Tab6Page } from './tab6.page';

@NgModule({
  declarations: [Tab6Page],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: Tab6Page }]),
  ],
})
export class Tab6PageModule {}
