import { Component, ElementRef, Inject, OnInit, ViewChild, inject } from '@angular/core';
import {COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { DialogData } from '../config.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { Observable, map, startWith } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Group } from 'src/app/shared/models/group.model';
import { User } from 'src/app/shared/models/user.model';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-config-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatFormField, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatChipsModule, MatAutocompleteModule, AsyncPipe, FormsModule, MatSlideToggleModule, ReactiveFormsModule],
  templateUrl: './config-dialog.component.html',
  styleUrl: './config-dialog.component.css'
})
export class ConfigDialogComponent implements OnInit{
  optionsTF: string[] = ['true', 'false'];


  userConfigForm: FormGroup = new FormGroup({
    is_tech: new FormControl<boolean>(false),
    is_admin: new FormControl<boolean>(false),
    active: new FormControl<boolean>(false),
    groups: new FormControl<Group[]>([])
  });

  separatorKeysCodes: number[] = [ENTER, COMMA];
  groupCtrl = new FormControl();
  filteredGroups: Observable<Group[]>;

  addOnBlur = true;
  // readonly separatorKeysCodes = [ENTER, COMMA] as const;
  groupsList: string[] = this.data.groups.map(group => group.name);

  user: User = this.data.user;
  groups: Group[] = this.data.groups;
  allGroups: Group[] = this.data.groups;

  @ViewChild('groupInput') groupInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private formBuilder: FormBuilder) {
    console.log('Dialog Data: ', data);
    this.filteredGroups = this.groupCtrl.valueChanges.pipe(
      startWith(null),
      map((group: string | null) => group ? this._filter(group) : this.allGroups.slice())
    );
  }

  private _filter(value: string): Group[] {
    const filterValue = value;

    return this.allGroups.filter(group => group.name.indexOf(filterValue) === 0);
  }

  ngOnInit(){
    this.initializeForm();
  }

  initializeForm() {
    this.userConfigForm = this.formBuilder.group({
      is_tech: [this.user.is_tech],
      is_admin: [this.user.is_admin],
      active: [this.user.active],
      groups: [this.user.groups]
    });
  }

  closeDialog() {


  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our group
    if (value) {
      this.groupsList.push(value);

    }

    // Clear the input value
    event.chipInput!.clear();

    this.groupCtrl.setValue(null);
  }

  remove(group: Group): void {
    const index = this.groups.indexOf(group);

    if (index >= 0) {
      this.groups.splice(index, 1);

      this.announcer.announce(`Removed ${group.name}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.groups.push(event.option.value);
    this.groupInput.nativeElement.value = '';
    this.groupCtrl.setValue(null);
  }

  onSubmit() {
    console.log('User Config Form: ', this.userConfigForm.value);
  }

}
