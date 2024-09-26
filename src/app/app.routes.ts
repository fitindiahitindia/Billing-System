import { Routes } from '@angular/router';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ManageInvoiceComponent } from './components/manage-invoice/manage-invoice.component';

export const routes: Routes = [
    {path:"",redirectTo:"/invoice", pathMatch: 'full'},
    {path:"invoice", component:InvoiceComponent},
    {path:"manage-invoice", component:ManageInvoiceComponent}
];
