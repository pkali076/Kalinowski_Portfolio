const template3 = document.createElement("template");
template3.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <style>
    </style>
    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column">
                    <!-- tabbed content-->
                    <div class="tabs is-boxed">
                        <ul>
                            <li class="is-active" data-target="product-details">
                                <a>Episode Details</a>
                            </li>
                            <!-- <li data-target="delivery-information">
                                <a>Characters in Episode</a>
                            </li> -->
                        </ul>
                    </div>
                    <div class="px-2" id="tab-content">
                        <div>
                            <div class="displayEpisode">
                            <p id ="epid">Episode ID:</p>
                            <p id ="epname">Title:</p>
                            <p id ="epairdate">Air Date:</p>
                            <p id ="epnumber">Episode Number:</p>
                            </div>
                        </div>
                        <footer class="card-footer">
                        <button class="column is-half button is-success is-outlined is-half" id="favoriteContent">Favorite</button>
                        <button class="column is-half button is-success is-outlined is-half" id="closeContent">Close</button>
                        </footer>
                       <!-- <div id="delivery-information" class="is-hidden">
                            <h3 class="is-size-5" >Characters in Episode</h3>
                            <p>List of episodes that contain the character</p>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;

class MyEpisode extends HTMLElement{
    constructor(){
        super();
        //1 - attach a shadow DOM tree to this instance - this creates `.shadowRoot` for us
        this.attachShadow({mode:"open"});
        //2 - Clone `template` and append it
        this.shadowRoot.appendChild(template3.content.cloneNode(true));
        this.tabs = this.shadowRoot.querySelectorAll('.tabs li');
        this.tabContentBoxes = this.shadowRoot.querySelectorAll('#tab-content > div');

        this.p1 = this.shadowRoot.querySelector("#epid");
        this.p2 = this.shadowRoot.querySelector("#epname");
        this.p3 = this.shadowRoot.querySelector("#epairdate");
        this.p4 = this.shadowRoot.querySelector("#epnumber");
        this.closeContent = this.shadowRoot.querySelector("#closeContent");
        this.favoriteContent = this.shadowRoot.querySelector("#favoriteContent");
    }
    static get observedAttributes(){
        return ["data-title, data-id, data-name, data-air_date, data-episode, data-favorite"];
    }
    //3 - called when the component is added to the page

    attributeChangedCallback(attributeName, oldVal, newVal){
        console.log(attributeName, oldVal, newVal);
        this.render();
    }w

    connectedCallback(){
        this.closeContent.onclick = () => this.remove();
        this.favoriteContent.onclick = () => this.favorite();
        this.render();
    }

    diconnectedCallback(){
        this.closeContent.onclick = null;
        this.favoriteContent.onclick = null;
    }

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
      this.dispatchEvent(new CustomEvent("favoriteEpisode", {
        detail: {
          isFavorite: this.isFavorite
        }
      }))
    }

    render(){
        const id = this.getAttribute('data-id') ? this.getAttribute('data-id') : "..Episode ID..";
        const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "No Episode Name";
        const airdate = this.getAttribute('data-air_date') ? this.getAttribute('data-air_date') : "Unrelased";
        const episode = this.getAttribute('data-episode') ? this.getAttribute('data-episode') : "Unknown Episode";

        this.p1.innerHTML = `Episode ID: ${id}`;
        this.p2.innerHTML = `Episode Name: ${name}`;
        this.p3.innerHTML = `Airdate: ${airdate}`;
        this.p4.innerHTML = `Episode: ${episode}`;

       // this.runTabs();
    }

    get id() {return this.p1;}
    get name() {return this.p2;}
    get airdate() {return this.p3;}
    get episode() {return this.p4;}

    get isFavorite() {
    if (this.getAttribute('data-favorite') == "true") {
        return true;
    } else { return false; }
    }
}


customElements.define('my-episode', MyEpisode);