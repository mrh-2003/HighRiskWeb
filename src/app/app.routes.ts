import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListSupplierComponent } from './components/suppliers/list-supplier/list-supplier.component';
import { AddUpdateSupplierComponent } from './components/suppliers/add-update-supplier/add-update-supplier.component';

export const routes: Routes = [
    { path: '', redirectTo: 'suppliers/add', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'suppliers', component: ListSupplierComponent},
    { path: 'suppliers/add', component: AddUpdateSupplierComponent},
    { path: 'suppliers/edit/:id', component: AddUpdateSupplierComponent},
    { path: '**', redirectTo: 'suppliers'}
];
