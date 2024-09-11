import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Dodaj animacje
import { EditElementDialogComponent } from '../edit-element-dialog/edit-element-dialog.component';

export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

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
    MatButtonModule,
    // BrowserAnimationsModule, // Dodaj BrowserAnimationsModule tutaj
  ],
})
export class PeriodicTableComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'actions',
  ];
  dataSource: PeriodicElement[] = [];
  filteredData: PeriodicElement[] = [];
  filterValue: string = '';

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData() {
    this.dataSource = [...ELEMENT_DATA];
    this.filteredData = [...this.dataSource];
    console.log('DataSource initialized:', this.dataSource);
  }

  applyFilter(event: any) {
    this.filterValue = event.target.value.trim().toLowerCase();
    console.log('Filter value:', this.filterValue);

    setTimeout(() => {
      this.filteredData = this.dataSource.filter((element) => {
        return (
          element.name.toLowerCase().includes(this.filterValue) ||
          element.symbol.toLowerCase().includes(this.filterValue) ||
          element.position.toString().includes(this.filterValue) ||
          element.weight.toString().includes(this.filterValue)
        );
      });
      console.log('Filtered Data:', this.filteredData);
    }, 2000); // Filtrowanie po 2s
  }

  openEditDialog(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditElementDialogComponent, {
      width: '30%',
      height: '40%',
      data: { ...element },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource = this.dataSource.map((el) =>
          el.position === result.position ? result : el
        );
        this.filteredData = [...this.dataSource];
      }
    });
  }
}
