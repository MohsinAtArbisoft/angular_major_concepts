import { Component, ViewEncapsulation } from '@angular/core';

/**
 * ViewEncapsulation.None: no style encapsulation.
 * The .encapsulation-leak class will apply to ANY element with that class
 * in the app, including elements in parent templates. That's the "leak."
 */
@Component({
  selector: 'app-encapsulation-none',
  standalone: false,
  template: `<div class="encapsulation-leak">None: this box uses encapsulation None. The class "encapsulation-leak" also styles the paragraph below (outside this component).</div>`,
  styles: [`
    .encapsulation-leak {
      border: 2px solid var(--ion-color-danger);
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 12px;
      background: #ffebee;
      font-weight: bold;
    }
  `],
  encapsulation: ViewEncapsulation.None,
})
export class EncapsulationNoneComponent {}
