import { Injectable } from '@angular/core';
import { Task } from '../components/task-item/task-item.component';

/**
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  DAY 4: SERVICES + DEPENDENCY INJECTION (DI)                   │
 * │                                                                 │
 * │  A Service is a class that holds shared logic/state.            │
 * │  DI is HOW Angular creates and delivers that service to you.    │
 * │                                                                 │
 * │  React equivalent:                                              │
 * │    Service ≈ Context Provider + useReducer (state + actions)    │
 * │    DI      ≈ useContext() (getting the instance)                │
 * │                                                                 │
 * │  But Angular DI is much more powerful:                          │
 * │    - No wrapping in <Provider> components                       │
 * │    - No prop drilling                                           │
 * │    - Automatic singleton management                             │
 * │    - Just declare in constructor and it works                   │
 * │                                                                 │
 * │  REACT WAY (verbose):                                           │
 * │    const TaskContext = createContext();                          │
 * │    <TaskContext.Provider value={taskState}>                     │
 * │      <App />                                                    │
 * │    </TaskContext.Provider>                                       │
 * │    // In any child:                                             │
 * │    const tasks = useContext(TaskContext);                        │
 * │                                                                 │
 * │  ANGULAR WAY (clean):                                           │
 * │    @Injectable({ providedIn: 'root' })                          │
 * │    class TaskService { ... }                                    │
 * │    // In any component:                                         │
 * │    constructor(private taskService: TaskService) { }            │
 * │    // That's it! Angular handles the rest.                      │
 * └─────────────────────────────────────────────────────────────────┘
 */

// @Injectable marks this class as available for DI.
// providedIn: 'root' makes it a SINGLETON — one instance shared
// across the entire app (like a global Context in React).
@Injectable({ providedIn: 'root' })
export class TaskService {

  private tasks: Task[] = [
    { id: 1, title: 'Learn Services & DI', completed: false, createdAt: new Date(Date.now() - 300000) },
    { id: 2, title: 'Learn Custom Pipes', completed: false, createdAt: new Date(Date.now() - 120000) },
    { id: 3, title: 'Understand @Injectable', completed: true, createdAt: new Date(Date.now() - 60000) },
  ];

  private log: string[] = [];
  private nextId = 4;

  // ── Read methods ──────────────────────────────────────────────

  getTasks(): Task[] {
    return this.tasks;
  }

  getEventLog(): string[] {
    return this.log;
  }

  get pendingCount(): number {
    return this.tasks.filter(t => !t.completed).length;
  }

  get completedCount(): number {
    return this.tasks.filter(t => t.completed).length;
  }

  // ── Write methods ─────────────────────────────────────────────
  // Before (Day 3): this logic lived inside Tab3Page.
  // Now it's in a service — reusable, testable, and injectable
  // into ANY component that needs it.

  addTask(title: string): void {
    this.tasks = [
      ...this.tasks,
      { id: this.nextId++, title, completed: false, createdAt: new Date() },
    ];
    this.logEvent('taskAdded', `"${title}"`);
  }

  toggleTask(id: number): void {
    this.tasks = this.tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    const task = this.tasks.find(t => t.id === id);
    this.logEvent('toggled', `"${task?.title}" → ${task?.completed ? 'done' : 'pending'}`);
  }

  deleteTask(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.logEvent('deleted', `"${task?.title}"`);
  }

  private logEvent(event: string, detail: string): void {
    const time = new Date().toLocaleTimeString();
    this.log = [`[${time}] ${event}: ${detail}`, ...this.log].slice(0, 15);
  }
}
