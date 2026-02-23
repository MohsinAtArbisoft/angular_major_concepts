import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Tab7Page } from './tab7.page';
import { EncapsulationScopedComponent } from '../components/encapsulation-scoped/encapsulation-scoped.component';
import { EncapsulationNoneComponent } from '../components/encapsulation-none/encapsulation-none.component';

@NgModule({
  declarations: [Tab7Page, EncapsulationScopedComponent, EncapsulationNoneComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: Tab7Page }]),
  ],
})
export class Tab7PageModule {}
