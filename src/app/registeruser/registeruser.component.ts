import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserhandleService } from '../userhandle.service';
import { Router } from '@angular/router';
import { User } from '../user';



@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent implements OnInit {
  signUpform:any;
  usernameFree:boolean;
  emailFree:boolean;
  registeredUsers:User[] = [];
  constructor(private formbuild:FormBuilder, private router:Router, private userhandle:UserhandleService) {
    this.signUpform = this.formbuild.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
   }
  tempusername:string = '';
  tempemail:string = '';
  temppassword:string = '';
  usernametaken:boolean = false;
  emailtaken:boolean = false;
  ngOnInit(): void {
    this.registeredUsers = this.userhandle.getallUsers();
  }
  checkFormuserName():boolean{
    for(let i=0;i<this.registeredUsers.length;i++){
      if(this.registeredUsers[i].username==this.tempusername){
        return false;
      }
    }
    this.usernametaken = false;
    return true;
  }
  checkFormEmail():boolean{
    for(let i=0;i<this.registeredUsers.length;i++){
      if(this.registeredUsers[i].email==this.tempemail){
        return false;
      }
    }
    this.emailtaken = false;
    return true;
  }
  registerUser():void{
    if(this.checkFormuserName()==true&&this.checkFormEmail()==true){
      this.usernametaken = false;
      this.emailtaken = false;
      this.registeredUsers.push(new User(this.tempusername, this.tempemail, this.temppassword));
      this.userhandle.saveUsers(this.registeredUsers);
      this.router.navigate(['/login']);
      return;
    }
    if(this.checkFormuserName()==false){
      this.usernametaken = true;
    }
    if(this.checkFormEmail()==false){
      this.emailtaken = true;
    }
  }
  movetoLogin(){
    this.router.navigate(['/login']);
  }
}
