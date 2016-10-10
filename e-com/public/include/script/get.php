<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/include/framework/control/database.inc';

if(isset($_GET["id"])){
	switch($_GET["id"]){
		case "whats_new":
			get_whats_new();
			break;
	}
}

function get_whats_new(){
	try{
		$db=new Database("localhost","root","","ecom");
		$res=$db->query("SELECT * FROM produk ORDER BY last_update LIMIT 0,5");
		while ($data=$res->fetch_row()){
			$img=(file_exists($_SERVER['DOCUMENT_ROOT']."/res/barang-thumb/$data[0].png"))?"/res/barang-thumb/$data[0].png":"/res/barang-thumb/no.png";
			$rupiah=(string)$data[4];
			$s="";
			for ($i = strlen($rupiah); $i > 0; $i--) {
				$s=substr($rupiah, $i-1,1).$s;
				if(($i)%3===0 && $i!==strlen($rupiah)){
					$s=".".$s;
				}
			}
			echo " ";
			echo "<div class='barang'>".
					"<img alt='$data[1]' src='$img' />".
					"<div class='button_add_wish'><img src='/res/image/ic_add_shopping_cart_white.png'/></div>".
					"<div class='title'>$data[1]</div><div class='ket'>Rp. $s,-</div>".
					"<button class='button_beli'>BELI</button>".
				"</div>";
		}
		$db->close();
	}catch (Exception $e){
		echo $e->getMessage();
	}
}

function get_main_content($index, $amount, $search=NULL, $order=NULL){
	try{
		$db=new Database("localhost","root","","ecom");
		$set=new ValueSet();
		if($search===NULL)$search="";
		if($order===NULL)$order="nama";
		$set->add("like","s","%".$search."%");
		$set->add("order","s",$order);
		$set->add("b","i",$index);
		$set->add("a","i",$index+$amount);
		$res=$db->query("SELECT * FROM produk WHERE nama LIKE ? ORDER BY ? LIMIT ? , ?",$set);
		while ($data=$res->fetch_row()){
			$img=(file_exists($_SERVER['DOCUMENT_ROOT']."/res/barang-thumb/$data[0].png"))?"/res/barang-thumb/$data[0].png":"/res/barang-thumb/no.png";
			$rupiah=(string)$data[4];
			$s="";
			for ($i = strlen($rupiah); $i > 0; $i--) {
				$s=substr($rupiah, $i-1,1).$s;
				if(($i)%3===0 && $i!==strlen($rupiah)){
					$s=".".$s;
				}
			}
			echo " ";
			echo "<div class='barang'>".
					"<img alt='$data[1]' src='$img' />".
					"<div class='button_add_wish'><img src='/res/image/ic_add_shopping_cart_white.png'/></div>".
					"<div class='title'>$data[1]</div><div class='ket'>Rp. $s,-</div>".
					"<button class='button_beli'>BELI</button>".
					"</div>";
		}
	}catch (Exception $e){
		echo $e->getMessage();
	}
}
?>