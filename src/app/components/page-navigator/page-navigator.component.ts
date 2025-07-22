import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-navigator',
  standalone: true,
  templateUrl: './page-navigator.component.html',
})
export class PageNavigatorComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  onPrev() {
    this.prev.emit();
  }

  onNext() {
    this.next.emit();
  }
}
