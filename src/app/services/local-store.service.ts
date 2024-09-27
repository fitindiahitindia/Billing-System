import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {

  constructor() {}

   setLocalUserDetail(value:any){
    localStorage.setItem("owner-details",JSON.stringify(value));
  }
   getLocalUserDetail(){
    return localStorage.getItem('owner-details')
   }
}
