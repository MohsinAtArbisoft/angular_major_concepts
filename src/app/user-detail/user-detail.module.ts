import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail.component';

const routes: Routes = [
  { path: '', component: UserDetailComponent },
];

@NgModule({
  declarations: [UserDetailComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
})
export class UserDetailModule {}
