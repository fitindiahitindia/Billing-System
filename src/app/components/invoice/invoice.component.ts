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
import { QRCodeModule } from 'angularx-qrcode';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LocalStoreService } from '../../services/local-store.service';
interface CUSTOMERDETAILS {
  name: string;
  lname: string;
  mobile: number;
  email: string;
  date: string;
  isDiscount:boolean;
  discount:number;
  qrCode:string;
}
interface OWNERDETAILS{
  billName: string,
  companyName: string,
  mobile: string,
  email: string,
  address: string
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
    QRCodeModule,
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
  
  public qrdata: string="";
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
    qrCode:"",
    name: "",
    lname: "",
    mobile: "",
    email: "",
    date: "",
    invoiceNo:"",
    discount:0,
    total:"",

  }
  public ownerDetails:OWNERDETAILS={
    billName: "Mobile Bill Shop",
    companyName: "Your Business Name",
    mobile: "1234567890",
    email: "test@gmail.com",
    address: "Your Full Address",

  }
  constructor(private localStore:LocalStoreService,private router:Router){}

  async getCustomerDetails(formValue: CUSTOMERDETAILS[]) {
    this.customerDetails = formValue;
    this.customerDetails.invoiceNo =await this.generateInvoice();
    this.customerDetails.total = await this.getTotal();
    this.customerDetails.qrCode = await this.qrCodeGenerator();
    this.qrdata=this.getUrl() +'/'+this.customerDetails.invoiceNo.toString();
    
    this.customerDetails = {
      ...this.customerDetails,
      products:[...this.invoiceAddItem]
    }
  }
 
  async getAddItemsDetails() {
    await this.invoiceAddItem.push({...this.addItems});
    this.emptyAddItems("warrantyDate");
  }
  generateInvoice(){
    const invoice = Math.floor(Math.random() *99999)
    return invoice
  }
  getDiscount(){
   return this.customerDetails.discount

  }
  qrCodeGenerator(){
    let alpha=['A',"J","m","S","v","T","k","X","o","Y","l","B"]
    const qrCode = Math.floor(Math.random() *99999) +''+ Date.now()
    return qrCode
  }
  getTotal(){
    let total=0;
    for(let i=0;i<this.invoiceAddItem.length;i++){
     total += this.invoiceAddItem[i].itemPrice * this.invoiceAddItem[i].itemQuantity
    }
    if(this.customerDetails.isDiscount==false){
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
    if(localData==null){
      this.localStore.setLocalUserDetail(this.ownerDetails)
    }else{
      this.ownerDetails = JSON.parse(`${localData}`)
    }
  }
  getUrl(){
    return `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}`+this.router.url
  }
  ngOnInit(){
    this. getBillDetails_local();
    this.generateInvoice();
  }
}

