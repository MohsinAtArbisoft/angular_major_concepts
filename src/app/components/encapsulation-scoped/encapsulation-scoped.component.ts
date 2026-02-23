import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Default: ViewEncapsulation.Emulated.
 * Angular adds a unique attribute to this component's host and rewrites
 * the CSS so .scoped-demo only matches inside this component.
 */
@Component({
  selector: 'app-encapsulation-scoped',
  standalone: false,
  template: `<div class="scoped-demo">Emulated (default): this box is scoped. Same class name elsewhere won’t get this style.</div>`,
  styles: [`
    .scoped-demo {
      border: 2px solid var(--ion-color-primary);
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 12px;
      background: #e8f0fe;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
})
export class EncapsulationScopedComponent {}
