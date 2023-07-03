import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css'],
})
export class DepositComponent {
  forms = new FormGroup({});
  amount = new FormControl('', [Validators.required, Validators.minLength(1)]);

  constructor(private store: Store<AppState>) {}

  get amountError() {
    if (this.amount.hasError('required')) return 'Amount is required';
    if (this.amount.hasError('minlength'))
      return 'Amount must be at least 1 characters long';
    return '';
  }

  loading$ = this.store.select((state) => state.auth.loading);
  error$ = this.store.select((state) => state.auth.error);

  deposit() {
    if (this.amount.valid) {
      this.store.dispatch({ type: 'DEPOSIT', payload: this.amount.value });
      // this.amount.reset();
    }
  }
}
