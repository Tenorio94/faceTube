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
                currentHTML += "<div class=\"row\">";
                    currentHTML += "<div class=\"col-sm-3\">Username:</div>";
                    currentHTML += "<div class=\"col-sm-9\">" + jsonObject.username + "</div>";
                currentHTML += "</div>";
                currentHTML += "<div class=\"row\">";
                    currentHTML += "<div class=\"col-sm-3\">First Name:</div>";
                    currentHTML += "<div class=\"col-sm-9\">" + jsonObject.fName + "</div>";
                currentHTML += "</div>";
                currentHTML += "<div class=\"row\">";
                    currentHTML += "<div class=\"col-sm-3\">Last Name:</div>";
                    currentHTML += "<div class=\"col-sm-9\">" + jsonObject.lName + "</div>";
                currentHTML += "</div>";
                currentHTML += "<div class=\"row\">";
                    currentHTML += "<div class=\"col-sm-3\">E-mail:</div>";
                    currentHTML += "<div class=\"col-sm-9\">" + jsonObject.email + "</div>";
                currentHTML += "</div>";
                currentHTML += "<div class=\"row\">";
                    currentHTML += "<div class=\"col-sm-3\"><input onclick=location.href=\"changePassword.html\" type=\"submit\" value=\" Change Password\"></div>";
                    currentHTML += "<div class=\"col-sm-9\"><input type=\"submit\" value=\" Edit Info\"></div>";
                currentHTML += "</div>";
                currentHTML += "<div class=\"row\">";
                    currentHTML += "<div class=\"col-sm-9\"><a href=\"rankVideos.html\" id=\" RVideos\">Videos Ranked</div>";
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
});