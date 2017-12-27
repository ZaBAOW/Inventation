require(['jquery', 'materialize', 'search', 'auto', 'hammer'], function($, Velocity,search,auto){
    var toolTipText = "Click Me!"
	$('.section-input').append("<button id='submit' data-toggle='tooltip' title='"+toolTipText+"' onclick='search()''>Search</button>");
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
    });
	var autocomplete = $('#Region').materialize_autocomplete({
    limit: 20,
    multiple: {
        enable: true,
        maxSize: 10,
        onExist: function (item) { /* ... */ },
        onExceed: function (maxSize, item) { /* ... */ }
    },
    appender: {
        el: '#Region'
    },
    getData: function (value, callback) {
        // ...
        callback(value, data);
    }
});

});
