import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { IUser } from 'src/app/shared/models/user.model';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-tab',
  templateUrl: './admin-tab.component.html',
  styleUrls: ['./admin-tab.component.css'],
})
export class AdminTabComponent {
  users: IUser[] = [];
  filteredUsers: IUser[] = [];
  isLoading = false;
  form: FormGroup = new FormGroup({});
  query = new FormControl('');

  constructor(private service: AdminService, public dialog: MatDialog) {
    this.isLoading = true;

    this.service.getUsers().subscribe((users) => {
      this.users = users;
      this.filteredUsers = users;
      this.isLoading = false;
    });

    this.form = new FormGroup({
      query: this.query,
    });
  }

  search() {
    this.filteredUsers = this.users.filter((user) => {
      return user.username.includes(this.form.value.query);
    });
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    id: number,
    userId: number,
    role: string | null
  ): void {
    if (id == 1) {
      let d = this.dialog.open(DeleteDialog, {
        width: '300px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: userId,
      });
      d.afterClosed().subscribe((res) => {
        if (res) {
          this.users = this.users.filter((user) => user.id != res);
          this.filteredUsers = this.filteredUsers.filter(
            (user) => user.id != res
          );
        }
      });
    } else if (id == 0) {
      let d = this.dialog.open(PromoteDialog, {
        width: '300px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: { id: userId, role: role },
      });

      d.afterClosed().subscribe((res) => {
        console.log(res);
        if (res) {
          this.users = this.users.map((user) => {
            if (user.id == res.id) {
              user.role = res.role;
              if (res.role === 'Client') user.credits = 100;
            }
            return user;
          });
          this.filteredUsers = this.filteredUsers.map((user) => {
            if (user.id == res.id) {
              user.role = res.role;
              if (res.role === 'Client') user.credits = 100;
            }
            return user;
          });
        }
      });
    }
  }
}

@Component({
  selector: 'delete-dialog',
  // templateUrl: 'dialog-animations-example-dialog.html',
  template: `
    <h1 mat-dialog-title>Delete User</h1>
    <div mat-dialog-content>Are you sure you want to delete this user?</div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close cdkFocusInitial>No</button>
      <button mat-button (click)="submit()">Yes</button>
    </div>
  `,
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    NgIf,
    NgFor,
  ],
})
export class DeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>,
    private service: AdminService,
    @Inject(MAT_DIALOG_DATA) data: string
  ) {
    this.userId = parseInt(data);
  }

  userId = 0;

  submit() {
    this.service.deleteUser(this.userId).subscribe((res) => {
      this.dialogRef.close(this.userId);
    });
  }
}

import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'promote-dialog',
  template: `
    <h1 mat-dialog-title>Promote user</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>Choose an option</mat-label>
        <form action="" [formGroup]="form">
          <mat-select formControlName="pickedRole">
            <mat-option value="Client" *ngIf="role !== 'Client'"
              >Client</mat-option
            >
            <mat-option value="Admin" *ngIf="role !== 'Admin'"
              >Admin</mat-option
            >
            <mat-option value="Servicer" *ngIf="role !== 'Servicer'"
              >Servicer</mat-option
            >
            <mat-option value="Manager" *ngIf="role !== 'Manager'"
              >Manager</mat-option
            >
          </mat-select>
        </form>
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close cdkFocusInitial>No</button>
      <button mat-button (click)="submit()">Yes</button>
    </div>
  `,
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    NgIf,
    NgFor,
    CommonModule,
  ],
})
export class PromoteDialog {
  constructor(
    public dialogRef: MatDialogRef<PromoteDialog>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) data: { id: number; role: string },
    private service: AdminService
  ) {
    this.role = data.role;
    this.userId = data.id;
  }

  submit() {
    if (this.form.valid) {
      this.service
        .promote(this.userId, this.form.value.pickedRole!)
        .subscribe((res) => {
          console.log(res);
          this.dialogRef.close({
            id: this.userId,
            role: this.form.value.pickedRole,
          });
        });
    }
  }

  userId = 0;

  role: string = '';
  disableSelect = new FormControl(false);
  pickedRole = new FormControl('', Validators.required);
  form = new FormGroup({
    pickedRole: this.pickedRole,
  });
}
