"use strict";

(function (core){
    class User{

        constructor(displayName = "", emailAddress = "", username = "", password = "") {
            //It's a call to the setter that's why its in that case.
            this.DisplayName = displayName;
            this.EmailAddress = emailAddress;
            this.Username = username;
            this.Password = password;

        }

        set DisplayName(displayName){
            this.mydisplayname = displayName;
        }

        get DisplayName(){
            return this.mydisplayname;
        }

        set Username(username){
            this.myusername = username;
        }

        get Username(){
            return this.myusername;
        }

        set EmailAddress(emailAddress){
            this.myEmailAddress = emailAddress;
        }

        get EmailAddress(){
            return this.myEmailAddress;
        }

        set Password(password){
            this.mypassword = password;
        }

        get Password(){
            return this.mypassword;
        }

        toString(){
            return `Display Name: ${this.DisplayName}\n EmailAddress: ${this.EmailAddress}\n Username: ${this.Username}`;
        }

        toJSON(){
            return{
                "DisplayName ": this.DisplayName,
                "EmailAddress ": this.EmailAddress,
                "Username ": this.Username,
                "Password ": this.Password
            }
        }

        fromJSON(data){
            this.DisplayName = data.DisplayName;
            this.EmailAddress = data.EmailAddress;
            this.Username = data.Username;
            this.Password = data.Password;
        }

        serialize(){
            if(this.DisplayName !== "" && this.EmailAddress !== "" && this.Username !== "" && this.Password !== "") {
                return `${this.DisplayName}, ${this.EmailAddress}, ${this.Username}, ${this.Password}`;
            }
            console.error("One or more of the attributes is empty or missing");
            return null;

        }

        deserialize(data){

            let propertyArray = data.split(",")
            this.DisplayName = propertyArray[0];
            this.EmailAddress = propertyArray[1];
            this.Username = propertyArray[2];
            this.Password = propertyArray[3];
        }
    }
    core.User = User;
})(core || (core = {}));