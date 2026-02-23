import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  CHILD COMPONENT — ProfileEditorComponent                       │
 * │                                                                 │
 * │  React equivalent:                                              │
 * │    @Input()  ≈  props (data flows DOWN from parent)             │
 * │    @Output() ≈  callback prop like onSave={fn} (Day 3 topic)   │
 * │                                                                 │
 * │  KEY DIFFERENCE FROM REACT:                                     │
 * │  In React, props are immutable. You can't do props.name = 'x'. │
 * │  In Angular, @Input objects are passed by reference. When we    │
 * │  bind [(ngModel)]="user.name", it mutates the SAME object the  │
 * │  parent holds — so the parent's view updates instantly.         │
 * │  This is like passing a ref in React Native, not a copy.       │
 * └─────────────────────────────────────────────────────────────────┘
 */

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
}

@Component({
  selector: 'app-profile-editor',
  standalone: false,
  templateUrl: './profile-editor.component.html',
})
export class ProfileEditorComponent {

  // ── @Input ≈ React props ──────────────────────────────────────
  // Parent passes this via: <app-profile-editor [user]="user">
  // Angular equivalent of: <ProfileEditor user={user} />
  @Input() user!: UserProfile;

  // ── @Output ≈ React callback prop (brief preview for Day 3) ──
  // Parent listens via: <app-profile-editor (saved)="onSave($event)">
  // Angular equivalent of: <ProfileEditor onSave={(data) => handleSave(data)} />
  @Output() saved = new EventEmitter<UserProfile>();

  onSave(): void {
    this.saved.emit({ ...this.user });
  }
}
