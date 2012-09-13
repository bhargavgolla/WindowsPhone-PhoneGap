/*function populate_favs(){
	var storage = window.localStorage;
	var count=storage.getItem("count");
	if(count===null)
	{
		storage.setItem("count","0");
	}
	else if(count===0)
	{
		$('#favDocs').html('None');
	}
	else
	{
		for(i=0;i<count;i++)
		{
			var favrfcID=storage.getItem(i);
			$('#favDocs').append('<a href="#" />').text('RFC'+favrfcID).addClass('favs').css('display','block');
		}
	}
}
function add_to_fav(rfcID){
	var storage = window.localStorage;
	var count=storage.getItem("count");
	storage.setItem(count,rfcID);
	storage.setItem("count",count+1);
	$('#favDocs').append('<a href="#" />').text('RFC'+rfcID).addClass('favs').css('display','block');
}*/
function urlformatter(rfcID)
{
	return "http://docs.google.com/viewer?url=http://tools.ietf.org/pdf/rfc"+rfcID+".pdf&embedded=true";
}
function open_doc(rfcID){
	console.log(rfcID);
	var url=urlformatter(rfcID);
	console.log(url);
	window.plugins.childBrowser.showWebPage(url);
}
function update_history(rfcID)
{
	$('#favDocs').append('<a href="#" class="favs" onclick="open_doc(\''+rfcID+'\')">RFC'+rfcID+'</a><br />');
}
/*function onBackKeyDown() {
    alert("Close the window using the close button at the bottom of app");
    //window.plugins.childBrowser.close();
}*/
$(document).ready(function () {
    //document.addEventListener("backbutton", onBackKeyDown, false);
	$("div.metro-pivot").metroPivot();
	$("#scroller").scroller({ preset: 'time',
        theme: 'default',
        mode: 'clickpick',
        timeFormat: 'iiss',
        timeWheels: 'iiss',
        width: 100 });
	//populate_favs();
    ChildBrowser.install();
    $('#submit').click(function () {
        var rfcID=$('#scroller').val();
		if(rfcID.length===0)
		{
			alert("Pick a Document ID!!!");
		}
		else
		{
			open_doc(rfcID);
			update_history(rfcID);
		}
    });
	/*$('#addtofav').click(function () {
        var rfcID=$('#scroller').val();
		add_to_fav(rfcID);
    });
	$('a.favs').click(function(){
		var rfcID=$(this).text().substr(3,4);
		open_doc(rfcID);
	});*/
});

/*$(document).backbutton(function () {
    alert("Close the window using the close button at the bottom of app");
    //window.plugins.childBrowser.close();
});*/