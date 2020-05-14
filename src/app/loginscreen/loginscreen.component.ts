import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserhandleService } from '../userhandle.service';
import { UserauthService } from '../userauth.service';
import { User } from '../user';


@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.component.html',
  styleUrls: ['./loginscreen.component.css']
})
export class LoginscreenComponent implements OnInit {
  Loginform: any;
  constructor(private router: Router, private userhandle: UserhandleService, private userauth: UserauthService, private formbuild: FormBuilder) {
    this.Loginform = this.formbuild.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  usernamedoesntexist:boolean = false;
  registeredUsers: User[] = [];
  tempusername: string;
  temppassword: string;
  showloginform: boolean = false;
  forgotpass:boolean =false;
  ngOnInit(): void {
    this.registeredUsers = this.userhandle.getallUsers();
  }
  Signup(): void {
    this.router.navigate(['/register'])
  }
  Login() {
    if (this.checkFormuserName()) {
      this.userauth.userLogin(this.tempusername);
      this.router.navigate(['userarea']);
    }
  }
  checkFormuserName(): boolean {
    for (let i = 0; i < this.registeredUsers.length; i++) {
      if (this.registeredUsers[i].username == this.tempusername) {
        if (this.registeredUsers[i].checkPassword(this.temppassword)) {
          return true;
        }
      }
    }
    return false;
  }
  loginForm() {
    this.showloginform = true;
  }
  loginwithGoogle() {
    this.userauth.loginGoogle().then(res => { this.router.navigate(["userarea"]) });
  }
  forgotPassword(username:string, pass:string) {
    for(let i=0;i<this.registeredUsers.length;i++){
      if(this.registeredUsers[i].username==username){
        console.log("work");
        this.registeredUsers[i].changePassword(pass);
        this.userhandle.saveUsers(this.registeredUsers);
        this.usernamedoesntexist = false;
        break;
      }
      else{
        this.usernamedoesntexist = true;
      }
    }
  }
  showforgotpassword(){
    this.forgotpass = !this.forgotpass;
  }
}
