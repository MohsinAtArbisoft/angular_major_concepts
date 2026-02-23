import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Tab4Page } from './tab4.page';

@NgModule({
  declarations: [Tab4Page],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: Tab4Page }]),
  ],
})
export class Tab4PageModule {}
