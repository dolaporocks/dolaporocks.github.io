"use strict";

(function (core){
    class Contact{

        constructor(fullName, contactNumber, emailAddress) {
            //It's a call to the setter that's why its in that case.
            this.FullName = fullName;
            this.ContactNumber = contactNumber;
            this.EmailAddress = emailAddress;

        }

        set FullName(fullName){
            this.myFullName = fullName;
        }

        get FullName(){
            return this.myFullName;
        }

        set ContactNumber(contactNumber){
            this.myContactNumber = contactNumber;
        }

        get ContactNumber(){
            return this.myContactNumber;
        }

        set EmailAddress(emailAddress){
            this.myEmailAddress = emailAddress;
        }

        get EmailAddress(){
            return this.myEmailAddress;
        }

        toString(){
            return `Full Name: ${this.FullName}\n Contact Number: ${this.ContactNumber}\n EmailAddress: ${this.EmailAddress}`;
        }

        serialize(){
            if(this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !== "") {
                return `${this.FullName}, ${this.ContactNumber}, ${this.EmailAddress}`;
            }
            console.error("One or more of the attributes is empty or missing");
            return null;

        }

        deserialize(data){

            let propertyArray = data.split(",")
            this.FullName = propertyArray[0];
            this.ContactNumber = propertyArray[1];
            this.EmailAddress = propertyArray[2];
        }
    }
    core.Contact = Contact;
})(core || (core = {}));