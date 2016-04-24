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
    $("#logout").on("click", function(e){
    e.preventDefault();
        var dataToSendDSession = {
            "action" : "DELETESESSION"
        };

        $.ajax({
            type: "POST",
            url: "data/applicationLayer.php",
            data: dataToSendDSession,
            dataType: "json",
            success: function(sessionObjJson)
            {
                alert("Hope to see you again");
                window.location.replace('login.html');
            },
            error: function(errorMsg)
            {
                alert("SessionExpired");
                window.location.replace('login.html');
            }
        });
    });
    $("#registerButton").on("click", function(){
                var jsonObject = {
                    "firstName" : $("#fName").val(),
                    "lastName" : $("#lName").val(),
                    "userName" : $("#username").val(),
                    "userPassword" : $("#password").val(),
                    "confirmationPassword" : $("#passwordConfirmation").val,
                    "email": $("#email").val(),
                    "country" : $("#sel1").val(),
                    "action" : "REGISTER"
                };

                $.ajax({
                    type: "POST",
                    url: "data/applicationLayer.php",
                    dataType: "json",
                    data: jsonObject,
                    contentType: 'application/x-www-form-urlencoded',
                    success: function(jsonData) {
                        window.location.replace("home.html");
                       
                    },
                    error: function(errorMsg){
                        alert(errorMsg.statusText);
                    }
                });
    });
    $("#loginButton").on("click", function(){
                var jsonObject = {
                    "username" : $("#username").val(),
                    "userPassword" : $("#password").val(),
                    "action" : "LOGIN"
                };

                $.ajax({
                    type: "POST",
                    url: "data/applicationLayer.php",
                    dataType: "json",
                    data: jsonObject,
                    contentType: 'application/x-www-form-urlencoded',
                    success: function(jsonData) {
                        window.location.replace("home.html");
                       
                    },
                    error: function(errorMsg){
                        alert(errorMsg.statusText);
                    }
                });
    });
});
