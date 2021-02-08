//base url
function StockAPIModel(){
   this.apiBaseUrl = 'https://www.alphavantage.co/query?'
 
//default url
   this.init = function () {
    const result = this.query('https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=demo').then(res=> res)
    return result
   }

   this.query= async function(url){
      const req = await fetch(url);
      const res = await req.json();
      return res
   }

// build url with symbol inputted by user
   this.search = async function (formObj){
      const { symbol } = {...formObj}
      let url = new URL( this.apiBaseUrl + "function=TIME_SERIES_MONTHLY" + "&symbol=" + symbol + "&apikey=L7M40YKA2UDTRYLH")

     const params = new URLSearchParams()

     console.log(url)

     const req = await fetch(url);
      const res = await req.json();
    
      return res
   
        
   }

   

   return this
}


export default StockAPIModel 