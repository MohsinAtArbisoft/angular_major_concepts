import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  MULTIPLE @Output EVENTS FROM ONE COMPONENT                     │
 * │                                                                 │
 * │  A component can have many @Output events — each one is like    │
 * │  a separate callback prop in React:                             │
 * │                                                                 │
 * │  React:                                                         │
 * │    <TaskItem                                                    │
 * │      task={task}                                                │
 * │      onToggle={(id) => toggle(id)}                              │
 * │      onDelete={(id) => remove(id)}                              │
 * │    />                                                           │
 * │                                                                 │
 * │  Angular:                                                       │
 * │    <app-task-item                                               │
 * │      [task]="task"                                              │
 * │      (toggled)="toggle($event)"                                 │
 * │      (deleted)="remove($event)">                                │
 * │    </app-task-item>                                             │
 * │                                                                 │
 * │  EventEmitter<T> is typed — T defines what $event will be.      │
 * │  EventEmitter<number> → $event is a number (the task id)        │
 * │  EventEmitter<string> → $event is a string                      │
 * │  EventEmitter<void>   → no payload, just a signal               │
 * └─────────────────────────────────────────────────────────────────┘
 */

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-task-item',
  standalone: false,
  templateUrl: './task-item.component.html',
})
export class TaskItemComponent {

  // @Input — data flows DOWN from parent
  @Input() task!: Task;

  // @Output — events flow UP to parent
  // Each EventEmitter<number> emits the task's id
  @Output() toggled = new EventEmitter<number>();
  @Output() deleted = new EventEmitter<number>();

  onToggle(): void {
    this.toggled.emit(this.task.id);
  }

  onDelete(): void {
    this.deleted.emit(this.task.id);
  }
}
