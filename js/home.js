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
            "action" : "DISPLAYVIDEOS"
        };

    $.ajax({
        type: "POST",
        url: "data/applicationLayer.php",
        data: dataToSendSearch,
        dataType: "json",
        success: function(sessionObjJson)
        {
            var currentHTML = "";
                currentHTML += "<tr class=\"tableElement\">";
                    currentHTML += "<td id=\"tableTitle\">" + sessionObjJson.titleVideo + "</td>";
                currentHTML += "</tr>";
                currentHTML += "<tr class=\"tableElement\">";
                    var link = sessionObjJson.linkVideo;
                    link = link.replace("watch?v=", "embed/")
                    currentHTML += "<td><iframe class= \"video\" id=\"ytplayer\" type=\"text/html\" width=\"640\" height=\"490\" src=\"" +link+ "\" frameborder=\"0\"</td>";
                currentHTML += "</tr>";
                $("#tableVideos").append(currentHTML);
                currentHTML = "";
        },
        error: function(errorMsg)
        {
            alert("No videos to show");
            //window.location.replace('login.html');
        }
    //});
    });
});