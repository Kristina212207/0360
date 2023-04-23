<?php
class User {
  private $name;
  private $lastname;
  private $email;
  private $id;

  function __construct($id, $name, $lastname, $email)
  {
    $this->id = $id;
    $this->name = $name;
    $this->lastname = $lastname;
    $this->email = $email;
  }

  function getId() {
    return $this->id;
  }
  function getName() {
    return $this->name;
  }
  function getLastname() {
    return $this->lastname;
  }
  function getEmail() {
    return $this->email;
  }
  //Статический метод регистрации (добавления) пользователя
  static function addUser($name, $lastname, $email, $pass) {
    global $mysqli;
    $email = mb_strtolower(trim($email));
    $pass = trim($pass);
    $passHash = password_hash($pass, PASSWORD_DEFAULT);

    $result = $mysqli->query("SELECT * FROM `users` WHERE `email`='$email'");
    if ($result->num_rows != 0) {
      return json_encode(["result"=>"exist"]);
    } else {
      $mysqli->query("INSERT INTO `users`(`name`, `lastname`, `email`, `pass`) VALUES ('$name', '$lastname', '$email', '$passHash')");
      return json_encode(["result"=>"success", "pass" => $pass, "passHash" => $passHash]);
    }    
  }

  // Статический метод авторизации пользователя
  static function authUser($email, $pass) {
    global $mysqli;    
    $email = trim(mb_strtolower($_POST["email"]));
    $pass = trim($_POST["pass"]);
    
    $result = $mysqli->query("SELECT * FROM `users` WHERE `email`='$email'");
    $result = $result->fetch_assoc();
    if (password_verify($pass, $result["pass"])) {
      $_SESSION["id"] = $result["id"];
      return json_encode(["result" => "success"]);
    } else {
      return json_encode(["result" => "failure"]);
    }
  } 

}