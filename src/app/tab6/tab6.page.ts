import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  DAY 7: ROUTING & NAVIGATION                                    │
 * │                                                                 │
 * │  DECLARATIVE:  routerLink="/tabs/user/1"                        │
 * │  PROGRAMMATIC: router.navigate(['/tabs/user', id])              │
 * │  WITH QUERY:   router.navigate([...], { queryParams: { from } }) │
 * │  WITH STATE:   router.navigate([...], { state: { user } })       │
 * │                                                                 │
 * │  READING IN TARGET:                                             │
 * │  - ActivatedRoute.paramMap  (route params)                      │
 * │  - ActivatedRoute.queryParams                                   │
 * │  - history.state (navigation state)                             │
 * └─────────────────────────────────────────────────────────────────┘
 */

@Component({
  selector: 'app-tab6',
  standalone: false,
  templateUrl: './tab6.page.html',
})
export class Tab6Page {

  constructor(private router: Router) {}

  goToUser(id: number): void {
    this.router.navigate(['/tabs/user', id], { queryParams: { from: 'routing-tab' } });
  }
}
