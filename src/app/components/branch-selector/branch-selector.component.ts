import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Branch } from '../../apis/branches';

@Component({
  selector: 'app-branch-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './branch-selector.component.html',
})
export class BranchSelectorComponent {
  @Input() branches: Branch[] = [];
  @Input() selectedBranchId: number | null = null;
  @Input() loading: boolean = false;
  @Input() error: string | null = null;
  @Output() branchChange = new EventEmitter<number>();

  onChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.branchChange.emit(Number(value));
  }
}
