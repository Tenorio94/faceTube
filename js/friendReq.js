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

     var flagSugFriend = 0; 
    var dataToSend = {
        "action" : "SuggestedFriends"
    };
    $.ajax({
        url: "data/applicationLayer.php",
            type: "POST",
            data: dataToSend,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function(jsonObject)
            {
                var currentHTML = "";
                if(flagSugFriend == 0){
                    for(var i = 0; i <= jsonObject.length - 1; i++)
                    {
                        currentHTML += "<tr>";
                            currentHTML += "<td width=25% class=username>" + jsonObject[i].username+"</td>";
                             currentHTML += "<td width=25% class=addButton><input id= sendRequest type=submit  value= Send ></td>";
                             currentHTML += "</br>";
                        currentHTML += "</tr>";
                        $("#strangers").append(currentHTML);
                        currentHTML = "";
                        flagComment = 1;
                    }
                }

            },
             error: function(errorMsg)
            {
                alert("Unable to appenddddd");
            }


    });

    $("#tableSuggested").on("click",".addButton", function(){
        var dataToSendAddFriend = {
            "action": "ADDFRIEND",
            "username": $(this).parent().find("td.username").text()
        }
        console.log(dataToSendAddFriend);
        $.ajax({
            url: "data/applicationLayer.php",
            type: "POST",
            data: dataToSendAddFriend,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function(jsonObject){
                alert("Friend Request Sent!");
                window.location.replace("home.html");
            },
            error: function(errorMsg)
            {
                alert("Error processing request");
            }
        });
    });

    var flagComment = 0;
    var jsonObj = {
        "action"  : "FRIENDREQUESTS"
    };
    $.ajax({
        type: "POST",
        url: "data/applicationLayer.php",
        dataType: "json",
        data:jsonObj,
        contentType: 'application/x-www-form-urlencoded',
        success : function(jsonData) {
            var currentHTML = "";
            if(flagComment == 0){
                for(var i = 0; i <= jsonData.length - 1; i++)
                {
                    currentHTML += "<tr>";
                        currentHTML += "<td width=25% class=username>" + jsonData[i].currentUser+"</td>";
                        currentHTML += "<td width=20% class=acceptButton><input id= accept type=  submit  value= Accept ></td>"
                        currentHTML += "<td width=20% class=rejectButton><input id= decline type=  submit  value= Decline ></td>"; 
                    currentHTML += "</tr>";
                    $("#tableSuggested").append(currentHTML);
                    currentHTML = "";
                    flagComment = 1;
                }
            }
        },
        error : function (errorMsg){
            alert(errorMsg.statusText);
        }
    });

    $("#tableSuggested").on("click",".rejectButton", function(){
        var dataToSendReject = {
            "action": "REJECTREQUEST",
            "username": $(this).parent().find("td.username").text()
        }
        console.log(dataToSendReject);
        $.ajax({
            url: "data/applicationLayer.php",
            type: "POST",
            data: dataToSendReject,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function(jsonObject){
                alert("Friend Request Rejected!");
                window.location.replace("home.html");
            },
            error: function(errorMsg)
            {
                alert("Error processing request");
            }
        });
    });

    $("#tableSuggested").on("click",".acceptButton", function(){
        var dataToSendAccept = {
            "action": "ACCEPTREQUEST",
            "username": $(this).parent().find("td.username").text()
        }
        console.log(dataToSendAccept);
        $.ajax({
            url: "data/applicationLayer.php",
            type: "POST",
            data: dataToSendAccept,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function(jsonObject){
                alert("Friend Request Accepted!");
                //window.location.replace("home.html");
            },
            error: function(errorMsg)
            {
                alert("Error processing request");
            }
        });
    });

});