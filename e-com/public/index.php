<!DOCTYPE html>
<?php 
include $_SERVER['DOCUMENT_ROOT'].'/include/script/get.php';
$search=(isset($_POST['cari']))?$_POST['cari']:"";
$page=(isset($_POST['last_item_index']))?$_POST['last_item_index']:0;
$amon=(isset($_POST['max_amount_item']))?$_POST['max_amount_item']:20;
?>
<html>
	<head>
		<title>Jual beli</title>
		<link rel="stylesheet" type="text/css" href="css/root.css">
		<link rel="stylesheet" type="text/css" href="css/base-light.css">
		<script type="text/javascript" src="/script/script_L.js"></script>
		<script type="text/javascript" src="/script/handcook.js"></script>
		<script type="text/javascript" src="/script/wsl.js"></script>
		<script type="text/javascript">
			var wishes=prepare();
		</script>
	</head>
	<body>
		<div id="wrapper">
			<header>
				<div id="main_menu">
					<div>home</div>
					<div>about</div>
				</div>
				<img style="padding: 1em" alt="{ e-com" src="/res/image/e-com_logo.png" />
			</header>
			<nav>
				<div id="wishlist" onclick="show_wishlist()" ></div>
				<div id="num_wish">O</div>
			</nav>
			<div id="wishlist_win">
			
			</div>
			<!-- div id="ic_main"></div-->
			<section>
				<div id="filter_bar">
					<form>
						<input type="text" class="cari" name="cari" placeholder="Cari . . ." />
						<button class="caribtn">&gt;</button>
					</form>
				</div>
				<div id="content">
					<div id="whats_new">
						<?php get_whats_new();?>
					</div>
					<div id="main_content">
						<?php get_main_content($page,$amon,$search);?>
					</div>
				</div>
			</section>
		</div>
	</body>
</html>