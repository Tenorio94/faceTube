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
            "action" : "DISPLAYMYVIDEOS"
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
                currentHTML += "<tr class=temporal>"
                    currentHTML += "<td class=titleVideo>" + sessionObjJson[i].idVideo + "</td>";
                    currentHTML += "<td class=rateMe>" + sessionObjJson[i].rating + "</td>";
                                        var link = sessionObjJson[i].linkVideo;
                                        link = link.replace("watch?v=", "embed/");
                    currentHTML += "<td width=40% class=linkVideo><iframe width=\"620\" height=\"625\"src=" + link + "></iframe></td>";
                    currentHTML += "<td id=\"tableRating\" width=40%><span id=VideoTitle>" + sessionObjJson[i].titleVideo + "</span><br><span class=rating> Video Popularity: </span>"
                                    + sessionObjJson[i].rating + "/5 Stars <br><br> <span class=\"uploader\"> Uploaded by: " + sessionObjJson[i].username + "</span> <br><br> ";
                    currentHTML += "<select class=selectRate> <option value=\"1\">1</option> <option value=\"2\">2</option> <option value=\"3\">3</option> <option value=\"4\">4</option>";
                    currentHTML += "<option value=\"5\">5</option> </select><br><br><input class=rankButton id=\"rankMe\" type=\"submit\" value=\"Rank!\"> </td>";
                currentHTML += "</tr>"
                $("#tableVideos").append(currentHTML);
                currentHTML = "";
            }
        },
        error: function(errorMsg)
        {
            alert("No videos to show");
            //window.location.replace('login.html');
        }
    });


    $("#tableVideos").on("click",".rankButton", function(){
        var dataToSendRank = {
            "action": "RANKVIDEO",
            "idVideo": $(this).parent().parent().find("td.titleVideo").text(),
            "currentRating": $(this).parent().parent().find("td.rateMe").text(),
            "userRating": $(this).parent().find("select.selectRate").val()
        }
        console.log(dataToSendRank);
        $.ajax({
            url: "data/applicationLayer.php",
            type: "POST",
            data: dataToSendRank,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function(jsonObject){
                alert("Video Ranked");
                //window.location.replace("myVideos.html");
            },
            error: function(errorMsg)
            {
                alert("Error processing request");
            }
        });
    });

    $("#goPostVideo").on('click', function(){
        window.location.replace("postVideo.html");
    });


    /*var dataToSendSearch = {
            "action" : "DISPLAYMYVIDEOS"
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
                currentHTML += "<tr>"
                    currentHTML += "<tr class=\"tableElement\">";
                        currentHTML += "<td id=\"tableTitle\">" + sessionObjJson[i].titleVideo + "</td>";
                    currentHTML += "</tr>";
                    currentHTML += "<tr class=\"VR\">";
                        currentHTML += "<td class=rateMe>" + sessionObjJson[i].rating + "</td>";
                        currentHTML += "<td id=\"tableRating\">" + sessionObjJson[i].rating + "/5</td>";
                        currentHTML += "<td class=idVideo id=\"Video\">" + sessionObjJson[i].idVideo + "</td>";
                    currentHTML += "</tr>";
                    currentHTML += "<tr class=\"tableElement rank\">";
                        currentHTML += "<td class=rankButton >"
                            currentHTML += "<select class=selectRate>"
                                currentHTML +=  "<option value=\"1\">1</option>"
                                currentHTML +=  "<option value=\"2\">2</option>"
                                currentHTML +=  "<option value=\"3\">3</option>"
                                currentHTML +=  "<option value=\"4\">4</option>"
                                currentHTML +=  "<option value=\"5\">5</option>"
                            currentHTML += "</select>"
                            currentHTML += "<input id=\"rankMe\" type=\"submit\" value=\"Rank!\">"
                        currentHTML += "</td>"
                    currentHTML += "</tr>";
                    currentHTML += "<tr class=\"tableElement\">";
                        var link = sessionObjJson[i].linkVideo;
                        link = link.replace("watch?v=", "embed/")
                        currentHTML += "<td><iframe class= \"video\" id=\"ytplayer\" type=\"text/html\" width=\"640\" height=\"440\" src=\"" +link+ "\" frameborder=\"0\"</td>";
                    currentHTML += "</tr>"
                currentHTML += "</tr>"
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
    });*/


});