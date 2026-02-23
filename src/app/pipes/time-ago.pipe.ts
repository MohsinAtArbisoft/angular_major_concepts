import { Pipe, PipeTransform } from '@angular/core';

/**
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  DAY 4: CUSTOM PIPE                                             │
 * │                                                                 │
 * │  A Pipe transforms data in the template.                        │
 * │  Built-in:  {{ date | date:'short' }}                           │
 * │  Custom:    {{ date | timeAgo }}                                │
 * │                                                                 │
 * │  React equivalent:                                              │
 * │    Pipes ≈ helper functions called in JSX                       │
 * │    React:   <p>{formatTimeAgo(task.createdAt)}</p>              │
 * │    Angular: <p>{{ task.createdAt | timeAgo }}</p>               │
 * │                                                                 │
 * │  WHY PIPES ARE BETTER:                                          │
 * │  - Declarative in the template (easy to read)                   │
 * │  - Angular can optimize pure pipes (cached when input unchanged)│
 * │  - Chainable: {{ name | uppercase | slice:0:10 }}              │
 * │  - Reusable across any template                                 │
 * └─────────────────────────────────────────────────────────────────┘
 */

// @Pipe decorator — 'timeAgo' is the name used in templates
// standalone: false because we declare it in an NgModule
@Pipe({ name: 'timeAgo', standalone: false })
export class TimeAgoPipe implements PipeTransform {

  // transform() is the only required method.
  // Angular calls it with the value before the pipe: {{ value | timeAgo }}
  // It returns the transformed string.
  transform(value: Date | string): string {
    const date = value instanceof Date ? value : new Date(value);
    const now = Date.now();
    const diffMs = now - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);

    if (diffSec < 5) return 'just now';
    if (diffSec < 60) return `${diffSec}s ago`;

    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;

    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;

    const diffDay = Math.floor(diffHr / 24);
    return `${diffDay}d ago`;
  }
}
