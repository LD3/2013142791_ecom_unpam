<?php
class ValueSet{
	private $identifier;
	private $values;
	private $type;
	
	function __construct(){
		$this->identifier= array();
		$this->values= array();
		$this->type= array();
	}
	
	function add($colname ,$coltype ,$colvalue){
		array_push($this->identifier, $colname);
		array_push($this->type, $coltype);
		array_push($this->values, $colvalue);
	}
	
	function set($colname ,$coltype , $colvalue){
		$index=-1;
		for($i=0;$i<count($identifier);$i++){
			if($this->identifier[$i]==$colname){
				$index=$i;
			}
		}
		if($index>-1){
			$this->values[$index]=$colvalue;
			$this->type[$index]=$coltype;
		}
	}
	
	function remove(string $colname){
		$index=-1;
		for($i=0;$i<count($identifier);$i++){
			if($this->identifier[$i]==$colname){
				$index=$i;
			}
		}
		if($index>-1){
			array_splice($this->identifier, $index);
			array_splice($this->values, $index);
			array_splice($this->type, $index);
		}
	}
	
	function clear(){
		while(count($this->identifier)>0){
			array_pop($this->identifier);
			array_pop($this->values);
			array_pop($this->type);
		}
	}
	
	function getColumn(){
		return $this->identifier;
	}
	
	function getType(){
		return $this->type;
	}
	
	function getValues(){
		return $this->values;
	}
}
?>