const amount = document.getElementById('amount');
const currency = document.getElementById('currency');
const convert = document.getElementById('convert');
const result = document.getElementById('result');


const API_KEY = "eHvCt4mLJkhtHT2R1VAuqQ==gYpDl9pe3sMvyFxG"


convert.addEventListener('click',()=>{
  const amountTotal = amount.value;
  const currencyTotal = currency.value;
  const url = `https://api.api-ninjas.com/v1/convertcurrency?want=${currencyTotal}&have=USD&amount=${amountTotal}`
 

;

  ////////////////////
  fetch(url,{
    method : 'GET',
    headers:{
        'x-API-Key' : API_KEY
    },
  

  })

  .then(res =>res.json())
  .then(data =>{
  
    result.innerHTML = `result = ${data.new_amount}`;
  })
  .catch(error =>{
    console.error('Request failer :', error);
    result.innerHTML = 'An error has occurred please try again later';
  })


})