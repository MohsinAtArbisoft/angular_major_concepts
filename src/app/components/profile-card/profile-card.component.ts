import {
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  SimpleChanges,
} from '@angular/core';

/**
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  DAY 1: LIFECYCLE HOOKS                                        │
 * │                                                                 │
 * │  React equivalent mapping:                                      │
 * │                                                                 │
 * │  ngOnChanges  ≈  useEffect(() => {}, [prop])                   │
 * │  ngOnInit     ≈  useEffect(() => {}, [])                       │
 * │  ngAfterViewInit  ≈  useEffect + ref access                    │
 * │  ngOnDestroy  ≈  useEffect cleanup (return () => {})           │
 * │                                                                 │
 * │  Open the browser console and click "Switch User" in Tab 1     │
 * │  to see the lifecycle log in action.                            │
 * └─────────────────────────────────────────────────────────────────┘
 */

interface UserProfile {
  id: string;
  name: string;
  role: string;
  email: string;
  avatarUrl: string;
}

const MOCK_USERS: Record<string, UserProfile> = {
  'user-1': {
    id: 'user-1',
    name: 'Mohsin Raza',
    role: 'Mobile Engineer',
    email: 'mohsin@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=user-1',
  },
  'user-2': {
    id: 'user-2',
    name: 'Sara Ahmed',
    role: 'Frontend Engineer',
    email: 'sara@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=user-2',
  },
};

@Component({
  selector: 'app-profile-card',
  standalone: false,
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  // ── @Input ≈ React props ────────────────────────────────────────
  // The parent (Tab1Page) passes this in via [userId]="selectedUserId"
  @Input() userId!: string;

  // ── Component state ≈ useState variables ────────────────────────
  user: UserProfile | null = null;
  lastSeen = 0;
  lifecycleLog: string[] = [];

  private onlineTimer?: ReturnType<typeof setInterval>;
  private lastSeenTimer?: ReturnType<typeof setInterval>;

  // ─────────────────────────────────────────────────────────────────
  // 1. ngOnChanges — fires BEFORE ngOnInit, then every time an
  //    @Input property changes. Receives old + new values.
  //
  //    React equivalent:
  //      useEffect(() => { fetchUser(userId) }, [userId])
  // ─────────────────────────────────────────────────────────────────
  ngOnChanges(changes: SimpleChanges): void {
    this.log('ngOnChanges');

    if (changes['userId']) {
      const prev = changes['userId'].previousValue;
      const curr = changes['userId'].currentValue;
      console.log(`  └─ userId changed: "${prev}" → "${curr}"`);
      console.log(`  └─ isFirstChange: ${changes['userId'].firstChange}`);

      this.loadUser(curr);
    }
  }

  // ─────────────────────────────────────────────────────────────────
  // 2. ngOnInit — fires ONCE after the first ngOnChanges.
  //    Use for: initial data fetching, setting up subscriptions.
  //
  //    React equivalent:
  //      useEffect(() => { /* one-time setup */ }, [])
  // ─────────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.log('ngOnInit');

    this.onlineTimer = setInterval(() => {
      console.log(`[ProfileCard] ${this.user?.name ?? 'Unknown'} is online`);
    }, 5000);

    this.lastSeenTimer = setInterval(() => {
      this.lastSeen++;
    }, 1000);
  }

  // ─────────────────────────────────────────────────────────────────
  // 3. ngAfterViewInit — fires ONCE after Angular has fully
  //    rendered the component's view (and child views).
  //    Use for: DOM measurements, third-party lib init.
  //
  //    React equivalent:
  //      useEffect(() => { /* ref.current is now available */ }, [])
  // ─────────────────────────────────────────────────────────────────
  ngAfterViewInit(): void {
    this.log('ngAfterViewInit');
    console.log('  └─ DOM is fully rendered. Safe to measure elements.');
  }

  // ─────────────────────────────────────────────────────────────────
  // 4. ngOnDestroy — fires when the component is about to be
  //    removed from the DOM. MUST clean up timers, subscriptions.
  //
  //    React equivalent:
  //      useEffect(() => { return () => { /* cleanup */ } }, [])
  // ─────────────────────────────────────────────────────────────────
  ngOnDestroy(): void {
    this.log('ngOnDestroy');

    if (this.onlineTimer) clearInterval(this.onlineTimer);
    if (this.lastSeenTimer) clearInterval(this.lastSeenTimer);

    console.log('  └─ Timers cleared. No memory leaks.');
  }

  private loadUser(id: string): void {
    this.user = MOCK_USERS[id] ?? null;
    this.lastSeen = 0;
  }

  private log(hook: string): void {
    const timestamp = new Date().toLocaleTimeString();
    const entry = `[${timestamp}] ${hook}`;
    this.lifecycleLog = [entry, ...this.lifecycleLog].slice(0, 10);
    console.log(`%c[ProfileCard] ${hook}`, 'color: #3880ff; font-weight: bold');
  }
}
