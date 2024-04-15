import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TheWorldBank } from '../../../models/the-world-bank';
import { OffshoreLeaks } from '../../../models/offshore-leaks';
import { Ofac } from '../../../models/ofac';
import { SupplierService } from '../../../services/supplier.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
export interface SearchData {
  name: string;
  country: string;
}

@Component({
  selector: 'app-screening-dialog',
  standalone: true,
  imports: [MatTabsModule, MatTableModule, MatPaginatorModule, MatLabel, MatFormField, MatDialogModule, MatInput],
  templateUrl: './screening-dialog.component.html',
  styleUrl: './screening-dialog.component.css'
})
export class ScreeningDialogComponent {
  displayedColumnsTWB: string[] = ['FirmName', 'Address', 'Country', 'FromDate', 'ToDate', 'Grounds'];
  displayedColumnsOL: string[] = ['Entity', 'Jurisdiction', 'LinkedTo', 'DataFrom'];
  displayedColumnsOFAC: string[] = ['Name', 'Address', 'Type', 'Program', 'List', 'Score'];
  dataSourceTWB !: MatTableDataSource<TheWorldBank>;
  dataSourceOL !: MatTableDataSource<OffshoreLeaks>;
  dataSourceOFAC !:MatTableDataSource<Ofac>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private supplierService: SupplierService,
    public dialogRef: MatDialogRef<ScreeningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SearchData,
  ) { }

  ngOnInit() {
    this.getTWB();
    this.getOL();
    this.getOFAC();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getTWB() {
    this.supplierService.searchTheWorldBank(this.data.name, this.data.country).subscribe((res) => {
      this.dataSourceTWB = new MatTableDataSource(res);
      this.dataSourceTWB.paginator = this.paginator;
      this.dataSourceTWB.sort = this.sort;
    });
  }
  getOL() {
    this.supplierService.searchOffshoreLeaks(this.data.name, this.data.country).subscribe((res) => {
      this.dataSourceOL = new MatTableDataSource(res);
      this.dataSourceOL.paginator = this.paginator;
      this.dataSourceOL.sort = this.sort;
    });
  }
  getOFAC() {
    this.supplierService.searchOfac(this.data.name).subscribe((res) => {
      this.dataSourceOFAC = new MatTableDataSource(res);
      this.dataSourceOFAC.paginator = this.paginator;
      this.dataSourceOFAC.sort = this.sort;
    });
  }

  applyFilterTWB(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTWB.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceTWB.paginator) {
      this.dataSourceTWB.paginator.firstPage();
    }
  }
  applyFilterOL(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceOL.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceOL.paginator) {
      this.dataSourceOL.paginator.firstPage();
    }
  }
  applyFilterOFAC(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceOFAC.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceOFAC.paginator) {
      this.dataSourceOFAC.paginator.firstPage();
    }
  }
}
