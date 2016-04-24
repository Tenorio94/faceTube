<?php
	function connect(){
		$servername = "localhost";
		$usernameDB = "root";
		$passwordDB = "root";
		$nameDB = "faceTube";

		$connection = new mysqli($servername, $usernameDB, $passwordDB, $nameDB);

		if ($connection -> connect_error){
			return null;
		}
		else{
			return $connection;
		}
	}

	function getProfile($usernameU){
		$conn = connect();

		if($conn != null){
			$sql = "SELECT * FROM profile WHERE username = '$usernameU'";
			$result = $conn->query($sql);

			if($result->num_rows > 0)
			{		
				while($row = $result->fetch_assoc())
				 {
				 	//echo "entrabien";
					$response = array('fName' => $row['fName'], 'lName' => $row['lName'], 'email' => $row['email'], 'username' => $row['username']);	
				}
				return $response;
			}
			else
			{
				header('HTTP/1.1 406 User not found');
				die("User does not exist");
			}
		}
	}

?>