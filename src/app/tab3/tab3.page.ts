import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';

/**
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  DAY 3 + 4: EMITTERS + SERVICES + DI + PIPES                   │
 * │                                                                 │
 * │  EVOLUTION:                                                     │
 * │  Day 3: All task state and logic lived HERE in the component.   │
 * │  Day 4: State and logic moved to TaskService. This component    │
 * │         now just COORDINATES between child events and service.  │
 * │                                                                 │
 * │  DEPENDENCY INJECTION IN ACTION:                                │
 * │  Look at the constructor below — that's ALL you need to do.     │
 * │  Angular sees "TaskService" in the constructor, creates an      │
 * │  instance (or reuses the singleton), and passes it in.          │
 * │                                                                 │
 * │  React equivalent:                                              │
 * │    // You'd need to set up Context, Provider, useContext...     │
 * │    const taskService = useContext(TaskServiceContext);           │
 * │                                                                 │
 * │  Angular:                                                       │
 * │    constructor(public taskService: TaskService) { }             │
 * │    // Done. Angular handles everything.                         │
 * │                                                                 │
 * │  PIPES IN THE TEMPLATE:                                         │
 * │  Built-in:  {{ date | date:'short' }}   → "1/15/26, 3:30 PM"  │
 * │  Built-in:  {{ text | uppercase }}      → "HELLO"              │
 * │  Custom:    {{ date | timeAgo }}        → "5m ago"             │
 * │  Chained:   {{ text | uppercase | slice:0:5 }}  → "HELLO"     │
 * │                                                                 │
 * │  React equivalent:                                              │
 * │  Pipes ≈ calling helper functions in JSX                        │
 * │    React:   {formatDate(task.createdAt)}                        │
 * │    Angular: {{ task.createdAt | date:'short' }}                 │
 * └─────────────────────────────────────────────────────────────────┘
 */

@Component({
  selector: 'app-tab3',
  standalone: false,
  templateUrl: './tab3.page.html',
  styles: [`
    .completed-task h3 {
      text-decoration: line-through;
      opacity: 0.5;
    }
    .event-log-entry {
      font-family: monospace;
      font-size: 12px;
    }
  `],
})
export class Tab3Page {

  // ── DEPENDENCY INJECTION ──────────────────────────────────────
  // Angular reads the constructor parameter type (TaskService),
  // looks it up in its DI container, and provides the instance.
  //
  // "public" makes it accessible in the template as "taskService"
  // "private" would only be accessible in this class.
  //
  // React equivalent:
  //   const taskService = useContext(TaskServiceContext);
  //   // But Angular requires zero boilerplate — no Provider, no Context creation.
  // Used in the Pipes demo section
  now = new Date();

  constructor(public taskService: TaskService) {}

  // ── Event handlers — @Output from children still work! ────────
  // The @Output pattern (Day 3) is preserved. But now instead of
  // managing state ourselves, we delegate to the service.

  onTaskAdded(title: string): void {
    this.taskService.addTask(title);
  }

  onTaskToggled(id: number): void {
    this.taskService.toggleTask(id);
  }

  onTaskDeleted(id: number): void {
    this.taskService.deleteTask(id);
  }
}
