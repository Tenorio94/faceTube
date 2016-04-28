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


    $("#registerButton").on("click", function(e){
        e.preventDefault();

        var validated = true;
        if($("#fName").val() === ""){
            $("#errFirstName").text("Please enter your first name.");
            validated = false;
        }
        
        if($("#lName").val() == ""){
            $("#errLastName").text("Please enter your last name.");
            validated = false;
        }

        if($("#usernameReg").val() == ""){
            $("#errUsername").text("Please enter your username.");
            validated = false;
        }
        
        if($("#email").val() == ""){
            $("#errEmail").text("Please enter your email.");
            validated = false;
        }
        
        if($("#password").val() == ""){
            $("#errPassword").text("Please enter your password.");
            validated = false;
        }
        
        if($("#passwordConfirmation").val() == ""){
            $("#errPasswordCon").text("Please confirm your password.");
            validated = false;
        }
        
        if(($("#password").val()) !== ($("#passwordConfirmation").val())){
            $("#errPasswordCon").text("Passwords do not match.");
            validated = false;
        }
        
        if((($("#masculine").is(":checked"))) || (($("#feminine").is(":checked")))){
            $("#errGender").text("Please select your gender.");
            validated = false;
        }
        
        if(($("#sel1").val() == 0)){
            $("#countryError").text("Please enter a country.");
            validated = false;  
        }
        
        if(validated){
            window.location.replace("home.html");
        }

        var jsonObject = {
            "firstName" : $("#fName").val(),
            "lastName" : $("#lName").val(),
            "userName" : $("#usernameReg").val(),
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

    $("#loginButton").on("click", function(e){
        e.preventDefault();
        var flag = true;
        if($("#username").val() === ""){
            $("#errorMessageUserName").text("Please enter your username.");
            var flag = false;
        }

        if($("#userPassword").val() === ""){
            $("#errorMessagePassword").text("Please enter your password.");
            var flag = false;
        }

        if(flag){
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
        }
    });

    $("#postVideo").on("click",function(){
        var jsonObj = {
            "titleVideo" : $("#titleVideo").val(),
            "linkVideo" : $("#linkVideo").val(),
            "action"  : "POSTVIDEO"
        };
        $.ajax({
            type: "POST",
            url: "data/applicationLayer.php",
            dataType: "json",
            data:jsonObj,
            contentType: 'application/x-www-form-urlencoded',
            success : function(jsonData) {
                alert("Video posted!");
                window.location.replace("home.html");

            },
            error : function (errorMsg){
                alert(errorMsg.statusText);
            }

        });
    });

});
