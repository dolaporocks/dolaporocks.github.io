/*
Name: Dolapo Adesina
Student ID: 100816149
Date Completed: 24th February, 2023.
Creating a userclass that creates a constructor for the inputs entered by the user and certain
methods for implementatin in local storage.
 */
"use strict";

(function (core){
    class User{

        constructor(firstName = "", lastName = "", emailAddress = "", username = "",
                    password = "") {
            //It's a call to the setter that's why its in that case.
            this.FirstName = firstName;
            this.LastName = lastName;
            this.EmailAddress = emailAddress;
            this.Username = username;
            this.Password = password;

        }

        set FirstName(firstName){
            this.myfirstName = firstName;
        }

        get FirstName(){
            return this.myfirstName;
        }

        set LastName(lastName){
            this.mylastName = lastName;
        }

        get LastName(){
            return this.mylastName;
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
            return `First Name: ${this.FirstName}\n Last Name: ${this.LastName}\n EmailAddress: ${this.EmailAddress}\n
             Username: ${this.Username}`;
        }

        toJSON(){
            return{
                "FirstName ": this.FirstName,
                "LastName ": this.LastName,
                "EmailAddress ": this.EmailAddress,
                "Username ": this.Username,
                "Password ": this.Password
            }
        }

        fromJSON(data){
            this.FirstName = data.FirstName;
            this.LastName = data.LastName;
            this.EmailAddress = data.EmailAddress;
            this.Username = data.Username;
            this.Password = data.Password;
        }

        serialize(){
            if(this.FirstName !== "" && this.LastName !== "" && this.EmailAddress !== "" && this.Username !== "" &&
                this.Password !== "") {
                return `${this.FirstName}, ${this.LastName}, ${this.EmailAddress}, ${this.Username}, ${this.Password}`;
            }
            console.error("One or more of the attributes is empty or missing");
            return null;

        }

        deserialize(data){

            let propertyArray = data.split(",")
            this.FirstName = propertyArray[0];
            this.LastName = propertyArray[1]
            this.EmailAddress = propertyArray[2];
            this.Username = propertyArray[3];
            this.Password = propertyArray[4];
        }
    }
    core.User = User;
})(core || (core = {}));