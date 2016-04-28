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
        "action" : "PROFILEFILLING"
    };   
    $.ajax({
        url: "data/applicationLayer.php",
        type: "POST",
        data: dataToSendProfile,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function(jsonObject)
        {
            if(flag == 0){
                var currentHTML = "";
                currentHTML += "<div class=\"row prof\">";
                    currentHTML += "<div class=\"col-sm-3 rightColumn\">Username:</div>";
                    currentHTML += "<div class=\"col-sm-9\">" + jsonObject.username + "</div>";
                currentHTML += "</div>";
                currentHTML += "<div class=\"row prof\">";
                    currentHTML += "<div class=\"col-sm-3 rightColumn\">First Name:</div>";
                    currentHTML += "<div class=\"col-sm-9\">" + jsonObject.fName + "</div>";
                currentHTML += "</div>";
                currentHTML += "<div class=\"row prof\">";
                    currentHTML += "<div class=\"col-sm-3 rightColumn\">Last Name:</div>";
                    currentHTML += "<div class=\"col-sm-9\">" + jsonObject.lName + "</div>";
                currentHTML += "</div>";
                currentHTML += "<div class=\"row prof\">";
                    currentHTML += "<div class=\"col-sm-3 rightColumn\">E-mail:</div>";
                    currentHTML += "<div class=\"col-sm-9\">" + jsonObject.email + "</div>";
                currentHTML += "</div>";
                currentHTML += "<div class=\"row prof\">";
                    //currentHTML += "<div class=\"col-sm-3\"><button type=\"button\" class=\"btn btn-default btn-sm button\" onclick=location.href=\"rankVideos.html\"> Ranked Videos</button></div>";
                    currentHTML += "<div class=\"col-sm-9\"><button type=\"button\" class=\"btn btn-default btn-sm button\" onclick=location.href=\"myVideos.html\"> My Videos</button></div>";
                currentHTML += "</div>";                    
                $("#ProfileContent").append(currentHTML);
                currentHTML = "";
                flag = 1;
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