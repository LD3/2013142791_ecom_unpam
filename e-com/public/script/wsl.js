/**
 * 
 */
function Wishlister(){
	this.item=new Array();
	this.amon=new Array();
	this.cook=cook;
	this.overcook=overcook;
	this.add=add;
	this.addd=add;
	this.set=set;
	this.remove=remove;
}

function add(itemID){
	if(this.item.lastIndexOf(itemID)==-1){
		this.item.push(itemID);
		this.amon.push(1);
	}
}

function addd(itemID,amount){
	if(this.item.lastIndexOf(itemID)==-1){
		this.item.push(itemID);
		this.amon.push(1);
	}
}

function set(itemID, amount){
	var index = this.item.lastIndexOf(itemID);
	if(amount==0){
		remove(this.itemID);
		return;
	}
	if(index>=0){
		this.amon[index]=amount;
	}
}

function remove(itemID){
	var index = this.item.lastIndexOf(itemID);
	if(index>=0){
		for(var i=index;i<this.item.length-1;i++){
			this.item[i]=this.item[i+1];
			this.amon[i]=this.amon[i+1];
		}
		this.item.pop();
		this.amon.pop();
	}
}

function cook(){
	var ret="";
	for(var i=0;i<this.item.length;i++){
		ret=ret+this.item[i]+"^"+this.amon[i]+"_";
	}
	return ret;
}

function prepare(){
	var obj=new Wishlister();
	var cook=new CookieHandler();
	cook.read();
	var items;
	if(cook.getItem('wish')!=null){
		items=cook.getItem('wish').split("_");
		if(items[items.length-1]==""||items[items.length-1]==" "){
			items.pop();
		}
		for(var i=0;i<items.length;i++){
			var item=items[i].split("^");
			obj.addd(item[0],item[1]);
		}
	}
	return obj;
}

function overcook(){
	var cook=new CookieHandler();
	cook.read();
	cook.add('wish',this.cook());
}