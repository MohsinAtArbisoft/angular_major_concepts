import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Tab2Page } from './tab2.page';
import { ProfileEditorComponent } from '../components/profile-editor/profile-editor.component';

@NgModule({
  declarations: [Tab2Page, ProfileEditorComponent],
  imports: [
    CommonModule,
    FormsModule,      // Required for [(ngModel)] two-way binding
    IonicModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
  ],
})
export class Tab2PageModule {}
