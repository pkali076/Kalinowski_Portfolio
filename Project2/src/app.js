const template4 = document.createElement("template");
template4.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"> 
<style>
        body {
            font-family: Amaranth;
        }

        div {
            font-family: Amaranth;
        }

        p {
            font-family: Amaranth;
        }
</style>
 <section class="section">
        <div class="columns">
            <div class="column is-vcentered is-multiline">
                <div class="column is-6-tablet is-3-desktop">
                    <h1 class="is-size-3-mobile is-size-2-desktop title">Rick and Morty</h1>
                    <h2 class="is-size-3-mobile is-size-2-desktop subtitle">Episodes</h2>
                </div>
                <div class="column is-vcentered is multiline">
                    <form>
                        <div class="field has-addons">
                            <div class="control mb-3">
                                <div class="control">
                                    <input autocomplete="off" class="input is-info" id="userName" size="25" type="text"
                                        placeholder="Username">
                                </div>
                                <div class="control">
                                    <a class="button is-info my-2" id="createUser">Create User</a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    </section>
    <section class="section">
        <div class="column">
            <div class="columns">
                <div class="message is-dark">
                    <div class="message-header">
                        <p>Welcome to the Rick and Morty Application!</p>
                    </div>
                    <!-- <div class="is-size-4 mb-4"></div> -->
                    <div class="message-body">
                        <p class="mb-4 is-size-6">Choose a Rick and Morty Character ID to display their
                            card!<br>
                            Numbers range from 1 to 671</p>
                        <form>
                            <div class="field has-addons">
                                <div class="control mb-3">
                                    <div class="control">
                                        <!-- <div class="input is-dark"> -->
                                        <!-- <select id="character-select"></select>-->
                                        <input autocomplete="off" class="input is-info" id="character-select" size="25"
                                            type="text" placeholder="Choose Character ID">
                                    </div>
                                    <div class="control">
                                        <a class="button is-info my-2" id="searchCharacter">Search For Character</a>
                                    </div>
                                    <!--</div> -->
                                    <!-- <div class="select is-dark">
                                        <select id="num-select"></select>
                                    </div> -->

                                    <p id="output"></p>
                                    <hr>
                                    <div class="card-list"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="message is-dark mx-5">
                    <div class="message-header">
                        <p>Welcome to the Rick and Morty Application!</p>
                    </div>
                    <div class="message-body">
                        <p class="mb-4 is-size-6">Choose an Episode ID to view details about Rick and Morty
                            episodes!<br>
                            Numbers range from 1 to 41</p>
                        <form>
                            <div class="field has-addons">
                                <div class="control mb-3">
                                    <div class="control">
                                        <input autocomplete="off" class="input is-info" id="episodeSelect" size="25"
                                            type="text" placeholder="Choose Episode ID">
                                    </div>
                                    <div class="control">
                                        <a class="button is-info my-2" id="searchEpisode">Search For Episode</a>
                                    </div>
                                    <p id="episodeOutput"></p>
                                    <div class="episode-details">Episode Details Displayed Here</div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;

class AppPage extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});

        this.shadowRoot.appendChild(template4.content.cloneNode(true));
    }
    attributeChangedCallback(attributeName, oldVal, newVal){
        console.log(attributeName, oldVal, newVal);
        this.render();
    }
    connectedCallback(){
        this.render();
    }

    render(){

    }
}


customElements.define('app-page', AppPage);