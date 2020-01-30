const citiesWithinCountry = require('../data/cities-within-country.json');

// This is an object, each key is a country name,
// its value is an array of strings of cities within country


function isCountry(input){
    if(input==='' || input === undefined)  
        return false;
    var key ;
    var result = [];
    const countries = Object.keys(citiesWithinCountry);

    if ( countries.some(country=>{
        key=country;
        return country.toUpperCase() === input.toUpperCase() ? true : false;
    }) ){
        for(let i=0;i<5;i++){
           result.push(citiesWithinCountry[key][i]);
        }
        return result;
    }
return false;
}

function isCity(input) {
    if(input==='' || input === undefined)  
    return false;
    for(const country in citiesWithinCountry){
        if(citiesWithinCountry[country].some (city=>{
            return city.toUpperCase() === input.toUpperCase() ? true : false;
 
        })){
            let obj = {};
            obj[country]=input;
            return obj;
        }
        
    }
    return false;
}

module.exports = {isCity,isCountry};