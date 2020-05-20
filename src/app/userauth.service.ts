import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from "firebase/app";


@Injectable({
  providedIn: 'root'
})
export class UserauthService {

  constructor(private firebaseauth:AngularFireAuth) { }
  private userConnected:boolean = false;
  private loggedwithGoogle:boolean = false;
  private username;
  userLogin(username){
    this.userConnected = true;
    this.loggedwithGoogle = false;
    this.username = username;
    sessionStorage.setItem("username", this.username);
  }
  getUsername() {
    return this.username;
  }
  userLogout(){
    sessionStorage.clear();
    this.loggedwithGoogle = false;
    this.userConnected = false;
  }
  userLoginwithGoogle(){
    return this.loggedwithGoogle;
  }
  userStatus():boolean{
    return this.userConnected;
  }
  loginGoogle(){
    return new Promise<any>((resolve,reject) =>{
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      this.firebaseauth.auth.signInWithPopup(provider).then(
        data =>{
          this.loggedwithGoogle = true;
          sessionStorage.setItem("logingoogle", 'true');
          resolve(data);
        },
        err =>{
          reject(err);
        }
      )
    })
  }
  logoutGoogle(){
    return new Promise((resolve,reject)=>{
      if(firebase.auth().currentUser){
        this.loggedwithGoogle = false;
        this.userConnected = false;
        sessionStorage.clear();
        this.firebaseauth.auth.signOut();
        resolve(true);
      }
      else{
        reject("User not found");
      }
    })
  }
  getCurrntUser(){
    return new Promise((resolve,reject)=>{
      const user = firebase.auth().onAuthStateChanged((user=>{
        console.log(user);
        user? resolve(user) : resolve(null);
      }))
    })
  }
}
