import { bootstrapApplication } from '@angular/platform-browser';
import { PeriodicTableComponent } from './app/periodic-table/periodic-table.component';
import { AppAnimations } from './app/app-animations';

bootstrapApplication(PeriodicTableComponent, {
  providers: AppAnimations,
}).catch((err) => console.error(err));
