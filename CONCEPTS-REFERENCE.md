# Angular Learning — Concepts Reference

A concise reference for every concept covered in this project, with **file references**, **how/why** they’re used, and **React Native** comparisons. Use this when reading or writing Angular code.

---

## How to read an Angular component

When you open a component, read it in this order:

1. **Decorator** — `@Component({ selector, template/templateUrl, styleUrls, encapsulation?, standalone? })`  
   Tells Angular how to use this class (tag name, template, styles, encapsulation).

2. **Class** — The component logic. Look for:
   - **@Input()** — Data from parent (like React props).
   - **@Output()** — Events to parent (like callback props).
   - **constructor(...)** — Injected services (DI).
   - **Lifecycle hooks** — `ngOnInit`, `ngOnChanges`, `ngOnDestroy`, etc.
   - **Properties** — Component state (like React state).
   - **Methods** — Handlers and helpers.

3. **Template** — The HTML. Look for:
   - **`{{ expr }}`** — Interpolation (one-way, component → DOM).
   - **`[prop]="expr"`** — Property binding (one-way).
   - **`(event)="handler()"`** — Event binding (DOM → component).
   - **`[(ngModel)]="prop"`** — Two-way binding (needs `FormsModule`).
   - **`*ngIf` / `*ngFor`** — Conditionals and loops.
   - **`| pipe`** — Pipes (e.g. `| async`, `| date`).
   - **`[routerLink]`** — Declarative navigation.

4. **Module** — The component is declared in an `NgModule` (e.g. `tab1.module.ts`). That module’s `imports` list shows what the component can use (e.g. `FormsModule`, `IonicModule`).

---

## 1. Lifecycle

**What it is:** Hooks that run at specific moments in a component’s life: when inputs are set, when the view is ready, when the component is destroyed.

**Where it’s used:**  
`src/app/components/profile-card/profile-card.component.ts`

**How it’s used:**
- **ngOnChanges** — Runs when any `@Input()` changes (and on first init). Used to reload user when `userId` changes. Receives `SimpleChanges` (previous/current values).
- **ngOnInit** — Runs once after the first `ngOnChanges`. Used to start timers (e.g. “last seen” counter).
- **ngAfterViewInit** — Runs once after the view (and child views) are rendered. Used for DOM-dependent logic (e.g. measuring elements).
- **ngOnDestroy** — Runs when the component is removed. Used to clear timers/subscriptions to avoid leaks.

**Why:** Same idea as React’s `useEffect`: run logic at the right time and clean up. Angular splits this into named hooks instead of one `useEffect` with dependencies.

**React Native comparison:**

| Angular              | React Native                          |
|----------------------|----------------------------------------|
| `ngOnChanges(changes)` | `useEffect(() => { ... }, [prop])`   |
| `ngOnInit()`         | `useEffect(() => { ... }, [])`        |
| `ngAfterViewInit()`  | `useEffect` + ref (after layout)      |
| `ngOnDestroy()`      | `useEffect` cleanup `return () => {}` |

**Trigger in app:** Tab 1 → “Switch User” triggers `ngOnChanges`; switching tabs triggers `ngOnDestroy` on the left tab.

---

## 2. Data binding (one-way, two-way, parent–child)

**What it is:** How data flows between component class and template, and between parent and child.

**Where it’s used:**  
`src/app/tab2/tab2.page.html`, `src/app/tab2/tab2.page.ts`, `src/app/components/profile-editor/profile-editor.component.*`

**Types:**

| Type            | Syntax              | Direction        | Example in project                          |
|-----------------|---------------------|------------------|--------------------------------------------|
| Interpolation   | `{{ expr }}`        | Class → DOM      | `{{ user.name }}`, `{{ clickCount }}`      |
| Property        | `[prop]="expr"`     | Class → DOM      | `[userId]="selectedUserId"`, `[disabled]="..."` |
| Event           | `(event)="fn()"`    | DOM → class      | `(click)="switchUser()"`, `(ionInput)="..."`   |
| Two-way         | `[(ngModel)]="x"`   | Class ↔ DOM      | `[(ngModel)]="user.name"` (needs `FormsModule`) |

**Parent → child:** Parent passes data with **property binding**; child receives it with **@Input()**.

- Parent: `<app-profile-card [userId]="selectedUserId">`  
  (`src/app/tab1/tab1.page.ts` template)
- Child: `@Input() userId!: string;`  
  (`src/app/components/profile-card/profile-card.component.ts`)

**Why:** One-way keeps data flow predictable; two-way is a shortcut for “value + change handler” (like a controlled input in one binding).

**React Native comparison:**

| Angular              | React Native              |
|----------------------|---------------------------|
| `{{ x }}`            | `{x}` in JSX              |
| `[src]="url"`        | `src={url}`               |
| `(click)="fn()"`     | `onPress={() => fn()}`    |
| `[(ngModel)]="x"`    | `value={x}` + `onChange`  |
| `@Input() x`         | `props.x`                 |

**Important:** In Angular, objects passed via `@Input()` are passed by **reference**. If the child mutates `user.name`, the parent’s `user` object changes too (no “setUser” needed for the parent to see it). In React, props are read-only; you’d use a callback or lift state.

---

## 3. Emitters (@Output + EventEmitter)

**What it is:** Child notifies the parent by emitting values. The parent listens with `(eventName)="handler($event)"`.

**Where it’s used:**  
`src/app/components/task-form/task-form.component.ts` (emits `taskAdded`),  
`src/app/components/task-item/task-item.component.ts` (emits `toggled`, `deleted`),  
`src/app/tab3/tab3.page.ts` (handles those events)

**How it’s used:**
- Child declares: `@Output() taskAdded = new EventEmitter<string>();`
- Child emits: `this.taskAdded.emit(this.taskTitle);`
- Parent template: `<app-task-form (taskAdded)="onTaskAdded($event)">`
- Parent method: `onTaskAdded(title: string) { ... }` — `$event` is the emitted value.

**Why:** Keeps the child dumb: it doesn’t need a service or router; it just emits. The parent (or a service) owns the state and side effects.

**React Native comparison:**

| Angular                         | React Native                    |
|---------------------------------|----------------------------------|
| `@Output() x = new EventEmitter<T>()` | Callback prop, e.g. `onX`      |
| `this.x.emit(value)`            | `props.onX(value)`              |
| `(x)="handler($event)"`         | `onX={handler}`                 |

**Note:** `EventEmitter` extends RxJS `Subject`, so it’s an Observable under the hood. The template’s `(event)="..."` is like subscribing to it.

---

## 4. Observables (RxJS)

**What it is:** A stream of values over time. You subscribe (or use `| async`) to get values. Can be transformed with `pipe(operators...)`.

**Where it’s used:**  
`src/app/tab4/tab4.page.ts`, `src/app/tab4/tab4.page.html`

**How it’s used:**
- **interval(1000)** — Observable that emits 0, 1, 2, … every second. Used for the timer demo.
- **BehaviorSubject** — Holds a current value; `.next(x)` pushes a new value. Used for the search term so we can `pipe(debounceTime, distinctUntilChanged, map)`.
- **pipe(debounceTime(300), distinctUntilChanged(), map(...))** — Wait 300 ms after last keystroke, skip duplicates, then filter the list.
- **| async** — Template pipe that subscribes to an Observable and shows the latest value; **unsubscribes automatically** when the component is destroyed.

**Why:** HTTP, router params, and many APIs in Angular return Observables. RxJS operators (debounce, map, switchMap) make async and event-driven logic composable.

**React Native comparison:**

| Angular / RxJS           | React Native                          |
|--------------------------|----------------------------------------|
| Observable stream        | No built-in equivalent                 |
| `interval(1000)`         | `setInterval` + `useState` + cleanup   |
| `subject.pipe(debounceTime(300))` | `useEffect` + `setTimeout` + deps  |
| `obs \| async` in template | Manual `useState` + `useEffect` + subscribe + cleanup |
| `.subscribe()`           | Calling a callback / setState          |

**Rule of thumb:** Prefer **`| async`** in the template so Angular manages subscription and cleanup. Use manual `.subscribe()` only when you need side effects (e.g. navigation, logging) that can’t be expressed in the template.

---

## 5. HTTP Client

**What it is:** Angular’s service for HTTP requests. Methods return **Observables**, not Promises.

**Where it’s used:**  
`src/app/services/user-api.service.ts`, `src/app/tab5/tab5.page.ts`, `src/app/app.module.ts` (HttpClientModule)

**How it’s used:**
- **AppModule** imports `HttpClientModule` so `HttpClient` is available app-wide.
- **UserApiService** injects `HttpClient` and exposes `getUsers(): Observable<ApiUser[]>` and `getUserById(id): Observable<ApiUser | null>`.
- Service uses `this.http.get<ApiUser[]>(url).pipe(delay(300), timeout(15000), catchError(...))` — typed response, delay, timeout, and error handling.
- **Tab5Page** calls `userApi.getUsers().pipe(finalize(() => this.loading = false)).subscribe({ next: ..., error: ... })` so loading is cleared and results/errors are stored for the template.

**Why:** Typed, cancelable (unsubscribe = abort), and composable with RxJS (retry, timeout, switchMap for typeahead).

**React Native comparison:**

| Angular                    | React Native                    |
|----------------------------|----------------------------------|
| `http.get<T>(url)`         | `fetch(url).then(r => r.json())` |
| Returns Observable         | Returns Promise                  |
| `.pipe(catchError(...))`   | `.catch(...)`                    |
| `finalize(() => ...)`      | `finally` in Promise or try/finally |
| Unsubscribe = cancel       | AbortController for fetch        |

---

## 6. Dependency injection (DI)

**What it is:** The framework creates and injects instances (e.g. services) into constructors. No manual `new` or global singletons in your code.

**Where it’s used:**  
`src/app/services/task.service.ts` (`@Injectable({ providedIn: 'root' })`),  
`src/app/tab3/tab3.page.ts` (constructor injects `TaskService`),  
`src/app/services/user-api.service.ts`, `src/app/tab5/tab5.page.ts`, `src/app/user-detail/user-detail.component.ts`

**How it’s used:**
- **Service:** `@Injectable({ providedIn: 'root' })` — one instance for the whole app (like a root Context in React).
- **Consumer:** `constructor(private taskService: TaskService) {}` — Angular passes the `TaskService` instance. No `new`, no `useContext`.
- **UserApiService** injects `HttpClient`; **Tab5Page** injects `UserApiService` and `Router`; **UserDetailComponent** injects `ActivatedRoute`, `Router`, `UserApiService`.

**Why:** Testability (you can inject mocks), single place to configure dependencies, and no prop drilling for shared state or HTTP.

**React Native comparison:**

| Angular                          | React Native                    |
|----------------------------------|----------------------------------|
| `@Injectable({ providedIn: 'root' })` | `createContext` + `Provider`   |
| `constructor(private svc: Svc)`  | `useContext(MyContext)`          |
| No Provider in template          | Must wrap tree in `<Provider>`  |

---

## 7. Routing and navigation (with data passing)

**What it is:** URL-based navigation with route params, query params, and optional state passed when navigating.

**Where it’s used:**  
`src/app/tabs/tabs-routing.module.ts`, `src/app/user-detail/user-detail.component.ts`, `src/app/tab5/tab5.page.html` & `.ts`, `src/app/tab6/tab6.page.*`

**How it’s used:**
- **Route config:** `{ path: 'user/:id', loadChildren: () => import(...UserDetailModule) }` — `:id` is a route param.
- **Declarative link:** `[routerLink]="['/tabs/user', user.id]"` — navigates to `/tabs/user/1` etc.
- **Programmatic:** `this.router.navigate(['/tabs/user', user.id], { queryParams: { from: 'list' }, state: { user } });` — same route plus query and state.
- **Reading in UserDetailComponent:**  
  `this.route.paramMap` (Observable) for `id`,  
  `this.route.queryParams` for `?from=...`,  
  `history.state` for the `user` object passed in `state`.  
  Then fetch user by id (or use state if present) and show in template.

**Why:** Shareable URLs, back/forward support, and passing data via state avoids refetch when coming from a list.

**React Native comparison:**

| Angular                       | React Native (e.g. React Navigation) |
|------------------------------|---------------------------------------|
| `routerLink`                  | `<Link>` / `navigation.navigate`      |
| `router.navigate([...], { state })` | `navigate('Screen', { params })` / state |
| `ActivatedRoute.paramMap`     | `useParams()`                         |
| `ActivatedRoute.queryParams` | `useSearchParams()`                   |
| `history.state`              | `route.params` / passed state        |

---

## 8. Services and pipes

**Services**

**What:** Classes that hold shared logic or state, provided via DI.

**Where:**  
`src/app/services/task.service.ts`, `src/app/services/user-api.service.ts`

**How:**  
`TaskService` is `@Injectable({ providedIn: 'root' })`, holds the task list and methods (`addTask`, `toggleTask`, `deleteTask`, `getTasks`, `getEventLog`). Tab3Page injects it and delegates all task operations to it.  
`UserApiService` wraps `HttpClient` and exposes `getUsers()` and `getUserById(id)`.

**Why:** Single source of truth, reusable across components, testable (inject mocks).

**Pipes**

**What:** Transform values in the template. Syntax: `value | pipeName:arg`.

**Where:**  
`src/app/pipes/time-ago.pipe.ts`, `src/app/tab3/tab3.page.html`, `src/app/components/task-item/task-item.component.html`

**How:**
- **Built-in:** `{{ date | date:'short' }}`, `{{ text | uppercase }}`, `{{ amount | currency:'USD' }}`, `{{ items | slice:0:5 }}`.
- **Custom TimeAgoPipe:** `transform(value: Date | string): string` returns "just now", "5m ago", etc. Used as `{{ task.createdAt | timeAgo }}` in the task item and in Tab3’s pipe demo card.
- Tab3’s “Pipes” card shows `date`, `uppercase`, `currency`, chained pipes, and the custom `timeAgo`.

**Why:** Keep templates declarative; Angular can optimize pure pipes (cache by input). Reusable across templates.

**React Native comparison:**

| Angular           | React Native              |
|-------------------|---------------------------|
| Service (DI)      | Context or module with functions |
| `{{ x \| pipe }}` | `{formatX(x)}` or helpers in JSX |

---

## 9. Architecture (View Encapsulation, Change Detection, Zone.js)

**Where it’s explained and demoed:**  
`src/app/tab7/tab7.page.html`, `src/app/components/encapsulation-scoped/encapsulation-scoped.component.ts`, `src/app/components/encapsulation-none/encapsulation-none.component.ts`

**View encapsulation (style scoping / “Shadow DOM”)**

- **Emulated (default):** Angular adds a unique attribute to the component’s host and children and rewrites CSS so selectors only apply inside that component. Styles don’t leak out.
- **None:** No rewriting; component styles are global. The **EncapsulationNoneComponent** uses class `.encapsulation-leak`; the same class on a paragraph in the parent template gets styled too (“leak”).
- **ShadowDom:** Uses the browser’s real Shadow DOM.

**Change detection:** After async work (events, HTTP, timers), Angular walks the component tree and updates the DOM from bindings. **Zone.js** patches browser APIs so Angular knows when to run this check. In React you call `setState`; in Angular you often just set a property and Zone + change detection handle the update (unless you use OnPush or run outside the zone).

**How to read it in the project:**  
Open Tab 7 (Architecture); the encapsulation demo shows the scoped component (blue box, style only there) and the None component (red box + the paragraph below also red because of the same class).

---

## File map by concept

| Concept        | Main files |
|----------------|------------|
| Lifecycle      | `profile-card.component.ts`, `tab1.page.ts` |
| Data binding   | `tab2.page.*`, `profile-editor.component.*` |
| Emitters       | `task-form.component.ts`, `task-item.component.ts`, `tab3.page.*` |
| Observables    | `tab4.page.*` |
| HTTP           | `user-api.service.ts`, `tab5.page.*`, `app.module.ts` |
| DI             | `task.service.ts`, `user-api.service.ts`, `tab3.page.ts`, `tab5.page.ts`, `user-detail.component.ts` |
| Routing        | `tabs-routing.module.ts`, `user-detail.component.*`, `tab5.page.*`, `tab6.page.*` |
| Services       | `task.service.ts`, `user-api.service.ts` |
| Pipes          | `time-ago.pipe.ts`, `tab3.page.html`, `task-item.component.html` |
| Architecture   | `tab7.page.*`, `encapsulation-scoped.component.ts`, `encapsulation-none.component.ts` |

Use this map to jump to the right file when reviewing or extending a concept.
