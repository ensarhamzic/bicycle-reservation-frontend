import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { changeUsername, changePassword, deleteAcc, deleteImage, uploadImage } from 'src/app/state/auth/auth.actions';


@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
})
export class UsersPageComponent {
  /**
   *
   */
  constructor(private store: Store<AppState>, public dialog: MatDialog) {
    this.user$.subscribe((user) => {
      this.user = user;
    });
    this.formUsername = new FormGroup({
      username: this.username,
    });
    this.formPassword = new FormGroup({
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
    this.formDelete = new FormGroup({
      delete: this.deletePassword,
    });
  }

  formUsername: FormGroup = new FormGroup({});
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  formPassword: FormGroup = new FormGroup({});
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  confirmPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  formDelete: FormGroup = new FormGroup({});
  deletePassword = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  loading$ = this.store.select((state) => state.auth.loading);
  error$ = this.store.select((state) => state.auth.error);

  user$ = this.store.select((state) => state.auth.user);
  user: any = {};

  get usernameError() {
    if (this.username.hasError('required')) return 'Username is required';
    if (this.username.hasError('minlength'))
      return 'Username must be at least 3 characters long';
    return '';
  }

  get passwordError() {
    if (this.password.hasError('required')) return 'Password is required';
    if (this.password.hasError('minlength'))
      return 'Password must be at least 8 characters long';
    return '';
  }

  get confirmPasswordError() {
    if (this.confirmPassword.hasError('required'))
      return 'Confirm password is required';
    if (this.confirmPassword.hasError('minlength'))
      return 'Confirm password must be at least 8 characters long';
    return '';
  }

  get deletePasswordError() {
    if (this.deletePassword.hasError('required'))
      return 'Password is required';
    if (this.deletePassword.hasError('minlength'))
      return 'Password must be at least 8 characters long';
    return '';
  }


  changeUsername() {
    if (this.formUsername.invalid) return;
    console.log(this.username.value);
    this.store.dispatch(changeUsername({ username: this.username.value as string }));
  }

  changePassword() {
    if (this.formPassword.invalid) return;
    console.log(this.password.value);
    this.store.dispatch(changePassword({ oldPassword: this.password.value as string, newPassword: this.confirmPassword.value as string}));
  }

  deleteAcc() {
    if (this.formDelete.invalid) return;
    console.log(this.deletePassword.value);
    this.store.dispatch(deleteAcc({ password: this.deletePassword.value as string }));
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    if (this.user.imageUrl) {
      this.dialog.open(DialogAnimationsExampleDialog, {
        width: '350px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    } else{
      this.dialog.open(DialogAnimationsUploadDialog, {
        width: '350px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  // templateUrl: 'dialog-animations-example-dialog.html',
  template: `
    <h1 mat-dialog-title>Delete file</h1>
    <div mat-dialog-content>Would you like to delete your profile picture?</div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close style="margin-right: 8px;">No</button>
      <button
        mat-button
        mat-dialog-close
        cdkFocusInitial
        style="margin-right: 8px;"
        (click)="deleteImage()"
      >
        Ok
      </button>
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>, private store: Store<AppState>) {}
  deleteImage(){
    this.store.dispatch(deleteImage());
  }
}

@Component({
  selector: 'dialog-animations-upload-dialog',
  // templateUrl: 'dialog-animations-example-dialog.html',
  template: `
    <h1 mat-dialog-title>Upload Image</h1>
    <div mat-dialog-content>
      <input
        type="file"
        accept="image/*"
        formControlName="image"
        (change)="change($event)"
      />
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close style="margin-right: 8px;">No</button>
      <button
        mat-button
        mat-dialog-close
        cdkFocusInitial
        style="margin-right: 8px;"
        (click)="upload()"
      >
        Upload
      </button>
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule],
})
export class DialogAnimationsUploadDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>, private store: Store<AppState>) {}

  forms = new FormGroup({});
  image = new FormControl('', [Validators.required]);

  imageFile: File | null = null;

  change(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files.item(0);
    this.imageFile = file;
  }

  upload() {
    if (this.forms.invalid) return;
    this.store.dispatch(uploadImage({ image: this.imageFile as File }));
  }
}
