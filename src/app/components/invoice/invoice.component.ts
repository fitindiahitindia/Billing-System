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
import { MatNativeDateModule } from '@angular/material/core'; // Import this
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocalStoreService } from '../../services/local-store.service';
interface CUSTOMERDETAILS {
  name: string;
  lname: string;
  mobile: number;
  email: string;
  date: string;
  isDiscount:boolean;
  discount:number;
}
interface ADDITEMSDETAILS {
  itemIdName: string;
  itemName: string;
  itemPrice: number;
  itemQuantity: number;
  warranty: boolean;
  warrantyDate: string;
}
@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    RouterModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatSlideToggleModule,
    FormsModule,
    FormsModule,
    MatMenuModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css',
})
export class InvoiceComponent {
  

  warranty: boolean = false;
  isDiscount:boolean=false;
  invoiceDetails: any[] = [];
  invoiceAddItem: ADDITEMSDETAILS[] = [];
  addItems: ADDITEMSDETAILS = {
    itemIdName: '',
    itemName: '',
    itemPrice: 0,
    itemQuantity: 0,
    warranty: false,
    warrantyDate: "",
  };
  customerDetails:any={
    name: "",
    lname: "",
    mobile: "",
    email: "",
    date: "",
    invoiceNo:"",
    discount:0,
    total:"",

  }
  ownerDetails:any={
    billName: "Mobile Bill Shop",
    companyName: "Your Business Name",
    mobile: "1234567890",
    email: "test@gmail.com",
    address: "Your Full Address",

  }
  constructor(private localStore:LocalStoreService){}

  async getCustomerDetails(formValue: CUSTOMERDETAILS[]) {
    let arrValues = Object.values(formValue)
    this.customerDetails.name = arrValues[0];
    this.customerDetails.lname = arrValues[1];
    this.customerDetails.mobile = arrValues[2];
    this.customerDetails.email = arrValues[3];
    this.customerDetails.date = arrValues[4];

    this.customerDetails.invoiceNo =await this.generateInvoice();
    this.customerDetails.discount = arrValues[12];
    this.customerDetails.total = await this.getTotal();
    console.log(this.customerDetails)
    console.log(Object.keys(arrValues))
    console.log(Object.values(arrValues))
  }
 
  async getAddItemsDetails() {
    await this.invoiceAddItem.push({...this.addItems});
    this.emptyAddItems("warrantyDate");
    console.log(this.invoiceAddItem);
  }
  generateInvoice(){
    const invoice = Math.floor(Math.random() *99999)
    return invoice
  }
  getDiscount(){
   return this.customerDetails.discount

  }
  getTotal(){
    let total=0;
    for(let i=0;i<this.invoiceAddItem.length;i++){
     total += this.invoiceAddItem[i].itemPrice * this.invoiceAddItem[i].itemQuantity
    }
    if(this.customerDetails.discount <=0){
      return total
    }else{
      
      return total-parseInt(this.customerDetails.discount);
    }
  }
  emptyAddItems(value:string) {
    if(value==='all'){
    this.addItems.itemIdName = '',
      this.addItems.itemName = '',
      this.addItems.itemPrice = 0,
      this.addItems.itemQuantity = 0;
    }else if(value === 'warranty'){
      this.addItems.warranty=false;
    }else if(value === 'warrantyDate'){
      this.addItems.warrantyDate=""
    }
  }
  // getCurrentDate(){
  //   const formattedDate = new Date().toLocaleDateString('en-GB'); // en-GB formats it as "dd/mm/yyyy"
  //   console.log(formattedDate);
  //   return formattedDate;
  // }
  printInvoice(){
    window.print()
  }

  getBillDetails_local(){
    let localData = this.localStore.getLocalUserDetail()
    this.ownerDetails = JSON.parse(`${localData}`)
  }

  ngOnInit(){
    this. getBillDetails_local();
    this.generateInvoice();
  }
}

