import ejs from "ejs";

// create view model for the inputted stock symbol info

const symbolView = `
<aside class="symbol">
  <header><h3 class="stock"> <%= ["Meta Data"]["2. Symbol"] %></h3></header>
   
  <ul class="details" >
  <li> Date: <span><%= symbol["Meta Data"]["3. Last Refreshed"] %></span></li>
  <li> Symbol: <span><%= symbol["Meta Data"]["2. Symbol"] %></span></li>
  <li > Open: <span class="open"><%=symbol["Monthly Time Series"]["2021-02-05"]["1. open"] %> USD</span></li>
  <li > High: <span class="high"><%= symbol["Monthly Time Series"]["2021-02-05"]["2. high"] %> USD</span></li>
  <li > Low: <span class="low"><%= symbol["Monthly Time Series"]["2021-02-05"]["3. low"] %> USD</span></li>
  <li> Close: <span class="close"><%= symbol["Monthly Time Series"]["2021-02-05"]["4. close"] %> USD</span></li>
  <li> Volume: <span class="volume"><%= symbol["Monthly Time Series"]["2021-02-05"]["5. volume"] %> Shares Traded</span></li>
  </ul>

</aside>
`;

// create view model for errors if no ticker matches

const noResultsView = `
<aside class="error">
  <header>
    <h3> There are no results matching this search</h3>
 <header>
</aside>
`;

// build view model with data from API
function ResultsView(viewId) {
  this.container = document.querySelector(viewId);

  this.configUI = function (symbol) {
    const elem = ejs.render(symbolView, {symbol:symbol});
    this.container.insertAdjacentHTML("afterbegin", elem);
  };

  this.renderSymbol = function (symbol) {
    // if there are no symbol in the results
    console.log(symbol)
    console.log(this.removeChildElements());

    if (symbol.results === 0) {
      const elem = ejs.render(noResultsView, {symbol:symbol});
      this.container.insertAdjacentHTML("afterbegin", elem);
    }
    
    // search returns results
    if (symbol.results !== 0) {
        console.log(symbol["Monthly Time Series"]["2021-02-05"]);
        
        const elem = ejs.render(symbolView, {symbol:symbol});
        this.container.insertAdjacentHTML("afterbegin", elem);
    }
  };


  // remove previous elements when a new symbol is inputted
  this.removeChildElements = function () {
    this.container.querySelectorAll("aside").forEach((symbol) => {
      console.log("remove")
      console.log(symbol)
      this.container.removeChild(symbol);
    });
  };
  return this;
}

export default ResultsView;
