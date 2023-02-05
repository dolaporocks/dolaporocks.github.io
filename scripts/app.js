"use strict";
//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function

(function(){

    /**
     *Instantiate and contact to local storage
     * @param {string} fullName
     * @param {string} contactNumber
     * @param {string} emailAddress
     * @constructor
     */
    function AddContact(fullName, contactNumber, emailAddress){
        let contact = new core.Contact(fullName, contactNumber, emailAddress);

        if(contact.serialize()){
            let key = contact.FullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
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

    function DisplayAboutUsPage(){
        console.log("Display About Page called");
    }
    function DisplayServicesPage(){
        console.log("Display Services Page called");
    }
    function DisplayContactPage(){
        console.log("Display Contact Page called");
        let sendButton = document.getElementById("sendButton");
        let subscribeBox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function (event){

            if(subscribeBox.checked){
                AddContact(fullName.value, contactNumber.value, emailAddress.value);
            }
        });
    }



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

    function Start(){
        console.log("Application Started");
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
        }
    }
    window.addEventListener("load", Start)

})();