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

?>