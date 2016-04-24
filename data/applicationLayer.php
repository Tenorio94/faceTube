<?php
header('Content-type: application/json');
	require_once __DIR__ . '/dataLayer.php';
	
	$action = $_POST['action'];
	switch($action)
	{
		case 'REGISTER':registerAction();
					break;
		case 'LOGIN'   :loginAction();
					break;
		case 'COOKIES' : initCookies();
					break;
		case "DELETESESSION": deleteSession();
					break;
		case "PROFILEFILLING": fillProfileAction();
					break;
		case "INITSESSION": startSession();
					break;
		case "POSTVIDEO" : postVideo();
					break;
		case "DISPLAYVIDEOS": displayVideos();
					break;
		case "FRIENDREQUESTS":friendRequest();
			break;
	}

	function friendRequest(){
		
		session_start();
		if( isset( $_SESSION["userName"])){
			$username = $_SESSION["userName"];
			
			$result = friendRequestDL($username);
			//echo $result;

			if(true){
				echo json_encode($result);
			}
			else{
				header('HTTP/1.1 406 User not found');
				die("User does not exist");
			}

		}
		else{
			header('HTTP/1.1 406 User not found');
			die("User does not exist");
		}
	}

	function displayVideos(){
		session_start();
		if( isset( $_SESSION["userName"])){
			$username = $_SESSION["userName"];

			$result = getVideos($username);

			if(true){
				echo json_encode($result);
			}
			else{
				header('HTTP/1.1 406 User not found');
				die("User does not exist");
			}
		}
	}

	function postVideo(){

		session_start();
		if( isset( $_SESSION["userName"])){
			
		
			$username = $_SESSION["userName"];
			$linkVideo = $_POST['linkVideo'];
			$titleVideo = $_POST['titleVideo'];

		   $result = postVideoL($titleVideo, $linkVideo, $username);
			if(true){
				echo json_encode($result);
			}
			else{
				header('HTTP/1.1 406 User not found');
				die("User does not exist");
			}

		}
			
		else{
			header('HTTP/1.1 406 User not found');
			die("User does not exist");
		}


	}
	function fillProfileAction(){
		session_start();
		if( isset( $_SESSION["userName"])){
			$userName = $_SESSION["userName"];
			//echo $userName;

			$result = getProfile($userName);
			//echo $result;
			if(true){
				//echo "success";
				echo json_encode($result);
			}
			else{
				header('HTTP/1.1 406 User not found');
				die("User does not exist");
			}
		}
	}

	//function startSession(){
		//session_start();
		//echo $_SESSION["userName"];
		/*if( isset( $_SESSION["userName"]))
		{
			echo json_encode(array("userName" => $_SESSION["userName"]));

		}
		else
		{
			header('HTTP/1.1 406 Session has expired, you will be redirected to the login');
			die(json_encode(array('message' => 'Session expired')));
		}*/
	//}

	function deleteSession(){
		session_start();
		if( isset( $_SESSION["userName"]))
		{
			unset($_SESSION["userName"]);
			session_destroy();
			echo json_encode(array('success' => 'Session deleted'));
		}
		else
		{
			header('HTTP/1.1 406 Session has expired, please login again');
			die(json_encode(array('message' => 'Session expired')));
		}
	}
# Action to register a user
	function registerAction()
	{
		$userName = $_POST['userName'];

		# Verify that the user doesn't exist in the database
		$result = verifyUser($userName);

		if ($result['status'] == 'COMPLETE')
		{
			
			$userFirstName = $_POST['firstName'];
			$userLastName = $_POST['lastName'];
			$email = $_POST['email'];
			$country = $_POST['country'];


			$userPassword = encryptPassword();

			# Make the insertion of the new user to the Database
			$result = registerNewUser($userFirstName, $userLastName, $userName, $userPassword,$email,$country);

			# Verify that the insertion was successful
			if ($result['status'] == 'COMPLETE')
			{
				# Starting the session
				startSession($userFirstName, $userLastName, $userName);
				echo json_encode($result);
			}
			else
			{
				# Something went wrong while inserting the new user
				die(json_encode($result));
				header('HTTP/1.1 409 Your action was not completed correctly, please try again later');
				die("Username in use");
			}  
		}
		else
		{
			# Username already exists
			header('HTTP/1.1 412 That username already exists');
			die("Username in use");
		}
	}
	# Action to encrypt the password of the user
	function encryptPassword()
	{
		$userPassword = $_POST['userPassword'];

	    $key = pack('H*', "bcb04b7e103a05afe34763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
	    $key_size =  strlen($key);
	    
	    $plaintext = $userPassword;

	    $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
	    $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
	    
	    $ciphertext = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $plaintext, MCRYPT_MODE_CBC, $iv);
	    $ciphertext = $iv . $ciphertext;
	    
	    $userPassword = base64_encode($ciphertext);

	    return $userPassword;
	}
		# Action to set the initial values of the session
	function startSession($fName, $lName, $username)
    {
		// Starting the session
	    session_start();
		$_SESSION['userFirstName'] = $fName;
	    $_SESSION['userLastName'] = $lName;
	    $_SESSION['userName'] = $username;
    }
    function initCookies(){
		if (isset($_COOKIE["usernameCookie"]))
		{
			echo json_encode(array("cookieValue" => $_COOKIE["usernameCookie"]));
		}
		else
		{
			header('HTTP/1.1 406 Cookie has not been set yet');
			die(json_encode(array('message' => 'Cookie not set')));
		}
	}
	# Action to make a new login
	function loginAction()
	{
		$userName = $_POST['username'];
		

		# Get the user password to compare it and decrypt it
		$result = validateUser($userName);

		if ($result['status'] == 'COMPLETE')
		{
			# Decrypt the password retrieved form the database
			$decryptedPassword = decryptPassword($result['password']);
		

			$password = $_POST['userPassword'];
			
			#echo $decryptedPassword;

			# Compare the decrypted password with the one provided by the user
		   	if ($decryptedPassword === $password)
		   	{	
		    	$response = array("status" => "COMPLETE");   
			    
			    # Starting the sesion
		    	startSession($userFirstName, $userLastName, $userName);
		    	setcookie("usernameCookie", $userName, time() + 3600 * 24 * 30);
			    echo json_encode($response);
			}
			else
			{
				header('HTTP/1.1 306 Wrong credentials');
				die("Wrong credentials");
			}
		}

	}
		#Action to decrypt the password of the user
	function decryptPassword($password)
	{
		$key = pack('H*', "bcb04b7e103a05afe34763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
	    
	    $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
	    $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
    	
	    $ciphertext_dec = base64_decode($password);
	    $iv_dec = substr($ciphertext_dec, 0, $iv_size);
	    $ciphertext_dec = substr($ciphertext_dec, $iv_size);

	    $password = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $ciphertext_dec, MCRYPT_MODE_CBC, $iv_dec);
	   	
	   	
	   	$count = 0;
	   	$length = strlen($password);

	    for ($i = $length - 1; $i >= 0; $i --)
	    {
	    	if (ord($password{$i}) === 0)
	    	{
	    		$count ++;
	    	}
	    }

	    $password = substr($password, 0,  $length - $count); 

	    return $password;
	}


?>