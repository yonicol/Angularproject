import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserauthService } from '../userauth.service';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-userarea',
  templateUrl: './userarea.component.html',
  styleUrls: ['./userarea.component.css']
})
export class UserareaComponent implements OnInit {

  constructor(private auth: UserauthService, private router: Router, private apiconnect: HttpClient, private firebaseauth:AngularFireAuth) { }
  storeproducts:any[] = [];
  username;
  cart:any[] = [];
  categorys: any;
  searchproducts: any[] = [];
  showsearch:boolean = false;
  logedwithGoogle:boolean;
  ngOnInit(): void {
    this.logedwithGoogle = this.auth.userLoginwithGoogle();
    this.getUsername();
    this.getProducts();
    this.getCategorys();
  }
  getUsername():void{
    if(this.logedwithGoogle){
      this.username = this.firebaseauth.authState.subscribe(data =>{ this.username = data})
      console.log(`user:${this.username}`);
      sessionStorage.setItem("username", JSON.stringify(this.username));
    }
    else{
      this.username = sessionStorage.getItem("username");
    }
  }
  logout() {
    if (this.auth.userLoginwithGoogle()) {
      this.auth.logoutGoogle().then(res => { this.router.navigate([""]) });
    }
    else {
      this.auth.userLogout();
      this.router.navigate([""]);
    }
  }
  getProducts() {
    let data = this.apiconnect.get<any[]>("http://localhost:3000/products");
    data.subscribe(ele => {
    this.storeproducts = ele;
    });
  }
  getCategorys() {
    let data = this.apiconnect.get("http://localhost:3000/category");
    data.subscribe(ele => {
    this.categorys = ele;
    });
  }
  searchbyCategory(searchcategory):void {
    this.showsearch = true;
    this.searchproducts = [];
    if(searchcategory=="All"){
      this.showsearch = false;
      return;
    }
    for (let i = 0; i < this.storeproducts.length; i++) {
      if (this.storeproducts[i].category == searchcategory.toLowerCase()) {
        this.searchproducts.push(this.storeproducts[i]);
      }
    }
    console.log(this.searchproducts);
  }
  addtoCart(productname, counter){
    if(counter>0){
      for(let i=0;i<this.storeproducts.length;i++){
        if(this.storeproducts[i].title==productname){
          console.log("hello");
          
          this.cart.push({this:this.storeproducts[i], counter});
          sessionStorage.setItem('cart', JSON.stringify(this.cart));
          return;
        }
      }
    }
  }
  gotoCart(){
    this.router.navigate(['/cart']);
  }
}
