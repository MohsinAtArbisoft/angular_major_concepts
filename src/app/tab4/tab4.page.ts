import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

/**
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  DAY 5: OBSERVABLES (RxJS)                                     │
 * │                                                                 │
 * │  An Observable is a STREAM of values over time.                 │
 * │  Think: Promise that can resolve many times + can be cancelled. │
 * │                                                                 │
 * │  PROMISE vs OBSERVABLE:                                         │
 * │  ─────────────────────────────────────────────                  │
 * │  Promise (React)          Observable (Angular)                  │
 * │  ──────────────────       ────────────────────                  │
 * │  Resolves ONCE            Emits MANY values                     │
 * │  Eager (runs immediately) Lazy (runs on subscribe)              │
 * │  Can't cancel             Can unsubscribe                       │
 * │  await / .then()          .subscribe() / | async pipe           │
 * │  No operators             Rich operators (map, filter, etc.)    │
 * │                                                                 │
 * │  KEY RxJS CONCEPTS USED HERE:                                   │
 * │                                                                 │
 * │  BehaviorSubject<T>  — Observable with a current value.         │
 * │                         Like useState but as a stream.          │
 * │  interval(ms)        — Emits 0, 1, 2, 3... every ms.           │
 * │  pipe(operators...)  — Chain of transformations on the stream.  │
 * │  debounceTime(ms)    — Wait ms after last emission, then emit.  │
 * │  distinctUntilChanged— Skip if value same as previous.          │
 * │  map(fn)             — Transform each emitted value.            │
 * │  | async             — Template pipe that auto-subscribes       │
 * │                         AND auto-unsubscribes. The best way!    │
 * │                                                                 │
 * │  React equivalent:                                              │
 * │    Observable ≈ useEffect + addEventListener + Array methods    │
 * │    | async    ≈ no equivalent (you'd need useState + useEffect  │
 * │                 + cleanup return function)                      │
 * └─────────────────────────────────────────────────────────────────┘
 */

// Mock data for the search demo
const ALL_ITEMS = [
  'Angular', 'React', 'React Native', 'Vue', 'Svelte', 'Next.js',
  'TypeScript', 'JavaScript', 'RxJS', 'NgModule',
  'Observable', 'Promise', 'EventEmitter', 'Subject', 'BehaviorSubject',
  'Component', 'Service', 'Pipe', 'Directive', 'Module',
  'Dependency Injection', 'Data Binding', 'Lifecycle Hooks',
  'HttpClient', 'Router', 'Forms', 'Zone.js', 'Change Detection',
];

@Component({
  selector: 'app-tab4',
  standalone: false,
  templateUrl: './tab4.page.html',
  styles: [`
    .highlight { color: var(--ion-color-primary); font-weight: bold; }
    .code-block {
      background: var(--ion-color-light);
      padding: 8px 12px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 13px;
      margin: 8px 0;
      white-space: pre-wrap;
    }
  `],
})
export class Tab4Page implements OnInit, OnDestroy {

  // ═════════════════════════════════════════════════════════════════
  // SECTION 1: Timer Observable (stream of values over time)
  // ═════════════════════════════════════════════════════════════════
  // interval(1000) creates an Observable that emits 0, 1, 2, 3...
  // every second. In the template, we use | async to subscribe.
  //
  // React equivalent:
  //   const [count, setCount] = useState(0);
  //   useEffect(() => {
  //     const id = setInterval(() => setCount(c => c + 1), 1000);
  //     return () => clearInterval(id);    // cleanup
  //   }, []);
  //
  // Angular with | async:
  //   timer$ = interval(1000);
  //   {{ timer$ | async }}
  //   // That's it. No useState, no useEffect, no cleanup.
  timer$ = interval(1000);

  // ═════════════════════════════════════════════════════════════════
  // SECTION 2: Live Search with Observables
  // ═════════════════════════════════════════════════════════════════
  // BehaviorSubject is an Observable that holds a current value.
  // Like useState('') but you push new values with .next()
  private searchSubject = new BehaviorSubject<string>('');

  // The keystroke log shows raw inputs vs debounced output
  rawKeystrokes: string[] = [];

  // searchResults$ is a DERIVED Observable:
  // searchSubject emits raw search terms → pipe transforms them
  //
  // React equivalent (verbose):
  //   const [term, setTerm] = useState('');
  //   const [results, setResults] = useState(ALL_ITEMS);
  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setResults(ALL_ITEMS.filter(...));
  //     }, 300);
  //     return () => clearTimeout(timer);   // debounce cleanup
  //   }, [term]);
  //
  // Angular (one pipe chain):
  searchResults$: Observable<string[]> = this.searchSubject.pipe(
    debounceTime(300),           // Wait 300ms after user stops typing
    distinctUntilChanged(),      // Don't re-filter if same term
    map(term => this.filterItems(term))  // Filter the items
  );

  // ═════════════════════════════════════════════════════════════════
  // SECTION 3: Manual subscribe vs | async
  // ═════════════════════════════════════════════════════════════════
  // Shows WHY you should prefer | async over manual .subscribe()
  manualTimerValue: number | null = null;
  private manualSub?: Subscription;

  ngOnInit(): void {
    // Manual subscribe — YOU are responsible for cleanup
    this.manualSub = interval(1000).subscribe(n => {
      this.manualTimerValue = n;
    });
  }

  ngOnDestroy(): void {
    // MUST unsubscribe or the interval keeps running = MEMORY LEAK
    // | async does this automatically — that's why it's preferred
    this.manualSub?.unsubscribe();
  }

  // ── Search handler ────────────────────────────────────────────
  onSearch(event: Event): void {
    const value = (event as CustomEvent).detail.value ?? '';
    // Log every raw keystroke to show debounce effect
    this.rawKeystrokes = [...this.rawKeystrokes, value].slice(-8);
    // Push the new value into the BehaviorSubject stream
    this.searchSubject.next(value);
  }

  private filterItems(term: string): string[] {
    if (!term.trim()) return ALL_ITEMS;
    const lower = term.toLowerCase();
    return ALL_ITEMS.filter(item => item.toLowerCase().includes(lower));
  }
}
