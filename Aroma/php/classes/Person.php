<?php

class Person {
  private $name;
  private $lastname;
  private $age;  
  private $father;
  private $mother;

  function __construct($name, $lastname, $age, $father=null, $mother=null)
  {
    $this->name = $name;
    $this->lastname = $lastname;
    $this->age = $age;    
    $this->father = $father;
    $this->mother = $mother;
  }  
  function getName() {
    return $this->name;
  }
  function getLastname() {
    return $this->lastname;
  }  
  function getFather() {
    return $this->father;
  }
  function getMother() {
    return $this->mother;
  }
  function getInfo() {
    return "<h2>A few words about my family.</h2><br>".
    "My name is: ".$this->getName().".<br>".
    "My last name is: ".$this->getLastname().".<br>".
    "My father is: ".$this->getFather()->getName()." ".$this->getFather()->getLastname().".<br>".
    "My mother is: ".$this->getMother()->getName()." ".$this->getMother()->getLastname().".<br>".
    "My grandfather on my father's side is: ".$this->getFather()->getFather()->getName()." ".$this->getFather()->getFather()->getLastname().".<br>".
    "My grandmother on my father's side is: ".$this->getFather()->getMother()->getName()." ".$this->getFather()->getMother()->getLastname().".<br>".
    "My grandfather on my mother's side is: ".$this->getMother()->getFather()->getName()." ".$this->getMother()->getFather()->getLastname().".<br>".
    "My grandmother on my mother's side is: ".$this->getMother()->getMother()->getName()." ".$this->getMother()->getMother()->getLastname().".<br>";
  }
}

$igor = new Person("Igor", "Ivanov", 75);
$galina = new Person("Galina", "Ivanova", 72);

$pavel = new Person("Pavel", "Smirnov", 74);
$lidiya = new Person("Lidiya", "Smirnova", 73);

$ivan = new Person("Ivan", "Ivanov", 45, $igor, $galina);
$irina = new Person("Irina", "Ivanova", 42, $pavel, $lidiya);
$kuzya = new Person("Kuzya", "Ivanov", 12, $ivan, $irina);

echo $kuzya->getInfo();