import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, delay, timeout } from 'rxjs/operators';

/**
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  DAY 6: HTTP CLIENT                                             │
 * │                                                                 │
 * │  HttpClient methods return OBSERVABLES, not Promises.           │
 * │  You subscribe (or use | async) to get the response.            │
 * │                                                                 │
 * │  React equivalent:                                              │
 * │    const [data, setData] = useState(null);                       │
 * │    useEffect(() => {                                            │
 * │      fetch(url).then(r => r.json()).then(setData).catch(...);   │
 * │    }, []);                                                       │
 * │                                                                 │
 * │  Angular:                                                       │
 * │    this.http.get<User[]>(url).pipe(                             │
 * │      catchError(err => of([]))                                   │
 * │    ).subscribe(users => this.users = users);                     │
 * │                                                                 │
 * │  Or with | async (no manual subscribe):                         │
 * │    users$ = this.http.get<User[]>(url).pipe(catchError(...));   │
 * │    Template: *ngFor="let u of users$ | async"                    │
 * │                                                                 │
 * │  WHY OBSERVABLES FOR HTTP?                                      │
 * │  - Cancelable (unsubscribe = abort)                             │
 * │  - Composable with RxJS (retry, debounce, switchMap)            │
 * │  - Same mental model as the rest of Angular                     │
 * └─────────────────────────────────────────────────────────────────┘
 */

export interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
  company?: { name: string; catchPhrase?: string };
  address?: { city: string; street?: string };
}

const JSONPLACEHOLDER_USERS = 'https://jsonplaceholder.typicode.com/users';

@Injectable({ providedIn: 'root' })
export class UserApiService {

  constructor(private http: HttpClient) {}

  /**
   * Returns an Observable of users from JSONPlaceholder.
   * React: fetch().then(r => r.json())
   * Angular: http.get<T>().pipe(...)
   */
  getUsers(): Observable<ApiUser[]> {
    return this.http.get<ApiUser[]>(JSONPLACEHOLDER_USERS).pipe(
      delay(300),
      timeout(15000), // If no response in 15s, error so loading state can reset
      catchError(err => {
        console.error('[UserApiService]', err);
        return of([]);
      })
    );
  }

  /**
   * Fetch a single user by id. Demonstrates Observable for one resource.
   */
  getUserById(id: number): Observable<ApiUser | null> {
    return this.http.get<ApiUser>(`https://jsonplaceholder.typicode.com/users/${id}`).pipe(
      catchError(() => of(null))
    );
  }
}
