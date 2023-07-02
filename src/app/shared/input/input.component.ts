import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Input() label: string = 'Input field';
  @Input() type: string = 'text';
  @Input() title: string = 'input';
  @Input() control: FormControl = new FormControl('');
  @Input() placeholder: string = 'Input field';
  @Input() error: string = '';
  hide = true;
}
