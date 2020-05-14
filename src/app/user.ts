export class User {
    readonly username:string;
    readonly email:string;
    private password:string;
    constructor(username:string, email:string, password:string){
        this.username = username;
        this.email = email;
        this.password = password;
    }
    changePassword(newpassword:string):void{
        this.password = newpassword;
    }
    checkPassword(passwordtocheck){
        if(this.password == passwordtocheck){
            return true;
        }
        else{
            return false;
        }
    }
}
