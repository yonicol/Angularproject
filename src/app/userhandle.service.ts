import { Injectable } from '@angular/core';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class UserhandleService {
  tempregisteredUsers:User[] = [];
  constructor() { }
  getallUsers():User[]{
    this.tempregisteredUsers = [];
    let temp = JSON.parse(localStorage.getItem('users'));
    for(let i=0;i<temp.length;i++){
      this.tempregisteredUsers.push(new User(temp[i].username, temp[i].email, temp[i].password))
    }
    return this.tempregisteredUsers;
  }
  saveUsers(users):void{
    localStorage.setItem('users',JSON.stringify(users))
  }
}
