const BREW_KEY= "e36933548da991f62ec0d7ec93fad90c";
function search(){
    $('#brewery-list').empty();
    $('#error-container').empty();
    var region = $("#Region").val();
    var city = $("#City").val();
    const proxyurl = "https://cors-anywhere.herokuapp.com/"
    url = "http://api.brewerydb.com/v2/locations?region="+region+"&locality="+city+"&isPrimary=Y&isClosed=N&key="+BREW_KEY+"&callback="+function(){
        return true;
    }+"?";
    fetch(proxyurl + url).then(response=> response.text()).then(contents=>getBreweries(contents)).catch(error => errorMessage(error));

}

//Use JSON.parse() to comb through data object created by
//berwerydb to get names of breweries.

function getBreweries(contents){
    var list = JSON.parse(contents);
    for(var i = 0; i < list.data.length; i++){
        var brewery = list.data[i].brewery.name;
        var breweryClass = brewery.replace(/ |'|&|\.|\s|\+/g, '');
        //insert brewery id into template
        var item = "<div class='card yellow lighten-3 col-3 item-container'><span class='list-item' aria-live='assertive'>"+brewery+"</span><hr class='separator'><ul class='"+breweryClass+"-list'></ul></div>";
        $('#brewery-list').append(item).fadeIn(999);
        // console.log(brewery);
        getBeers(list, i, breweryClass);
    }
}

function getBeers(list, i, breweryClass){
    var brewery_id = list.data[i].brewery.id;
    console.log(brewery_id);
    var url = "http://api.brewerydb.com/v2/brewery/"+brewery_id+"/beers?key="+BREW_KEY;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl + url).then(response=> response.text()).then(contents=> displayBeers(contents, brewery_id, breweryClass));
}

//let value = "String with spaces"; console.log(value.replace(/ /g,'+'));

function displayBeers(contents, brewery_id, breweryClass){
    var info = JSON.parse(contents);
    if(info.data === undefined){
        $('.'+breweryClass+'-list').append('<li class="noBeers">There were no beers found in the databased that are brewed by this brewery.</li>');
    }else{
    for(var j = 0; j < info.data.length; j++){
        var brew = info.data[j].name;
        var beerDescription = info.data[j].description;
        if(beerDescription === undefined){
            beerDescription = "Sorry there is no description for this beer yet."
        }
        var beerDescriptionEdit = beerDescription.replace("'", "&#39")
        var searchBeer = brew.replace(/ /g, '+');
        var searchUrlTemplate = "https://www.google.com/search?q="+searchBeer;
        var brewTemplate = "<li class='beer-list-item'><a href="+searchUrlTemplate+" data-toggle='tooltip' title='"+beerDescriptionEdit+"''>"+brew+"</a></li>";
        //append beer item to element with corresponding brewery id.

            $('.'+breweryClass+'-list').append(brewTemplate);
        }
    }
}

function errorMessage(error){
    console.log(error);
    var message = "<span class='error-message'>There seems to be something wrong with your search entry.  Check to see if you have left either field blank or mispelled either your entered state and/or city.</span>"
    $('#error-container').append(message).fadeIn(999);
}
