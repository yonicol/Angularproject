import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class UseractiveService {

  constructor(public firebasedatabase:AngularFirestore, public firebaseauth:AngularFireAuth) { }
  getCurrntUser(){
    return new Promise((resolve,reject)=>{
      const user = firebase.auth().onAuthStateChanged((user=>{
        console.log(user);
        user? resolve(user) : resolve(null);
      }))
    })
  }
  getUsername() :string{
    let temp;
    let username = firebase.auth().onAuthStateChanged((user=>{
      temp = user.displayName;
      console.log(temp);
    }))
    return temp;
    
  }
}