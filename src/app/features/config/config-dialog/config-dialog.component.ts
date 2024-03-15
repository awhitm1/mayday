import { Component, ElementRef, Inject, ViewChild, inject } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { DialogData } from '../config.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { Observable, map, startWith } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-config-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatFormField, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule, MatIconModule, MatChipsModule, MatAutocompleteModule, AsyncPipe, FormsModule],
  templateUrl: './config-dialog.component.html',
  styleUrl: './config-dialog.component.css'
})
export class ConfigDialogComponent {
  userConfigForm = new FormGroup({
    is_tech: new FormControl(''),
    is_admin: new FormControl(''),
    active: new FormControl(''),
    groups: new FormControl('')
  });

  separatorKeysCodes: number[] = [ENTER, COMMA];
  groupCtrl = new FormControl('');
  filteredGroups: Observable<string[]>;
  groups: string[] = ['Lemon'];
  allGroups: string[] = this.data.groups.map(group => group.name);

  @ViewChild('groupInput') groupInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log('Dialog Data: ', data);
    this.filteredGroups = this.groupCtrl.valueChanges.pipe(
      startWith(null),
      map((group: string | null) => (group ? this._filter(group) : this.allGroups.slice())),
    );
  }

  closeDialog() {
    this.userConfigForm.reset();

  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our group
    if (value) {
      this.groups.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.groupCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.groups.indexOf(fruit);

    if (index >= 0) {
      this.groups.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.groups.push(event.option.viewValue);
    this.groupInput.nativeElement.value = '';
    this.groupCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allGroups.filter(group => group.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    console.log('User Config Form: ', this.userConfigForm.value);
  }

}
