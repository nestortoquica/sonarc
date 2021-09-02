import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { 
  MatButtonModule, 
  MatFormFieldModule, 
  MatGridListModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatTableModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatMenuModule,
  MatDialogModule,
  MatTabsModule,
  MatDatepickerModule,
  MatNativeDateModule, 
  MAT_DATE_FORMATS, 
  NativeDateAdapter, 
  DateAdapter,
  MatToolbarModule,
  MatSortModule,
  MatListModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  MatBadgeModule,
  MatExpansionModule,
  MatChipsModule
} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';

const MaterialComponets = [
  MatButtonModule,
  MatFormFieldModule,
  MatGridListModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatTableModule,
  MatPaginatorModule,
  MatSnackBarModule,
  FormsModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatMenuModule,
  MatDialogModule,
  MatTabsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatToolbarModule,
  MatSortModule,
  MatListModule,
  DragDropModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  MatBadgeModule,
  MatExpansionModule,
  OwlDateTimeModule, 
  OwlNativeDateTimeModule,
  MatChipsModule
]

const MY_DATE_FORMATS = {
  parse: {
      dateInput: { day: 'numeric', month: 'numeric', year: 'numeric' }
  },
  display: {
      dateInput: 'input',
      monthYearLabel: { year: 'numeric', month: 'short' },
      dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
      monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};

export class AppDateAdapter extends NativeDateAdapter {

  format(date: Date, displayFormat: Object): string {
      if (displayFormat === 'input') {
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
      } else {
          return date.toDateString();
      }
  }
}

@NgModule({  
  imports: [ MaterialComponets ],
  exports: [ MaterialComponets ],
  providers: [{provide: DateAdapter, useClass: AppDateAdapter}, {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}],
})
export class MaterialModule { }