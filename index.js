
var request = require('request');
request.defaults({
  json: true
});

function grabURLs(data){
	urls = [];
	for(var d in data){
		
		if(data[d] && !data[d].is_ad) urls.push(data[d].link);
		
	}
	
	return urls;
}
function parseURL(url){

	splitURL = url.split('/');
	lastInd = splitURL.length-1;

	id = splitURL[lastInd];
	splitID = id.split('.');

	if(splitID.length > 1) {
		return splitID[0];
	} else{
		return id;
	}
};
function get(options,fn){
	request(options,function(err,res,body){
		
		if(err){
			fn(err);
		} else {
			fn(JSON.parse(body).data);
		}
	});

};
var Imgur = function(clientID){
	this.clientID = clientID;
	this.hostname = 'api.imgur.com';
	
	this.options = {
		headers: {
			'Authorization': 'Client-ID '+clientID,
			'Content-Type':'application/json',
			'Accept': 'application/json'
		}
	};
	console.log("Setting Client-ID to "+clientID);
	
};

// Returns array of urls to each image.
Imgur.prototype.album = function(url,fn){
	this.options.url = 'https://'+this.hostname+'/3/album/'+parseURL(url)+'/images';
	
	get(this.options,function(data){
		
		if(data) {
			
			urls = grabURLs(data);
			
			if(fn){
				
				fn(urls);
				
			} else {
				return urls;
			}
		} else {
			if(fn){
				fn(false);
			}else{
				return false;
			}
		}
	});
};

// Returns array of urls to each image.
Imgur.prototype.gallery = function(url,fn){
	this.options.url = 'https://'+this.hostname+'/3/gallery/album/'+parseURL(url);
	get(this.options,function(data){
		if(data) {
			urls = grabURLs(data);
			
			if(fn){
				
				fn(urls);
				
			} else {
				return urls;
			}
		} else {
			if(fn){
				fn(false);
			}else{
				return false;
			}
		}
	});
};

// Returns direct url to image
Imgur.prototype.image = function(url,fn){
	this.options.url = 'https://'+this.hostname+'/3/image/'+parseURL(url);
	get(this.options,function(data){
		if(data) {			
			if(fn){
				
				if(!data.is_ad) fn(data.link);
				
			} else {
				return data.link;
			}
		} else {
			if(fn){
				fn(false);
			}else{
				return false;
			}
		}
	});
};
var getImgur = function(id){
	return new Imgur(id);
};
module.exports = getImgur;
