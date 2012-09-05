var mini_token="";
var token='';
var api_key="d228130f186f94d6373be28ed078b282";
var secret="f92f3d325b890f22";
var oath_token='';
var oauth_token_secret='';
var page=0;
var count=0;
var photoIDs=new Array();
var picURIs=new Array();
var titles=new Array();
function create_tile(picURI,comments){
		console.log('Create secondary tile');

        var success = function (res) {
            console.log('secondary tile was created');
            //$('#flickr').append(res);
        };

        var fail = function (e) {
            console.log("Error occurred: " + e);
            $('#flickr').append("Error occurred: " + e);
        };
        navigator.plugins.liveTiles.updateAppTile(success, fail, { title: 'Flickr-On-Tiles', image: picURI, backTitle: 'What is this?', backContent:comments});
}
function get_photo_comments(photoID){
	var comments="";
	var foo = new Date; // Generic JS date object
    var unixtime_ms = foo.getTime(); // Returns milliseconds since the epoch
    var unixtime = parseInt(unixtime_ms / 1000);
	var method='flickr.photos.comments.getList';
	var oauth_nonce=$.md5(unixtime.toString()+Math.floor((Math.random()*40)+1).toString());
	console.log(oauth_nonce);
	var baseSign = "GET" + "&" + encodeURIComponent("http://api.flickr.com/services/rest").toString() + "&"+encodeURIComponent("content_type") + "%3D" + encodeURIComponent('1')
     + "%26"+ encodeURIComponent("format") + "%3D" + encodeURIComponent('json')
     + "%26"
	 + encodeURIComponent("method") + "%3D" + encodeURIComponent(method)
	 + "%26"+ encodeURIComponent("nojsoncallback") + "%3D" + encodeURIComponent('1')
	 + "%26"+ encodeURIComponent("oauth_consumer_key") + "%3D" + encodeURIComponent(api_key)
     + "%26"
     + encodeURIComponent("oauth_nonce") + "%3D" + encodeURIComponent(oauth_nonce)
     + "%26"
     + encodeURIComponent("oauth_signature_method") + "%3D" + encodeURIComponent("HMAC-SHA1")
     + "%26"
     + encodeURIComponent("oauth_timestamp") + "%3D" + encodeURIComponent(unixtime)
	 + "%26"
     + encodeURIComponent("oauth_token") + "%3D" + encodeURIComponent(oauth_token)
     + "%26"
     + encodeURIComponent("oauth_version") + "%3D" + encodeURIComponent("1.0")+ "%26"
     + encodeURIComponent("photo_id") + "%3D" + encodeURIComponent(photoID);
	console.log(baseSign);
	var secret_key=secret+'&'+oauth_token_secret;
	console.log(secret_key);
	var oauth_signature = encodeURIComponent(b64_hmac_sha1(secret_key, baseSign)+'=');
	console.log(oauth_signature);
	var url='http://api.flickr.com/services/rest?nojsoncallback=1&oauth_nonce='+oauth_nonce+'&format=json&oauth_consumer_key='+api_key+'&oauth_timestamp='+unixtime+'&oauth_signature_method=HMAC-SHA1&oauth_version=1.0&oauth_token='+oauth_token+'&photo_id='+photoID+'&oauth_signature='+oauth_signature+'&method='+method;
	console.log(url);
	$.ajax({
		url:url,
		success: function(data) {
					console.log(data);
					if(data.comments.comment===undefined)
					{
						comments="No comments";
					}
					else
					{
						data.comments.comment.forEach(function(item){
							if(item.id===undefined)
							{
								comments='No comments';
							}
							else
							{
								comments+=item.authorname+": "+item._content+"\r\n";
								console.log(comments);
							}
						});
					}
				},
		error: function( error ){

				    	// Log any error.
						alert("ERROR1:"+error.responseText);
				    	console.log( "ERROR:"+error.responseText,error);

				},
		async:false
	});
	console.log(comments);
	return comments;
}
function get_userphotos(oauth_token,oauth_token_secret)
{
	page=page+1;
	var foo = new Date; // Generic JS date object
    var unixtime_ms = foo.getTime(); // Returns milliseconds since the epoch
    var unixtime = parseInt(unixtime_ms / 1000);
	var method='flickr.people.getPhotos';
	var oauth_nonce=$.md5(unixtime.toString()+Math.floor((Math.random()*40)+1).toString());
	console.log(oauth_nonce);
	var baseSign = "GET" + "&" + encodeURIComponent("http://api.flickr.com/services/rest").toString() + "&"+encodeURIComponent("content_type") + "%3D" + encodeURIComponent('1')
     + "%26"+ encodeURIComponent("format") + "%3D" + encodeURIComponent('json')
     + "%26"
	 + encodeURIComponent("method") + "%3D" + encodeURIComponent(method)
	 + "%26"+ encodeURIComponent("nojsoncallback") + "%3D" + encodeURIComponent('1')
	 + "%26"+ encodeURIComponent("oauth_consumer_key") + "%3D" + encodeURIComponent(api_key)
     + "%26"
     + encodeURIComponent("oauth_nonce") + "%3D" + encodeURIComponent(oauth_nonce)
     + "%26"
     + encodeURIComponent("oauth_signature_method") + "%3D" + encodeURIComponent("HMAC-SHA1")
     + "%26"
     + encodeURIComponent("oauth_timestamp") + "%3D" + encodeURIComponent(unixtime)
	 + "%26"
     + encodeURIComponent("oauth_token") + "%3D" + encodeURIComponent(oauth_token)
     + "%26"
     + encodeURIComponent("oauth_version") + "%3D" + encodeURIComponent("1.0")+ "%26"
     + encodeURIComponent("page") + "%3D" + encodeURIComponent(page)+ "%26"
     + encodeURIComponent("per_page") + "%3D" + encodeURIComponent('8')+ "%26"
     + encodeURIComponent("user_id") + "%3D" + encodeURIComponent('me');
	console.log(baseSign);
	var secret_key=secret+'&'+oauth_token_secret;
	console.log(secret_key);
	var oauth_signature = encodeURIComponent(b64_hmac_sha1(secret_key, baseSign)+'=');
	console.log(oauth_signature);
	var url='http://api.flickr.com/services/rest?nojsoncallback=1&oauth_nonce='+oauth_nonce+'&format=json&oauth_consumer_key='+api_key+'&oauth_timestamp='+unixtime+'&oauth_signature_method=HMAC-SHA1&oauth_version=1.0&oauth_token='+oauth_token+'&user_id=me'+'&content_type=1'+'&per_page=8'+'&page='+page+'&oauth_signature='+oauth_signature+'&method='+method;
	console.log(url);
	$.ajax({
		url:url,
		success: function(data) {
					$('#flickrMore').remove();
					console.log(data);
					photos_page_max = data.photos.pages;
					console.log(photos_page_max);
					if(photos_page_max===0)
					{
						$('#flickr').append("Sorry, You don't seem to have any photos on your Flickr account. Go upload a few and try this app.");
						return;
					}
					else
					{
						data.photos.photo.forEach(function(item){
							//comments=get_photo_comments(item.id);
							count++;
							photoIDs[count]=item.id;
							console.log(photoIDs[count]);
							//picURIs[count]="http://farm"+item.farm+".staticflickr.com/"+item.server+'/'+item.id+'_'+item.secret+"_t.jpg";
							picURIs[count]="http://farm"+item.farm+".staticflickr.com/"+item.server+'/'+item.id+'_'+item.secret+"_q.jpg";
							console.log(picURIs[count]);
							if(item.title===undefined)
							{
								titles[count]="No Caption";
								console.log(photoIDs[count]+picURIs[count]+titles[count]);
								$('#flickr').append('<div id="tile'+count+'" class="live-tile red" data-stack="true" data-stops="50%,100%,0" data-delay="7500" onclick="window.plugins.childBrowser.showWebPage(http://www.flickr.com/photos/'+item.owner+'/'+item.id+')" />');
								//$('#flickr1').append('<div class="cell"><a href='+"#"+'><img class="image" src="http://farm'+item.farm+'.staticflickr.com/'+item.server+'/'+item.id+'_'+item.secret+'_t.jpg" /></a><br />No Caption<br /></div>');
							}
							else
							{
								titles[count]=item.title;
								console.log(photoIDs[count]+picURIs[count]+titles[count]);
								$('#flickr').append('<div id="tile'+count+'" class="live-tile red" data-stack="true" data-stops="50%,100%,0" data-delay="7500" onclick="window.plugins.childBrowser.showWebPage(http://www.flickr.com/photos/'+item.owner+'/'+item.id+')" />');
								//$('#flickr1').append('<div class="cell"><a href='+"#"+'><img class="image" src="http://farm'+item.farm+'.staticflickr.com/'+item.server+'/'+item.id+'_'+item.secret+'_t.jpg" /></a><br />'+item.title.substr(0,20)+"..."+'<br /></div>');
							}
						});
					}
					for(i=1;i<=count;i++)
					{
						$('#tile'+i).append('<span class="tile-title">'+titles[i]+'</span>');
						$('#tile'+i).append('<div class="myClass"><img src="'+picURIs[i]+'" width="180px" height="180px" /></div>');
						var comments=get_photo_comments(photoIDs[i]);
						console.log(comments);
						/*tile.stdTile(titles[i],picURIs[i]);
						tile.bckTile("Comments","",comments);*/
						$('#tile'+i).append('<div>'+comments+'<br /><br /><br /><p>Comments</p></div>');
					}
					console.log(page);
					console.log(photos_page_max);
					$(".live-tile").liveTile();
					if(photos_page_max!=page)
					{
						create_tile(picURIs[count],"Flickr-on-Tiles. An app for photofreaks");
						$('#flickr').append($('<a data-role="button" data-inline="true" data-theme="a" data-icon="arrow-d" data-iconpos="right" id="flickrMore" class="more" onclick="get_userphotos(oauth_token,oauth_token_secret)" />').text('Click here for more pics'));
					}
					else
					{
						create_tile(picURIs[count],"Flickr-on-Tiles. An app for photofreaks");
					}
				},
		error: function( error ){

				    	// Log any error.
						alert("ERROR2:"+error.responseText);
				    	console.log( "ERROR:"+error.responseText,error);

				},
		async:false
	});
}
function oauth_get(auth_token)
{
	method = 'flickr.auth.oauth.getAccessToken';
	sig_string=secret+'api_key'+api_key+'auth_token'+auth_token+'method'+method;
	console.log(sig_string);
	api_sig=$.md5(sig_string);
	url='http://api.flickr.com/services/rest/'+'?method='+method+'&api_key='+api_key+'&auth_token='+auth_token+'&api_sig='+api_sig;
	console.log(url); 
	$.ajax({
		url:url,
		success: function(data) {
					console.log(data);
					oauth_token = $(data).find("access_token").attr('oauth_token');
					oauth_token_secret = $(data).find("access_token").attr('oauth_token_secret');
					console.log(oauth_token);
					console.log(oauth_token_secret);
				},
		error: function( error ){

				    	// Log any error.
						alert("ERROR3:"+error.responseText);
				    	console.log( "ERROR:"+error.responseText,error);

				},
		async:false
	});
	console.log(oauth_token);
	console.log(oauth_token_secret);
	get_userphotos(oauth_token,oauth_token_secret);
}
function mini_token_get()
{
	if(mini_token.length===9)
	{
		var method = 'flickr.auth.getFullToken';
		var sig_string=secret+'api_key'+api_key+'method'+method+'mini_token';
		sig_string+=mini_token;
		console.log(sig_string);
		var api_sig=$.md5(sig_string);
		var url='http://api.flickr.com/services/rest/'+'?method='+method+'&api_key='+api_key+'&mini_token='+mini_token+'&api_sig='+api_sig;//+'&format=json&nojsoncallback=1';
		var full_token='';
		console.log(url); 
		$.ajax({
			url:url,
			success: function(data) {
						console.log(data);
						full_token = $(data).find("token").text();
						console.log(full_token);
					},
			error: function( error ){

				    	// Log any error.
						alert("ERROR4:"+error.responseText);
				    	console.log( "ERROR:"+error.responseText,error);

				},
			async:   false
		});
		console.log(full_token);
		oauth_get(full_token);
	}
	else
	{
		alert("Enter correct Mini-Token");
		$('#codesubmit').css('display','block');
	}
}

$(document).ready(function() {
	$.support.cors = true;
	$("#flickr").empty();
	ChildBrowser.install();
    $('#login').click(function () {
        var login_url = "http://www.flickr.com/auth-72157631308512876";
        console.log(login_url);
		$('#login').css('display','none');
		$('#codesubmit').css('display','block');
        window.plugins.childBrowser.showWebPage(login_url);
    });
	$('#codebutton').click(function(){
		mini_token=$('#codeCont').val().replace(/-/g,"");
		console.log(mini_token);
		$('#codesubmit').css('display','none');
		mini_token_get();
	});
});