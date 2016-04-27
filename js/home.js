$(document).ready(function(){
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

    var dataToSendSearch = {
            "action" : "DISPLAYFRIENDSVIDEOS"
        };

    $.ajax({
        type: "POST",
        url: "data/applicationLayer.php",
        data: dataToSendSearch,
        dataType: "json",
        success: function(sessionObjJson)
        {
            for(var i = 0; i <= sessionObjJson.length - 1; i++)
            {
                var currentHTML = "";
                currentHTML += "<tr class=\"tableElement\">";
                    currentHTML += "<td id=\"tableTitle\">" + sessionObjJson[i].titleVideo + "</td>";
                currentHTML += "</tr>";
                currentHTML += "</tr>";
                currentHTML += "<tr class=\"tableElement\">";
                    currentHTML += "<td id=\"tableRating\"> <span class=\"rating\">Popularity</span>: " + sessionObjJson[i].rating + "/5</td>";
                currentHTML += "</tr>";
                currentHTML += "<tr class=\"tableElement\">";
                    var link = sessionObjJson[i].linkVideo;
                    link = link.replace("watch?v=", "embed/")
                    currentHTML += "<td><iframe class= \"video\" id=\"ytplayer\" type=\"text/html\" width=\"640\" height=\"440\" src=\"" +link+ "\" frameborder=\"0\"</td>";
                currentHTML += "&nbsp;"
                $("#tableVideos").append(currentHTML);
                currentHTML = "";
            }
        },
        error: function(errorMsg)
        {
            alert("No videos to show");
            //window.location.replace('login.html');
        }
    //});
    });
});