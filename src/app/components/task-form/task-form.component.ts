import { Component, Output, EventEmitter } from '@angular/core';

/**
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  DAY 3: @Output + EventEmitter                                  │
 * │                                                                 │
 * │  This child component EMITS events UP to the parent.            │
 * │                                                                 │
 * │  React equivalent:                                              │
 * │    // Parent passes a callback prop DOWN                        │
 * │    <TaskForm onTaskAdded={(title) => handleAdd(title)} />       │
 * │                                                                 │
 * │    // Child calls the callback to send data UP                  │
 * │    props.onTaskAdded('New task');                                │
 * │                                                                 │
 * │  Angular equivalent:                                            │
 * │    // Parent listens to the event                               │
 * │    <app-task-form (taskAdded)="handleAdd($event)">              │
 * │                                                                 │
 * │    // Child emits the event                                     │
 * │    this.taskAdded.emit('New task');                              │
 * │                                                                 │
 * │  KEY INSIGHT:                                                   │
 * │  @Input  = data flows DOWN  (parent → child)  ≈ props          │
 * │  @Output = data flows UP    (child → parent)  ≈ callback props │
 * └─────────────────────────────────────────────────────────────────┘
 */

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {

  taskTitle = '';

  // ── @Output creates a custom event ────────────────────────────
  // EventEmitter<string> means this event carries a string payload.
  // The parent listens via: (taskAdded)="handleAdd($event)"
  // $event will be the string we pass to .emit()
  @Output() taskAdded = new EventEmitter<string>();

  addTask(): void {
    if (this.taskTitle.trim()) {
      // .emit() sends the value UP to the parent
      // Like calling props.onTaskAdded(title) in React
      this.taskAdded.emit(this.taskTitle.trim());
      this.taskTitle = '';
    }
  }
}
