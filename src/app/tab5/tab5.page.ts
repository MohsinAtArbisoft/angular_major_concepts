import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UserApiService, ApiUser } from '../services/user-api.service';

/**
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  DAY 6: HTTP CLIENT (continued)                                 │
 * │                                                                 │
 * │  We use explicit .subscribe() here so:                         │
 * │  1. The request is triggered immediately from the component     │
 * │  2. Loading is always cleared in finalize() (complete/error/unsub)│
 * │  3. Results are stored in a property — no async pipe needed      │
 * │                                                                 │
 * │  Alternative: users$ = http.get().pipe(...); template: | async  │
 * │  That works too; explicit subscribe is easier to debug.         │
 * └─────────────────────────────────────────────────────────────────┘
 */

@Component({
  selector: 'app-tab5',
  standalone: false,
  templateUrl: './tab5.page.html',
})
export class Tab5Page {

  users: ApiUser[] = [];
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private userApi: UserApiService,
    private router: Router,
  ) {}

  /** Day 7: Navigate with state so detail page can show user without re-fetching */
  goToUserWithState(user: ApiUser): void {
    this.router.navigate(['/tabs/user', user.id], {
      queryParams: { from: 'list' },
      state: { user },
    });
  }

  onFetch(): void {
    this.loading = true;
    this.errorMessage = null;
    this.users = [];

    this.userApi.getUsers().pipe(
      finalize(() => (this.loading = false))
    ).subscribe({
      next: (list) => (this.users = list),
      error: (err) => (this.errorMessage = err?.message ?? 'Request failed'),
    });
  }
}
