"use strict";
//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function

(function(){

    function DisplayHomePage() {
        let AboutUsButton = document.getElementById("AboutUsBtn")
        AboutUsButton.addEventListener("click", function () {
            console.log("About Us Button Clicked");

            location.href = "about.html"
        });
    

    function DisplayProductsPage(){

    }

    function DisplayAboutUsPage(){

    }
    function DisplayServicesPage(){

    }
    function DisplayContactPage(){

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
                break;
        }
    }
    window.addEventListener("load", Start)
    }
})();