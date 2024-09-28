import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu'; 
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStoreService } from '../../services/local-store.service';

interface OWNERDETAIL {
  billName: string;
  companyName: string;
  mobile: number;
  email: string;
  address:string;
}


@Component({
  selector: 'app-manage-invoice',
  standalone: true, 
  imports: [MatIconModule,MatIconModule,MatDividerModule,MatButtonModule,
    MatGridListModule,MatCardModule,MatInputModule,MatFormFieldModule,
  MatSidenavModule,MatSlideToggleModule,MatMenuModule,MatListModule,
  MatDatepickerModule,MatNativeDateModule,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './manage-invoice.component.html',
  styleUrl: './manage-invoice.component.css'
})
export class ManageInvoiceComponent {

  customerDetails:any={
    billName: "Mobile Bill Shop",
    companyName: "Your Business Name",
    mobile: "1234567890",
    email: "test@gmail.com",
    address: "Your Full Address",

  }
  // ownerDetail
  constructor(private localStore:LocalStoreService){}

  getBillDetails(formValue: OWNERDETAIL[]) {
    let arrValues = Object.values(formValue)
    this.customerDetails.billName = arrValues[0];
    this.customerDetails.companyName = arrValues[1];
    this.customerDetails.mobile = arrValues[2];
    this.customerDetails.email = arrValues[3];
    this.customerDetails.address = arrValues[4];
    this.saveBillDetails();
  }

  saveBillDetails(){
    this.localStore.setLocalUserDetail(this.customerDetails)
    this.getBillDetails_local()
  }
  getBillDetails_local(){
    let localData = this.localStore.getLocalUserDetail()
    if(localData==null){
      this.localStore.setLocalUserDetail(this.customerDetails)
    }else{
      this.customerDetails = JSON.parse(`${localData}`)
    }
  }
 
  
  ngOnInit(){
    this.getBillDetails_local()
  }
}
