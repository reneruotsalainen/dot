
$(document).ready(function(){
        $.getJSON("db.json", function(json) {
        //console.log(json);
        Object.entries(json).forEach(([key, value]) => {
            console.log("avain", key)
            console.log("arvo ", value) 

            Object.entries(value).forEach(([key, value]) => {
                console.log("avain", key)
                console.log("arvo ", value) 

                $("#data").append(JSON.stringify(value, null, 4)) 
                $("#data").append("<br>"); 
            }); 
        });    
    });  
});

