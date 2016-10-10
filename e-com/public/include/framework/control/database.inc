<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/include/framework/model/valueset.inc';

class Database{
	
	private $mysql;
	
	function __construct($host,$user,$pass,$dbname){
		$this->mysql=new mysqli();
		$this->mysql->connect($host,$user,$pass,$dbname);
		if($this->mysql->errno){
			throw new Exception("SQL Connection Error($this->mysql->connect_errno):\n".$this->mysql->connect_error);
		}
	}
	
	function query($query,ValueSet $valuesets=NULL){
		$prepared = $this->mysql->prepare($query);
		if(!$prepared){
			throw new Exception("invalid query<br />".$this->mysql->error);
		}
		if(!is_null($valuesets)){
			$d="";
			foreach ($valuesets->getType() as $item){
				$d=$d.$item;
			}
			$param=array($d);
			foreach ($valuesets->getValues() as $item){
				array_push($param, $item);
			}
			$bind=call_user_func_array(array($prepared,"bind_param"),$this->refValues($param));
			if(!$bind){
				throw new Exception("Failed to bind parameter ($prepared->errno) ".$prepared->error);
			}
		}
		if($prepared->execute()){
			$ret = $prepared->get_result();
			$prepared->close();
			return $ret;
		}else{
			throw new Exception("SQL Error ($prepared->errno) : <br/>".$prepared->error);
		}
	}

	function refValues($arr){
		if (strnatcmp(phpversion(),'5.3') >= 0){
			$refs = array();
			foreach($arr as $key => $value)
				$refs[$key] = &$arr[$key];
				return $refs;
		}
		return $arr;
	}
	
	function close(){
		$thread = $this->mysql->thread_id;
		$this->mysql->kill($thread);
		$this->mysql->close();
	}
}
?>