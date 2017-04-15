$(document).ready(function() {
    $.ajax({
        type: "GET",
        dataType: 'jsonp',
        url: "http://localhost:8080/api/getCards", 
        success: function(result){
        console.log(result);
    }});
});