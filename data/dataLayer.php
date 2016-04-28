<?php

	function connect()
	{
			$servername = "localhost";
			$username = "root";
			$password = "root";
			$dbname = "facetube";

			$connection = new mysqli($servername, $username, $password, $dbname);
		
			# Check connection
			if ($connection->connect_error) 
			{
			    return null;
			}
			else
			{
				return $connection;
			}
	}


	function getListVideos($username, $search){
		$conn = connect();

		if($conn != null){
			$sql = "SELECT * FROM video WHERE title LIKE '%$search%'";
			$result = $conn -> query($sql);
			$response = array();

			if($result->num_rows > 0){	
				 while($row = $result->fetch_assoc()){
				    array_push($response, array('titleVideo' => $row['title'], 'linkVideo' => $row['linkVideo'], 'rating' => $row['rating'], 'username' => $row['username']));
				 }

				return $response;
			 }
			else
			{
				 
				header('HTTP/1.1 406 User not found');
				die("User does not existtt");
			}
		}
	}

	function getListStrangers($username, $search){
		$conn = connect();

		if($conn != null){
			$sql = "SELECT * FROM profile WHERE username LIKE '%$search%'";
			$result = $conn -> query($sql);
			$response = array();

			if($result->num_rows > 0){
				while($row = $result->fetch_assoc()){
					$found = $row['username'];

					$sql2 = "SELECT currentUser FROM request WHERE currentUser = '$found' AND askedUser = '$username'";
					$result2 = $conn -> query($sql2);

					$sql3 = "SELECT askedUser FROM request WHERE askedUser = '$found' AND currentUser = '$username'";
					$result3 = $conn -> query($sql3);

					if(!($result2->num_rows > 0)){
						if(!($result3->num_rows > 0)){
						array_push($response, array("username" => $row['username'], 'fName' => $row['fName'], 'lName' => $row['lName']));
						}
					}
				}
			}
			return $response;
		}
	}

	function findFriends($username){
		$conn = connect();

		if($conn != null){
			$sql = "SELECT askedUser FROM request WHERE currentUser = '$username' AND status = 'A'";
			$result = $conn -> query($sql);
			$response = array();

			if($result->num_rows > 0)
			{	
				 while($row = $result->fetch_assoc())
				 {
				 	//echo $row['currentUser'];
				 	$userToFind = $row['askedUser'];
				 	$sql2 = "SELECT * FROM profile WHERE username = '$userToFind'";
				 	$result2 = $conn -> query($sql2);
				 	$row2 = $result2->fetch_assoc();
				    array_push($response, array('fName' => $row2['fName'], 'lName' => $row2['lName'], 'email' => $row2['email'], 'username' => $row2['username']));
				 }

				return $response;
			 }
			else
			{
				 
				header('HTTP/1.1 406 User not found');
				die("User does not existtt");
			}
		}
	}

	function updateRanking($username, $idVideo, $userRating){
		$conn = connect();

		if($conn != null){
			$sql0 = "SELECT rating FROM Video WHERE idVideo = '$idVideo'";
			$result = $conn -> query($sql0);
			$row = $result->fetch_assoc();
			$previousRating = $row['rating'];

			$sql = "SELECT ratingCount FROM Video WHERE idVideo = '$idVideo'";
			$result = $conn -> query($sql);
			$row = $result->fetch_assoc();
			$previousRatingCount = $row['ratingCount'];

			if($previousRatingCount != 0)
				$previousRating = $previousRating * $previousRatingCount;

			$previousRating = $previousRating + $userRating;
			$previousRatingCount = $previousRatingCount + 1;

			$sql1 = "UPDATE Video SET ratingCount = '$previousRatingCount' WHERE idVideo = '$idVideo'";
			$result1 = $conn -> query($sql1);

			$previousRating = $previousRating / $previousRatingCount;

			$sql2 = "UPDATE Video SET rating = '$previousRating' WHERE idVideo = '$idVideo'";
			$result2 = $conn -> query($sql2);

			if($result2 === TRUE){
				$response = array("statusText" => "SUCCESS");
				return $response;
			}
			else{
				$response = array("statusText" => "FAILURE");
				return $response;
			}
		}
	}

	function rejectFriendRequest($currentUserU, $sendingUserU){
		$conn = connect();

		if($conn != null){
			$sql3 = "DELETE FROM Request WHERE askedUser = '$currentUserU' AND currentUser = '$sendingUserU'";
			$result3 = $conn -> query($sql3);

			if($result3 === TRUE){
				$response = array("statusText" => "SUCCESS");
				return $response;
			}
			else{
				$response = array("statusText" => "FAILURE");
				return $response;
			}
		}
	}

	function acceptFriendRequest($currentUserU, $sendingUserU){
		$conn = connect();

		if($conn != null){
			$sql = "INSERT INTO Request(askedUser, currentUser, status)
					VALUES('$currentUserU', '$sendingUserU', 'A')";
			$result = $conn -> query($sql);

			$sql2 = "INSERT INTO Request(askedUser, currentUser, status)
					VALUES('$sendingUserU', '$currentUserU', 'A')";
			$result2 = $conn -> query($sql2);

			$sql3 = "DELETE FROM Request WHERE askedUser = '$currentUserU' AND currentUser = '$sendingUserU' AND status = 'P'";
			$result3 = $conn -> query($sql3);

			if(($result === TRUE) && ($result2 === TRUE) && ($result3 === TRUE)){
				$response = array("statusText" => "SUCCESS");
				return $response;
			}
			else{
				$response = array("statusText" => "FAILURE");
				return $response;
			}
		}
	}
	
	function displaySuggestedFriendsDL($username){
		$conn = connect();
		if($conn != null){
			//$sql = "SELECT username FROM profile WHERE username NOT IN  (SELECT askedUser FROM request WHERE currentUser = '$username' and status = 'A') 
			//AND NOT IN  (SELECT currentUser FROM request WHERE askedUser  = '$username' and status = 'A')";
			//$sql = "SELECT username FROM profile WHERE username  WHERE username IN (SELECT currentUser FROM request where askedUser = '$username')";
			
			$sql = "SELECT username FROM profile WHERE username <> '$username' AND username not IN (SELECT currentUser FROM request WHERE askedUser = '$username' AND (status = 'A') OR (status = 'P'))";
			$result = $conn->query($sql);


			$response = array();
			if($result->num_rows > 0)
			{	
				 while($row = $result->fetch_assoc())
				 { 
				     array_push($response, array("username" => $row['username']));
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

	function friendRequestDL($username){

		$conn = connect();
		if($conn != null){

			$sql = "SELECT currentUser FROM request WHERE askedUser = '$username' and status = 'P'";
			$result = $conn->query($sql);
			$response = array();
			 if($result->num_rows > 0)
			{	
				//echo $result->num_rows;
				 while($row = $result->fetch_assoc())
				 { 
				 	
				    array_push($response, array('currentUser' => $row['currentUser']));
				    //echo $response;
				    //array_push($response, array("currentUser" => $row["currentUser"], 'actualUser' => $row['actualUser']);
				 	//$response = array('currentUser' => $row['currentUser']);
				 	//array_push($response, array("username" => $row['username'], 'fName' => $row['fName'], 'lName' => $row['lName']));
						
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

	
	function getFriendVideos($username){
		$conn = connect();

		if($conn != null){
			$sql = "SELECT * FROM video WHERE username <> '$username' AND
			 username  IN (SELECT currentUser FROM request WHERE askedUser = '$username' AND status = 'A')";

			$result = $conn->query($sql);
			$response = array();

			if($result->num_rows > 0)
			{		
				while($row = $result->fetch_assoc())
				 {
				 	array_push($response, array('titleVideo' => $row['title'], 'linkVideo' => $row['linkVideo'], 'rating' => $row['rating'], 'username' => $row['username']));
					//$response = array('titleVideo' => $row['title'], 'linkVideo' => $row['linkVideo'], 'rating' => $row['rating']);
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

	function getVideos($username){
		$conn = connect();

		if($conn != null){
			$sql = "SELECT * FROM video WHERE username = '$username'";
			$result = $conn->query($sql);
			$response = array();

			if($result->num_rows > 0)
			{		
				while($row = $result->fetch_assoc())
				 {
					array_push($response, array('titleVideo' => $row['title'], 'linkVideo' => $row['linkVideo'], 'rating' => $row['rating'], 'username' => $row['username'], 'idVideo' => $row['idVideo']));
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
	
	function postVideoL($titleVideo, $linkVideo, $username){
		$conn = connect();

		if($conn != null){
			$sql = "INSERT INTO user(username) VALUES ('$username')";
			$result = $conn->query($sql);

			$sql2 = "INSERT INTO video(username,title,linkVideo,ratingCount) VALUES ('$username','$titleVideo','$linkVideo', 0)";
			$result2 = $conn->query($sql2);
			
			if (mysqli_query($conn, $sql)) 
	    	{
	    		# User registered correctly
	    		$conn->close();
			    return array("status" => "COMPLETE");
			} 

			else
			{
				$conn->close();
				return array("status" => "ERROR");
			}
		}
		 else
        {
        	# Connection to Database was not successful
        	$conn->close();
        	return array("status" => "ERROR");
        }
	 }
	
	function verifyUser($userName)
    {
    	# Open and validate the Database connection
    	$conn = connect();

        if ($conn != null)
        {
        	$sql = "SELECT * FROM profile  WHERE username = '$userName'";
			$result = $conn->query($sql);

			if ($result->num_rows > 0)
			{
				# The current user already exists
				$conn->close();
				return array("status" => "ERROR");
			}
			else
			{
				# Username not yet in use
				$conn->close();
				return array("status" => "COMPLETE");
			}
        }
        else
        {
        	# Connection to Database was not successful
        	$conn->close();
        	return array("status" => "ERROR");
        }
    }
    # Query to insert a new user to the Database
    function registerNewUser($userFirstName, $userLastName, $userName, $userPassword,$email,$country)
    {
    	# Open and validate the Database connection
    	$conn = connect();

        if ($conn != null)
        {
        	$sql = "INSERT INTO profile(fName, lName, username, passwrd,email,country) VALUES ('$userFirstName', '$userLastName', '$userName', '$userPassword','$email','$country')";		
			if (mysqli_query($conn, $sql)) 
	    	{
	    		# User registered correctly
	    		$conn->close();
			    return array("status" => "COMPLETE");
			} 
			else 
			{
				# Something went wrong when inserting the user
				$conn->close();
				return array("status" => "ERROR");
			}
        }
        else
        {
        	# Connection to Database was not successful
        	$conn->close();
        	return array("status" => "ERROR");
        }
    } 
        # Query to retrieve a user data
    function validateUser($userName)
    {
        # Open and validate the Database connection
    	$conn = connect();

        if ($conn != null)
        {
        	$sql = "SELECT * FROM profile WHERE username = '$userName'";
			$result = $conn->query($sql);
			
			# The current user exists
			if ($result->num_rows > 0)
			{
				while($row = $result->fetch_assoc()) 
		    	{
		    		
					$conn->close();
					return array("status" => "COMPLETE", "fName" => $row['fName'], "lName" => $row['lName'], "password" => $row['passwrd']);
				}
			}
			else
			{
				# The user doesn't exists in the Database
				$conn->close();
				return array("status" => "ERROR");
			}
        }
        else
        {
        	# Connection to Database was not successful
        	$conn->close();
        	return array("status" => "ERROR");
        }
    }

	 function sendFriendRequest($senderU, $receiverU){
	 		$conn = connect();

	 		if($conn != null){
	 			$sql = "INSERT INTO request(currentUser, askedUser, status)
	 					VALUES ('$senderU', '$receiverU', 'P')";
	 			$result = $conn -> query($sql);

	 			if($result === TRUE){
	 				$response = array("statusText" => "SUCCESS");
	 				return $response;
	 			}
	 			else{
	 				$response = array("statusText" => "FAILURE");
	 				return $response;
	 			}
	 		}
	 	}



?>