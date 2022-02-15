const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"> 
<style>
body{
    font-family:Amaranth;
}
p{
    font-family:Amaranth;
}
</style>
   <p>
    <img alt="Image"></img>
    </p>
`;

class AboutPage extends HTMLElement{
    constructor(){
        super();
        //1 - attach a shadow DOM tree to this instance - this creates `.shadowRoot` for us
        this.attachShadow({mode:"open"});
        //2 - Clone `template` and append it
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.img = this.shadowRoot.querySelector("img");
       // this.button = this.shadowRoot.querySelector("button");
        
    }
    static get observedAttributes(){
        return ["data-image"];
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
       // const newImage = this.dataset.image || "???";
       // this.imageElement.innerHTML = newImage;
        const imgURL = this.getAttribute('data-image') ? this.getAttribute('data-image') : "./images/rick.png";
        
        this.img.src = imgURL;
    }
}
customElements.define('about-page', AboutPage);