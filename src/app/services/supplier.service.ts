import { Injectable } from '@angular/core';
import { Supplier } from '../models/supplier';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { OffshoreLeaks } from '../models/offshore-leaks';
import { TheWorldBank } from '../models/the-world-bank';
import { Ofac } from '../models/ofac';
@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  rootURL = environment.apiUrl + 'api/Supplier';

  constructor(private http: HttpClient) { }

  getHeader(){
    let token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    }
  }

  getSuppliers() {
    return this.http.get<Supplier[]>(this.rootURL, this.getHeader());
  }
  getSupplier(id: number) {
    return this.http.get<Supplier>(this.rootURL + '/' + id, this.getHeader());
  }
  createSupplier(supplier: Supplier) {
    return this.http.post(this.rootURL, supplier, this.getHeader());
  }
  updateSupplier(supplier: Supplier) {
    return this.http.put(this.rootURL + '/' + supplier.id, supplier, this.getHeader());
  }
  deleteSupplier(id: number) {
    return this.http.delete(this.rootURL + '/' + id, this.getHeader());
  }

  searchOfac(name: string){
    return this.http.get<Ofac[]>(this.rootURL + '/searchOfac/' + name, this.getHeader());
  }
  searchOffshoreLeaks(name: string, country: string){
    return this.http.get<OffshoreLeaks[]>(this.rootURL + '/searchOffshoreLeaks/' + name + "/" + country, this.getHeader());
  }
  searchTheWorldBank(name: string, country: string){
    return this.http.get<TheWorldBank[]>(this.rootURL + '/searchTheWorldBank/' + name + "/" + country, this.getHeader());
  }

}
