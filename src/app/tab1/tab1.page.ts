import { Component } from '@angular/core';

/**
 * Tab 1 — Profile page.
 * This is our Day 1 playground. The parent passes a userId to the ProfileCard child.
 * Try changing selectedUserId to see ngOnChanges fire in ProfileCard.
 */
@Component({
  selector: 'app-tab1',
  standalone: false,
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Day 1: Lifecycle Hooks</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Parent passes userId down to child via @Input -->
      <app-profile-card [userId]="selectedUserId"></app-profile-card>

      <ion-button expand="block" (click)="switchUser()">
        Switch User (triggers ngOnChanges)
      </ion-button>
    </ion-content>
  `,
})
export class Tab1Page {
  selectedUserId = 'user-1';

  switchUser(): void {
    this.selectedUserId = this.selectedUserId === 'user-1' ? 'user-2' : 'user-1';
  }
}
