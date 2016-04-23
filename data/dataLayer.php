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




?>