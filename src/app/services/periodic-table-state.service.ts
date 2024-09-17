import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { BehaviorSubject, Observable, map, of } from 'rxjs';

export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

interface AppState {
  elements: PeriodicElement[];
  filter: string;
}

@Injectable({
  providedIn: 'root',
})
export class PeriodicTableStateService {
  private elementsSubject = new BehaviorSubject<PeriodicElement[]>([
    { position: 1, name: 'Hydrogen', weight: 1.008, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.94, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.81, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.011, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.007, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.999, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.998, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.18, symbol: 'Ne' },
  ]);

  private filterSubject = new BehaviorSubject<string>('');

  getFilteredElements(): Observable<PeriodicElement[]> {
    return this.elementsSubject
      .asObservable()
      .pipe(
        map((elements) =>
          elements.filter((element) =>
            element.name
              .toLowerCase()
              .includes(this.filterSubject.value.toLowerCase())
          )
        )
      );
  }

  updateFilter(filter: string): void {
    this.filterSubject.next(filter);
  }

  updateElement(updatedElement: PeriodicElement): void {
    const currentElements = this.elementsSubject.value;
    const updatedElements = currentElements.map((el) =>
      el.position === updatedElement.position ? updatedElement : el
    );
    this.elementsSubject.next(updatedElements);
  }

  addElement(newElement: PeriodicElement): void {
    const currentElements = this.elementsSubject.value;
    this.elementsSubject.next([...currentElements, newElement]);
  }

  deleteElement(elementToDelete: PeriodicElement): void {
    const currentElements = this.elementsSubject.value;
    const updatedElements = currentElements.filter(
      (el) => el.position !== elementToDelete.position
    );
    this.elementsSubject.next(updatedElements);
  }
}
