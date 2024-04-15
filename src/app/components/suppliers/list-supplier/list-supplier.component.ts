import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Supplier } from '../../../models/supplier';
import { SupplierService } from '../../../services/supplier.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScreeningDialogComponent } from '../screening-dialog/screening-dialog.component';
@Component({
  selector: 'app-list-supplier',
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  imports: [
    MatButtonModule, 
    RouterModule,
    MatTooltipModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
  ],
  templateUrl: './list-supplier.component.html',
  styleUrl: './list-supplier.component.css'
})
export class ListSupplierComponent {

  displayedColumns: string[] = ['taxId', 'businessName', 'commercialName', 'country', 'lastEdition', 'expand'];
  expandedElement !: Supplier | null;

  dataSource = new MatTableDataSource<Supplier>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private supplierService: SupplierService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getSuppliers() 
  }

  openDialog(_name: string, _country: string ): void {
    const dialogRef = this.dialog.open(ScreeningDialogComponent, {
      data: { name: _name, country: _country }, width: '800px'
    });
  }

  getSuppliers() {
    this.supplierService.getSuppliers().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteSupplier(id: number) {
    this.dialog.open(DeleteDialogComponent, {
      width: '500px'
    }).afterClosed().subscribe((response) => {
      if (response) {
        this.supplierService.deleteSupplier(id).subscribe({
          next: () => {
            this.snackBar.open('Supplier deleted successfully', 'Close', {
              duration: 3000
            });
            this.getSuppliers()},
          error: () => {
            this.snackBar.open('Error deleting supplier', 'Close', {
              duration: 3000
            });
          }
        })
      }
    })
  }

}
