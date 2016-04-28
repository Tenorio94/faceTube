$( document ).on('ready', function() {
    var dataToSendCookies = {
        "action" : "COOKIES"
    };

    $.ajax({
        type: "POST",
        url: "data/applicationLayer.php",
        data: dataToSendCookies,
        dataType: "json",
        success: function(cookieJson)
        {
            $("#username").val(cookieJson.cookieValue);
        },
        error: function(errorMsg)
        {
            console.log(errorMsg.statusText);
        }

    });


    var flag = 0;
    //$( "#profile" ).on('click', function(e) {
        //e.preventDefault();
    var dataToSendProfile = {
        "action" : "FRIENDSFILLING"
    };   
    $.ajax({
        url: "data/applicationLayer.php",
        type: "POST",
        data: dataToSendProfile,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function(jsonObject)
        {
            for(var i = 0; i <= jsonObject.length - 1; i++)
            {
                var currentHTML = "";
                currentHTML += "<p>---------------------------------------------------</p>"
                currentHTML += "<div class=\"row prof\">";
                    currentHTML += "<div class=\"col-sm-3 rightColumn\">Username:</div>";
                    currentHTML += "<div class=\"col-sm-9\">" + jsonObject[i].username + "</div>";
                currentHTML += "</div>";
                currentHTML += "<div class=\"row prof\">";
                    currentHTML += "<div class=\"col-sm-3 rightColumn\">First Name:</div>";
                    currentHTML += "<div class=\"col-sm-9\">" + jsonObject[i].fName + "</div>";
                currentHTML += "</div>";
                currentHTML += "<div class=\"row prof\">";
                    currentHTML += "<div class=\"col-sm-3 rightColumn\">Last Name:</div>";
                    currentHTML += "<div class=\"col-sm-9\">" + jsonObject[i].lName + "</div>";
                currentHTML += "</div>";
                currentHTML += "<div class=\"row prof\">";
                    currentHTML += "<div class=\"col-sm-3 rightColumn\">E-mail:</div>";
                    currentHTML += "<div class=\"col-sm-9\">" + jsonObject[i].email + "</div>";
                currentHTML += "</div>";                   
                $("#friendsContent").append(currentHTML);
                currentHTML = "";
            }
        },
        error: function(errorMsg)
        {
            alert("Unable to append");
            //print("errorMsg");
        }
    });

    $("#goPostVideo").on('click', function(){
        window.location.replace("postVideo.html");
    });
});