const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">

    <style>
        a:visited, a:link{
            color:black;
        }
        a:hover{
            color:yellow;
        }
        body{
            font-family:Amaranth;
        }
        p{
            font-family:Amaranth;
        }
    </style>
    <footer class="footer pt-0 pb-0">
        <div class="content has-text-left">
            <p class="has-text-white has-background-info" >
                <b id="title-element">Rick and Morty Search Application</b> by <a href="https://www.linkedin.com/in/philip-kalinowski427/" target="_blank">Philip Kalinowski</a>.<br> The website content
                is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">CC BY NC SA 4.0</a>. <br>The source code is licensed
                <a href="http://opensource.org/licenses/mit-license.php" target="_blank">MIT</a>.<br> &copy;Copyright 2021
            </p>
        </div>
    </footer>  
    `;

class MyFooter extends HTMLElement{
    constructor(){
        super();
        //1 - attach a shadow DOM tree to this instance - this creates `.shadowRoot` for us
        this.attachShadow({mode:"open"});
        //2 - Clone `template` and append it
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.titleElement = this.shadowRoot.querySelector("#title-element");
    }
    static get observedAttributes(){
        return ["data-title"];
    }
    //3 - called when the component is added to the page

    attributeChangedCallback(attributeName, oldVal, newVal){
        console.log(attributeName, oldVal, newVal);
        this.render();
    }
    connectedCallback(){
        this.render();
    }

    //4 - a helper method to display the values of the attributes
    render(){
        //grab the attribute values, and assign a default value if necessary
        const titleText = this.dataset.title || "???";
        this.titleElement.innerHTML = titleText;
        
    }
}
customElements.define('my-footer', MyFooter);