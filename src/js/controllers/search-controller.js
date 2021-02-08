function SearchController (model, searchView, resultsView){
    // tell the search view about the model
    this.model = model;
    this.searchView = searchView;
    this.searchView.setController(this);
   
    //config listeners
    this.configListeners =  () => {
       this.searchView.view.addEventListener("submit", this.onHandleSubmit)
       const radios =  this.searchView.view.querySelectorAll('input[type=radio]')
       radios.forEach(radio=>{
           radio.addEventListener('change',this.onCheckedHanlder)
       })
    
    }

    // config the initial ui from data
    this.configUI = async function(){
         const data = await model.init();     
         //resultsView.configUI(data.results[0]);
         //console.log(data.results[0])
         console.log(data)
    }


   // form submit button handler
   this.onHandleSubmit = async (e)=> {
       e.preventDefault();
       // skipping over validation
       const queryParams = {
           symbol:e.currentTarget.searchSymbol.value
        
       }
       console.log(queryParams);
      const searchResponse = await this.model.search(queryParams)

      resultsView.renderSymbol(searchResponse)
   }

  
   this.configListeners();
  
    return this;
}

export default SearchController