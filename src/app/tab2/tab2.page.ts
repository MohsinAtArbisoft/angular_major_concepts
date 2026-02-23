import { Component } from '@angular/core';
import { UserProfile } from '../components/profile-editor/profile-editor.component';

/**
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  DAY 2: DATA BINDING                                           │
 * │                                                                 │
 * │  Angular has 4 types of data binding:                           │
 * │                                                                 │
 * │  TYPE             SYNTAX           DIRECTION                    │
 * │  ─────────────────────────────────────────────                  │
 * │  Interpolation    {{ expr }}       Component → DOM (one-way)    │
 * │  Property         [prop]="expr"    Component → DOM (one-way)    │
 * │  Event            (event)="fn()"   DOM → Component (one-way)    │
 * │  Two-way          [(ngModel)]="x"  Component ↔ DOM (two-way)   │
 * │                                                                 │
 * │  React equivalents:                                             │
 * │  {{ name }}       ≈  {name}                                     │
 * │  [src]="url"      ≈  src={url}                                  │
 * │  (click)="fn()"   ≈  onPress={() => fn()}                      │
 * │  [(ngModel)]="x"  ≈  value={x} onChange={e => setX(e.value)}   │
 * │  @Input()         ≈  props (but passed by REFERENCE, not copy) │
 * └─────────────────────────────────────────────────────────────────┘
 */

const DEFAULT_USER: UserProfile = {
  name: 'Mohsin Raza',
  email: 'mohsin@example.com',
  role: 'Mobile Engineer',
  avatarUrl: 'https://i.pravatar.cc/150?u=user-1',
};

@Component({
  selector: 'app-tab2',
  standalone: false,
  templateUrl: './tab2.page.html',
})
export class Tab2Page {

  // ── State used across all binding demos ───────────────────────
  user: UserProfile = { ...DEFAULT_USER };
  clickCount = 0;
  typedText = '';
  isPreviewVisible = true;

  // ── Event binding handlers ────────────────────────────────────

  incrementCount(): void {
    this.clickCount++;
  }

  /**
   * Ionic's (ionInput) event passes a CustomEvent with detail.value.
   * In React Native you'd do: onChangeText={(text) => setText(text)}
   * Here we manually wire [value] + (ionInput) = one-way in + one-way out.
   * Section 4 shows how [(ngModel)] does both in one shot.
   */
  onTyping(event: Event): void {
    const value = (event as CustomEvent).detail.value;
    this.typedText = value ?? '';
  }

  resetUser(): void {
    this.user = { ...DEFAULT_USER };
  }

  // ── Child → Parent (preview for Day 3: Emitters) ─────────────
  onUserSaved(savedUser: UserProfile): void {
    console.log('[Tab2 Parent] Received save event from child:', savedUser);
  }
}
