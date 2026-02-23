import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Tab3Page } from './tab3.page';
import { TaskFormComponent } from '../components/task-form/task-form.component';
import { TaskItemComponent } from '../components/task-item/task-item.component';
import { TimeAgoPipe } from '../pipes/time-ago.pipe';

@NgModule({
  declarations: [Tab3Page, TaskFormComponent, TaskItemComponent, TimeAgoPipe],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
  ],
})
export class Tab3PageModule {}
