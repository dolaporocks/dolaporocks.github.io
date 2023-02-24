/*
Name: Dolapo Adesina
Student ID: 100816149
Date Completed: 24th February, 2023.
 */
"use strict";
//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function

(function(){


    function AddContact(fullName, contactNumber, emailAddress){
        let contact = new core.Contact(fullName, contactNumber, emailAddress);

        if(contact.serialize()){
            let key = contact.FullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }


    function AddUser(firstName, lastName, emailAddress, username, password){
        let user = new core.User(firstName, lastName, emailAddress, firstName+lastName, password);

        if(user.serialize()){
            let key = user.FirstName.substring(0,1) + Date.now();
            localStorage.setItem(key, user.serialize());
        }
    }


    function AjaxRequest(method, url, callback){

        let xhr = new XMLHttpRequest();

        //step 2
        xhr.addEventListener("readystatechange", () =>{

            if(xhr.readyState === 4 && xhr.status === 200){
                callback(xhr.responseText);
            }
        });

        //step 3
        xhr.open(method, url);

        //STEP 4
        xhr.send();
    }


    function LoadHeader(data){
        $("header").html(data)
        $(`li>a:contains(${document.title})`).addClass("active");

        CheckLogin();
    }


    function DisplayHomePage() {
        console.log("Display Home Page called");

        //syntax for jquery is $() and then css selector inside
        $("#AboutUsBtn").on("click", () => {

            location.href = "about.html";
        });

        $("#ProductsBtn").on("click", () => {

            location.href = "products.html";
        });

        $("#ContactsBtn").on("click", () => {

            location.href = "contact.html";
        });

        $("#ServicesBtn").on("click", () => {

            location.href = "service.html";
        });

        $("main").append(`<p id="MainParagraph" class="mt-3">This is my main Paragraph</p>`);

        $("body").append(`<article class="container">
            <p id="ArticleParagraph" class="mt-3">This is my article paragraph</p></article>`)

    }

    function DisplayProductsPage(){
        console.log("Display Products Page called");

    }
    //functio for the displayabout us page
    function DisplayAboutUsPage(){
        console.log("Display About Page called");
    }
    //function for the displayservices page.
    function DisplayServicesPage(){
        console.log("Display Services Page called");
    }
    //method that performs validation on the fields in the contact form.
    function ContactFormValidation(){
        ValidateField("#fullName",
            /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/,
            "Please enter a valid firstName and lastName (ex. Mr. Peter Parker)");

        ValidateField("#contactNumber",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter a valid Contact Number (ex. 416-555-5555");

        ValidateField("#emailAddress",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter a valid Email Address(ex. username@isp.com");
    }

    //method that is passed to the functions for validating using the arguments.
    function ValidateField(input_field_id, regular_expression, error_message){

        let messageArea = $("#messageArea");

        $(input_field_id).on("blur", function (){

            if(input_field_id === $("#confirmPassword")){
                regular_expression = new RegExp(document.querySelector("#password").value)
            }

            let inputFieldText = $(this).val();
            if(!regular_expression.test(inputFieldText)){
                //fail validation
                $(this).trigger("focus").trigger("select"); //go back to the fullName text
                messageArea.addClass("alert alert-danger").text(error_message).show();


            }else{
                //pass validation
                messageArea.removeAttr("class").hide();
            }

        })
    }
//function that displays the contact form page.
    function DisplayContactPage(){
        console.log("Display Contact Page called");

        ContactFormValidation();

        let sendButton = document.getElementById("sendButton");
        let subscribeBox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function (event){

            if(subscribeBox.checked){
                AddContact(fullName.value, contactNumber.value, emailAddress.value);
            }
        });
    }
    //function that displays the contact list page.
    function DisplayContactListPage(){
        console.log("Display ContactList Page called");

        if(localStorage.length > 0){
            let contactList = document.getElementById("contactList");
            let data = "";  // add deserialize data from localStorage

            let keys = Object.keys(localStorage);  // return a string array of keys

            let index = 1;
            for(const key of keys){
                let contactData = localStorage.getItem(key);
                let contact = new core.Contact();
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                         <td>${contact.FullName}</td>
                         <td>${contact.ContactNumber}</td>
                         <td>${contact.EmailAddress}</td>
                         <td class="text-center">
                         <button value="${key}" class="btn btn-primary btn-sm edit">
                         <i class="fas fa-edit fa-sm">Edit</i>
                         </button>
                         </td>
                         <td>
                         <button value="${key}" class="btn btn-danger btn-danger delete">
                         <i class="fas fa-trash-alt fa-sm">Delete</i>
                         </button>
                         </td>
                         </tr>`;
                index++;
            }
            contactList.innerHTML = data;

            $("#addButton").on("click", () =>{

                location.href = "edit.html#add";
            });

            $("button.delete").on("click", function () {

                if(confirm("Delete contact, please confirm?")){
                    localStorage.removeItem($(this).val());
                }
                location.href = "contact-list.html";
            });

            $("button.edit").on("click", function () {

                location.href = "edit.html#" + $(this).val();
            });


        }
    }


    function DisplayEditPage(){
        console.log("Display Edit Page called");

        ContactFormValidation();

        let page = location.hash.substring(1);
        switch(page){
            case "add":
                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fas fa-plus-circle fa-sm"></i> Add`);

                $("#editButton").on("click", (event) => {

                    event.preventDefault();
                    AddContact(fullName.value, contactNumber.value, emailAddress.value);
                    location.href="contact-list.html";
                })

                $("#cancelButton").on("click", () => {
                    location.href="contact-list.html";
                })

                break;
            default:{
                //edit
                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page));

                $("#fullName").val(contact.FullName);
                $("#contactNumber").val(contact.ContactNumber);
                $("#emailAddress").val(contact.EmailAddress);

                $("#editButton").on("click", (event) => {
                    event.preventDefault();

                    contact.FullName = $("#fullName").val();
                    contact.ContactNumber = $("#contactNumber").val();
                    contact.EmailAddress = $("#emailAddress").val();

                    localStorage.setItem(page, contact.serialize());

                    location.href="contact-list.html";
                })

                $("#cancelButton").on("click", () => {
                    location.href="contact-list.html";
                })

            }
                break;
        }
    }


    function DisplayLoginPage(){
        console.log("Display Register Page called");

        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function(){

            let success = false;
            let newUser = new core.User();

            $.get("./data/user.json", function(data){

                for(const u of data.users){
                    if(username.value === u.Username && password.value === u.Password){
                        newUser.fromJSON(u);
                        success = true;
                        break;
                    }
                }

                if(success){
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();

                    let ContactLink = document.getElementsByTagName("li")[4];
                    let NameLink = document.createElement("a");

                    NameLink.innerHTML = `<a class="nav-link" href="#"><i class="fas fa-user-alt"></i> 
                    ${newUser.FirstName} ${newUser.LastName}</a>`
                    ContactLink.insertAdjacentElement("afterend", NameLink);
                    document.forms[0].reset();
                    //location.href = "contact-list.html";
                }else{
                    //fails validation
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error, failed to" +
                        " authenticate, please check credentials. ").show();
                }

            });
        });
        $("#cancelButton").on("click", function(){
            document.forms[0].reset();
            location.href="index.html";
        });
    }


    function CheckLogin(){
        if(sessionStorage.getItem("user")) {
            $("#login").html(` <a class="nav-link" href="#">
            <i class="fa-solid fa-sign-out-alt"></i> Logout</a>`)

        }

        $("#logout").on("click", function(){
            sessionStorage.clear();
            location.href = "index.html";
        })
    }


    function RegisterFormValidation(){
        ValidateField("#FirstName",
            /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)*$/,
            "Please enter a valid firstName (ex. Mr. Peter)");

        ValidateField("#lastName",
            /^([A-Z][a-z]+)$/,
            "Please enter a valid lastName (ex. Parker)");

        ValidateField("#emailAddress",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter a valid Email Address(ex. username@isp.com");

        ValidateField("#password",
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            "Please ensure that password entered is in the right format. (ex.Throw2pass)");

        ValidateField("#confirmPassword",
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            "Please ensure that both passwords entered match ");
    }


    function DisplayRegisterPage(){
        console.log("Display Register Page called");

        RegisterFormValidation();

        $("#registerButton").on("click", (event) => {
            event.preventDefault();

            AddUser(FirstName.value, lastName.value, emailAddress.value, FirstName.value
                + lastName.value, password.value);

            console.log(FirstName.value, lastName.value, emailAddress.value, FirstName.value
                + lastName.value, password.value);

            document.forms[0].reset();
        });
    }

    function Start(){
        console.log("Application Started");
        AjaxRequest("GET", "header.html", LoadHeader);

        switch(document.title){
            case "Home":
                DisplayHomePage();
                break;
            case "Our Products":
                DisplayProductsPage();
                break;
            case "About Us":
                DisplayAboutUsPage();
                break;
            case "Services":
                DisplayServicesPage();
                break;
            case "Contact":
                DisplayContactPage();
                break
            case "Contact List":
                DisplayContactListPage();
                break
            case "Edit Contact":
                DisplayEditPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
        }
    }
    window.addEventListener("load", Start)

})();