const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<style>

  button{
      border-radius:1px;
      padding:2px;
      position:absolute;
      top:1px;
      right:1px;
      opacity:0.2;
  }
  button:hover{
      opacity:1;
  }

</style>
  <div id="cardInfo">
    <!-- <h2 class="title is-size-4"></h2> -->
    <h2 class="title"></h2>
    <div class="columns">
       <!-- <div class="column is-4-tablet is-3-desktop"> -->
       <div class="column">
            <div class="card">
                <div class="card-image has-text-centered px-6">
                    <img alt="Display Image">
                </div>
                <div class="card-content">
                  <p id ="rmstatus">Status: </p>
                  <p id ="rmspecies">Species: </p>
                  <p id ="rmtype">Type:</p>
                  <p id = "rmgender">Gender:</p>
                  <p id ="rmorigin">Origin:</p>
                </div>
                <footer class="card-footer">
                  <button class="column is-half button is-success is-outlined is-half" id="favoriteCard">Favorite</button>
                  <button class="column is-half button is-success is-outlined is-half" id="closeCard">Close</button>
                </footer>
            </div>
        </div>
      </div>
  </div>

  `;
//import and then call function		
class RMCard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        //properties for accessing IDs
        this.h2 = this.shadowRoot.querySelector("h2");
        this.img = this.shadowRoot.querySelector("img");
        this.p1 = this.shadowRoot.querySelector("#rmstatus");
        this.p2 = this.shadowRoot.querySelector("#rmspecies");
        this.p3 = this.shadowRoot.querySelector("#rmtype");
        this.p4 = this.shadowRoot.querySelector("#rmgender");
        this.p5 = this.shadowRoot.querySelector("#rmorigin");
        this.closeCard = this.shadowRoot.querySelector("#closeCard");
        this.favoriteCard = this.shadowRoot.querySelector("#favoriteCard");

    }
    connectedCallback(){
      this.closeCard.onclick = () => this.remove();
      this.favoriteCard.onclick = () => this.favorite();
    this.render();
  }


    disconnectedCallback(){
      this.closeCard.onclick = null;
      this.favoriteCard.onclick = null;
    }

    attributeChangedCallback(attributeName, oldVal, newVal){
        console.log(attributeName, oldVal, newVal);
        this.render();
    }

    static get observedAttributes(){
        return ["data-name", "data-status", "data-species", "data-type", "data-gender", "data-image", "data-favorite"];
    }

    render(){
        //make the values appear
        const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "<i>...character name...</i>";
        const status = this.getAttribute('data-status') ? this.getAttribute('data-status') : "Unknown Status";
        const species = this.getAttribute('data-species') ? this.getAttribute('data-species') : "Unknown Species";
        const type = this.getAttribute('data-type') ? this.getAttribute('data-type') : "Unknown Type";
        const gender = this.getAttribute('data-gender') ? this.getAttribute('data-gender') : "Unknown Gender";
        const origin = this.getAttribute('data-origin') ? this.getAttribute('data-origin') : "Unknown Origin";
      //  let newresults = this.getAttribute('data-results') ? this.getAttribute('data-results') : "No Results.";
        const imgURL = this.getAttribute('data-image') ? this.getAttribute('data-image') : "./images/toxicrick.png";
       // const isFavorite = this.getAttribute('data-favorite') ? this.getAttribute('data-favorite') : false;
        
       // const resultsArr = newresults.split(",");
        //make array for printing out the elements. the string elements from affiliations will print out without this for loop
      //  resultsArr.forEach(element => this.p4.innerHTML = `${element}`);
        this.h2.innerHTML = `${name}`;
        this.p1.innerHTML = `Status: ${status}`;
        this.p2.innerHTML = `Species: ${species}`;
        this.p3.innerHTML = `Type: ${type}`;
        this.p4.innerHTML = `Gender: ${gender}`;
        this.p5.innerHTML = `Planet Origin: ${origin}`;
        //this.p4.innerHTML = `Results: ${resultsArr} `;
        this.img.src = imgURL;


    }

    get name() { return this.h2; }
    get status() { return this.p1; }
    get species() { return this.p2; }
    get type() { return this.p3; }
    get gender(){return this.p4;}
    get origin(){return this.p5;}
    get isFavorite() {
        if (this.getAttribute('data-favorite') == "true") {
            return true;
        } else { return false; }
    }

    //favorites section
    favorite(){
      if(this.getAttribute('data-favorite') == "true"){
        this.setAttribute('data-favorite', "false");
      }else{
        this.setAttribute('data-favorite', "true");
      }

      this.favStatusChanged();
      this.render();
    }
    //change of favorite status
    favStatusChanged(){
      this.dispatchEvent(new CustomEvent("favoritestatus", {
        detail: {
          isFavorite: this.isFavorite
        }
      }))
    }

}//class

customElements.define('rm-card', RMCard)
