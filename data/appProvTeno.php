<?php
	ini_set('error_reporting', E_ALL);

	header('Accept: application/json');
	require_once __DIR__ . '/dataProvTeno.php'; //Creates connection between php files.

	//echo "entra";
	$action = $_POST["action"];
	//echo "$action";

	switch($action){
		case "PROFILEFILLING": fillProfileAction();
					break;
		case "INITSESSION": startSession();
					break;
	}

	function startSession(){
		session_start();
		//echo $_SESSION["userName"];
		if( isset( $_SESSION["userName"]))
		{
			echo json_encode(array("userName" => $_SESSION["userName"]));

		}
		else
		{
			header('HTTP/1.1 406 Session has expired, you will be redirected to the login');
			die(json_encode(array('message' => 'Session expired')));
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
?>
