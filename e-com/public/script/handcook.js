/**
 * 
 */
function CookieHandler(){
	var domain="."+document.location.href.substr(7).split('/')[0];
	var date=new Date();
	date.setHours(date.getHours()+1);
	document.cookie=" expires="+date.toUTCString()+"; path=/ domain="+domain;
	this.key=new Array();
	this.val=new Array();
}

function writeCookie(cook){
	document.cookie = cook;
	console.log(cook);
	console.log(document.cookie);
}

CookieHandler.prototype.add = function(identifier, value){
	if(this.key.lastIndexOf(identifier)==-1){
		this.key.push(identifier);
		this.val.push(value);
		this.write();
	}else{
		this.set(identifier, value);
	}
}

CookieHandler.prototype.set = function(identifier, value){
	var ind=this.key.lastIndexOf(identifier);
	if(ind!=-1){
		this.val[ind]=value;
		this.write();
	}
}

CookieHandler.prototype.write = function(){
	var isi="";
	var date=new Date();
	date.setHours(date.getHours()+1);
	for(var i=0;i<this.key.length;i++){
		isi=isi+this.key[i]+"="+this.val[i]+";";
	}
	var domain=document.location.href.substr(7).split('/')[0];
	writeCookie(isi+" expires:"+date.toUTCString()+"; path:/; domain:"+domain);
}

CookieHandler.prototype.read = function(){
	if(document.cookie!==""){
		var cook= document.cookie.split('; ');
		this.clear;
		for(var i=0;i<cook.length;i++){
			var item= cook[i].split("=");
			this.key.push(item[0]);
			this.val.push(item[1]);
		}
	}
}

CookieHandler.prototype.remove = function(identifier){
	var index=this.key.lastIndexOf(identifier);
	if(index>=0){
		for(var i=index;i<this.key.length-1;i++){
			this.key[i]=this.key[i+1];
			this.val[i]=this.val[i+1];
		}
		this.key.pop();
		this.val.pop();
		this.write();
	}
}

CookieHandler.prototype.clear = function(){
	while(this.key.length>0){
		this.val.pop();
		this.key.pop();
	}
}

CookieHandler.prototype.delet = function(){
	var domain="."+document.location.href.substr(7).split('/')[0];
	document.cookie="expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain="+domain;
}

CookieHandler.prototype.getItem = function(identifier){
	var index=this.key.lastIndexOf(identifier);
	if(index>=0){
		return this.val[index];
	}
	return null;
}