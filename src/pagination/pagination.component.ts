import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { IPagination } from './pagination.models';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnChanges {
  isPreviousButtonEnabled = false;
  isNextButtonEnabled = true;

  @Input() data: IPagination<any>;
  @Output() pageNumberChanged = new EventEmitter<number>();

  ngOnChanges(): void {
    this.isPreviousButtonEnabled = this.data.pageNumber !== 1;

    if (this.data.pageNumber === 1) {
      this.isNextButtonEnabled = this.data.content.length < this.data.total;
    } else {
      this.isNextButtonEnabled = (this.data.pageSize * (this.data.pageNumber - 1) + this.data.content.length) < this.data.total;
    }
  }

  goToNextPage(): void {
    this.pageNumberChanged.emit(this.data.pageNumber + 1);
  }

  goToPreviousPage(): void {
    this.pageNumberChanged.emit(this.data.pageNumber - 1);
  }
}
