# brewformer
The querey string sent to brewerydb by this app is:
```
url = "http://api.brewerydb.com/v2/locations?region=texas&locality=dallas&isPrimary=Y&isClosed=N&key="+BREW_KEY+"&callback="+function(){
	    	return true;
	    }+"?";
```

This allows for the retrieval of all primary brew locations, removing all secondary locations and twin peaks restaurants.
