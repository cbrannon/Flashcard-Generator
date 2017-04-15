$(document).ready(function() {
    $.ajax({url: "http://localhost:8080/api/getCards", success: function(result){
        console.log(result);
    }});
});