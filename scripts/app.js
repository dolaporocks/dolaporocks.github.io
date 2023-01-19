"use strict";
//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function

(function(){
    function DisplayHomePage() {
        let AboutUsButton = document.getElementById("AboutUsBtn");
        AboutUsButton.addEventListener("click", function () {
            console.log("About Us Button Clicked");

            location.href = "about.html";
        });

        let ProductsButton = document.getElementById("ProductsBtn");
        ProductsButton.addEventListener("click", function () {
            console.log("Product Button Clicked");

            location.href = "products.html";
        });

        let ServicesButton = document.getElementById("ServicesBtn");
        ServicesButton.addEventListener("click", function () {
            console.log("Service Button Clicked");

            location.href = "service.html";
        });

        let ContactButton = document.getElementById("ContactsBtn");
        ContactButton.addEventListener("click", function () {
            console.log("Contact Button Clicked");

            location.href = "contact.html";
        });

        let MainContent = document.getElementsByTagName("main")[0];
        let MainParagraph = document.createElement("p")
        let DocumentBody = document.getElementsByTagName("body")[0];

        //step
        MainParagraph.setAttribute("id", "MainParagraph")
        MainParagraph.setAttribute("class", "mt-3")
        MainParagraph.textContent = "This is the Main Paragraph!"
        MainContent.appendChild(MainParagraph);

        let FirstString = "This is the";
        let SecondString = `${FirstString} the Main Paragraph.`;
        MainParagraph.textContent = SecondString;

        let Article = document.createElement("article");
        let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is my article paragraph</p>`;
        Article.setAttribute("class", "container")
        Article.innerHTML = ArticleParagraph;
        DocumentBody.appendChild(Article);
    }

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

})();