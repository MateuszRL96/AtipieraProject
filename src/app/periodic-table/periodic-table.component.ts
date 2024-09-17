import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable, map } from 'rxjs';
import {
  PeriodicTableStateService,
  PeriodicElement,
} from '../services/periodic-table-state.service';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditElementDialogComponent } from '../edit-element-dialog/edit-element-dialog.component';

@Component({
  selector: 'app-periodic-table',
  standalone: true,
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
})
export class PeriodicTableComponent implements OnInit {
  elements$: Observable<PeriodicElement[]> | undefined;
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'actions',
  ];
  constructor(
    private stateService: PeriodicTableStateService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.elements$ = this.stateService.getFilteredElements();
  }

  applyFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value;
    this.stateService.updateFilter(filterValue);
  }

  editElement(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditElementDialogComponent, {
      width: '30%',
      height: '40%',
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.stateService.updateElement(result);
      }
    });
  }

  deleteElement(element: PeriodicElement): void {
    console.log('Delete', element);
  }
}
