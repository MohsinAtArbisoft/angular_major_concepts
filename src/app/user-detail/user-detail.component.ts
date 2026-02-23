import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserApiService, ApiUser } from '../services/user-api.service';

/**
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  DAY 7: ROUTING & NAVIGATION (data passing)                    │
 * │                                                                 │
 * │  ROUTE PARAMS:  /tabs/user/1  →  :id = 1                        │
 * │  ActivatedRoute.params (or paramMap) is an Observable.           │
 * │                                                                 │
 * │  QUERY PARAMS:  /tabs/user/1?from=list                          │
 * │  ActivatedRoute.queryParams                                     │
 * │                                                                 │
 * │  STATE (extras):  router.navigate([...], { state: { user } })   │
 * │  Read in target: history.state or router.getCurrentNavigation() │
 * │  (getCurrentNavigation() only in constructor/guards)            │
 * │                                                                 │
 * │  React equivalent:                                              │
 * │  - Route params ≈ useParams() (React Router)                   │
 * │  - Query params ≈ useSearchParams()                            │
 * │  - State ≈ location.state (navigate with state)                 │
 * │  - Programmatic ≈ useNavigate()                                │
 * └─────────────────────────────────────────────────────────────────┘
 */

@Component({
  selector: 'app-user-detail',
  standalone: false,
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit {

  user: ApiUser | null = null;
  loading = true;
  routeId: string | null = null;
  queryFrom: string | null = null;
  stateUser: ApiUser | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userApi: UserApiService,
  ) {}

  ngOnInit(): void {
    // ── 1. Route params: /tabs/user/:id
    this.route.paramMap.subscribe(params => {
      this.routeId = params.get('id');
    });

    // ── 2. Query params: ?from=list
    this.route.queryParams.subscribe(q => {
      this.queryFrom = q['from'] ?? null;
    });

    // ── 3. State passed via router.navigate(..., { state: { user } })
    this.stateUser = history.state?.['user'] ?? null;

    // ── 4. Fetch user by id (or use state if we have it)
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (this.stateUser && String(this.stateUser.id) === id) {
          return of(this.stateUser);
        }
        if (id) {
          return this.userApi.getUserById(+id);
        }
        return of(null);
      })
    ).subscribe(u => {
      this.user = u ?? null;
      this.loading = false;
    });
  }

  goBack(): void {
    this.router.navigate(['/tabs/tab5']);
  }
}
