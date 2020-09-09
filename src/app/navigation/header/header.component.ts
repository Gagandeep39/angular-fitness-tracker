import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output()
  toggleSideNav = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onToggleSideNav() {
    this.toggleSideNav.emit();
  }
}
