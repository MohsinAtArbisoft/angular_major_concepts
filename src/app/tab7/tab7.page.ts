import { Component } from '@angular/core';

/**
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  DAY 8: ANGULAR ARCHITECTURE                                   │
 * │                                                                 │
 * │  Key concepts:                                                 │
 * │  - View Encapsulation (Emulated ≈ Shadow DOM, scoped styles)   │
 * │  - Change Detection (when the view updates)                     │
 * │  - Zone.js (how Angular knows async work happened)              │
 * │  - Component = template + class + metadata                      │
 * └─────────────────────────────────────────────────────────────────┘
 */

@Component({
  selector: 'app-tab7',
  standalone: false,
  templateUrl: './tab7.page.html',
})
export class Tab7Page {}
