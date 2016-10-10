/**
 * 
 */
function load_whats_new(){
	var ajax_request;
	try{
		ajax_request=new XMLHttpRequest();
	}catch(e){
		try{
			ajax_request=new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			try{
				ajax_request=new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e){
				alert("Unsupported");
				return false;
			}
		}
	}
	ajax_request.onreadystatechange =function(){
		if (this.readyState == 4 && this.status == 200) {
            document.getElementById("whats_new").innerHTML = this.responseText;
        }
	};
	ajax_request.open("GET", "/include/script/get.php?id=whats_new", true);
	ajax_request.send();
}

function show_wishlist(){
	x=document.getElementById("wishlist_win");
	if(x.style.visibility===""||x.style.visibility==="hidden"){
		x.style.visibility="visible";
		x.style.top="155px";
	}else{
		x.style.visibility="hidden";
		x.style.top="150px";
	}
}

function add_to_wishlist(item){
	
}