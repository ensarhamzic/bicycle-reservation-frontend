import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { deposit } from 'src/app/state/auth/auth.actions';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css'],
})
export class DepositComponent {
  forms = new FormGroup({});
  // amount = new FormControl('', [Validators.required, Validators.minLength(1)]);//it needs to be a number
  amount = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern('^[0-9]*$'),
  ]);
  amountInNum = Number(this.amount.value);
  constructor(private store: Store<AppState>) {}

  get amountError() {
    if (this.amount.hasError('required')) return 'Amount is required';
    if (this.amount.hasError('minlength'))
      return 'Amount must be at least 1 characters long';
    if (this.amount.hasError('pattern')) return 'Amount must be a number';
    return '';
  }

  loading$ = this.store.select((state) => state.auth.loading);
  error$ = this.store.select((state) => state.auth.error);

  deposit() {
    if (this.amount.valid) {
      this.amountInNum = Number(this.amount.value);
      this.store.dispatch(deposit({ amount: this.amountInNum }));
      this.amount.reset();
    }
  }
}
