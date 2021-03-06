import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserauthService } from '../userauth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-cartplace',
  templateUrl: './cartplace.component.html',
  styleUrls: ['./cartplace.component.css']
})
export class CartplaceComponent implements OnInit {

  constructor(private router:Router, private apiconnect: HttpClient, private auth: UserauthService, private firebaseauth: AngularFireAuth) { }
  cartempty:boolean = true;
  storeproducts:any;
  cartproducts:any[] = [];
  sum:number = 0;
  username;
  logedwithGoogle: boolean;
  ngOnInit(): void {
    this.logedwithGoogle = this.auth.userLoginwithGoogle();
    this.getUsername();
    this.getProducts();
    this.getCart();
    this.calculateSum();
  }
  getUsername(): void {
    if (this.logedwithGoogle || sessionStorage.getItem("logingoogle") == 'true') {
      if(this.logedwithGoogle){
        this.username = this.firebaseauth.authState.subscribe(data => { this.username = data.displayName;
          sessionStorage.setItem('googleusername', data.displayName); })
      }
      else{
        this.logedwithGoogle = true;
        this.username = sessionStorage.getItem('googleusername')
      }
    }
    else {
      this.username = sessionStorage.getItem("username");
    }
  }
  calculateSum():void{
    this.sum = 0;
    for(let i=0;i<this.cartproducts.length;i++){
      this.sum+= Number(this.cartproducts[i].this.priceperkg)*Number(this.cartproducts[i].counter);
    }
    console.log(this.sum);
    
  }
  getCart():void{
    this.cartproducts = JSON.parse(sessionStorage.getItem('cart'));
    this.checkifCartisempty();
  }
  checkifCartisempty(){
    if(this.cartproducts.length==0){
      this.cartempty = true;
    }
    else{
      this.cartempty = false;
    }
  }
  getProducts():void {
    let data = this.apiconnect.get("http://localhost:3000/products");
    data.subscribe(ele => {
    this.storeproducts = ele;
    });
  }
  logout():void {
    if (this.auth.userLoginwithGoogle()) {
      this.auth.logoutGoogle().then(res => { this.router.navigate([""]) });
    }
    else {
      this.auth.userLogout();
      this.router.navigate([""]);
    }
  }
  removefromCart(productname, counter):void{
    for(let i=0;i<this.cartproducts.length;i++){
      if(this.cartproducts[i].this.title==productname&&this.cartproducts[i].counter==counter){
        this.cartproducts.splice(i,1);
        sessionStorage.setItem('cart', JSON.stringify(this.cartproducts));
        this.checkifCartisempty();
        this.calculateSum();
        return;
      }
    }
  }
  gotoStore(){
    this.router.navigate(['/userarea'])
  }
}
