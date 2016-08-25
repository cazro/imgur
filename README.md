# imgur
My attempt at creating a node module for accessing the Imgur API to get info, not upload.


## Installing

npm install git+https://github.com/cazro/imgur.git

## Using
```
var imgur = require('imgur')(clientID);
```

Where clientID = the clientID you get from Imgur when registering your app.


```
// imgur.album returns an array of direct links to pictures/gifs
imgur.album(url,function(links){
   
});

//imgur.gallery returns an array of direct links to pictures/gifs
imgur.gallery(url,function(links){

});

//imgur.image returns a string with the direct link to the picture/gif
imgur.image(url,function(link){

});
```
