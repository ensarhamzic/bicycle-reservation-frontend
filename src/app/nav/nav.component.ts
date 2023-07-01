import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  hidden = true;
  constructor() {}
  toggleNav() {
    this.hidden = !this.hidden;
  }
}

// const openNavButton = document.querySelector('#open-nav');
// const closeNavButton = document.querySelector('#close-nav');
// const nav = document.querySelector('nav');
// openNavButton.addEventListener('click', function () {
//   nav.classList.toggle('hide');
// });
// closeNavButton.addEventListener('click', function () {
//   nav.classList.toggle('hide');
// });
