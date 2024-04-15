import { Component } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { SupplierService } from '../../../services/supplier.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-add-update-supplier',
  standalone: true,
  imports: [MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    MatError,
    MatSnackBarModule, 
    MatAutocompleteModule,
    AsyncPipe,
  ],
  templateUrl: './add-update-supplier.component.html',
  styleUrl: './add-update-supplier.component.css'
})

export class AddUpdateSupplierComponent {
  form !: FormGroup;
  id!: number;
  text = 'Create';

  myControl = new FormControl('', [Validators.required]);
  options: string[] = [
    'Afghanistan',
    'Argentina',
    'Australia',
    'Brazil',
    'Canada',
    'Chile',
    'China',
    'Colombia',
    'Egypt',
    'France',
    'Germany',
    'India',
    'Italy',
    'Japan',
    'Mexico',
    'Peru',
    'Russia',
    'Spain',
    'United Kingdom',
    'United States'
  ];
  filteredOptions!: Observable<string[]>;
  constructor(private supplierService: SupplierService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.id = this.route.snapshot.params['id'];
    this.form = this.fb.group({
      businessName: ['', [Validators.required]],
      commercialName: ['', [Validators.required]],
      taxId: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      website: ['', [Validators.required, Validators.pattern('^(https:\/\/).*\..*$')]],
      address: ['', [Validators.required]],
      annualBilling: ['', [Validators.required, Validators.min(0)]],
    });
    if (this.id) {
      this.text = 'Update';
      this.supplierService.getSupplier(this.id).subscribe({
        next: (supplier) => {
          this.myControl.setValue(supplier.country);
          this.form.patchValue(supplier);
        }
      });
    }
  }
  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  onSubmit() {
    let supplier = this.form.value;
    supplier.country = this.myControl.value;
    supplier.phoneNumber = supplier.phoneNumber.toString();
    supplier.lastEdition = new Date();
    supplier.id = 0;
    if (this.id == null) {
      this.supplierService.createSupplier(supplier).subscribe({
        next: () => {
          this.snackBar.open('Supplier created successfully', 'Close', {
            duration: 3000
          });
          this.router.navigate(['/suppliers']);
        },
        error: () => {
          this.snackBar.open('Error creating supplier', 'Close', {
            duration: 3000
          });
        }
      });
    }
    else {
      supplier.id = this.id;
      this.supplierService.updateSupplier(supplier).subscribe({
        next: () => {
          this.snackBar.open('Supplier updated successfully', 'Close', {
            duration: 3000
          });
          this.router.navigate(['/suppliers']);
        },
        error: () => {
          this.snackBar.open('Error updating supplier', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }
}
