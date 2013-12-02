<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Online chat</title>
<style>
body
{
    color: #333;
    background: #333;
    font-family: "Helvetica", Arial;
    font-size: 14px;
    text-align: center;
}
.container
{
    background: #ccc;
    border-radius: 1em;
    box-shadow: 0px 5px 5px rgba(0,0,0,0.5);
    text-shadow: 5px 5px 5px rgba(0,0,0,0.5);
    margin: 1em auto;
    padding: 1em;
    width: 90%;
}
 
input
{
    display: block;
    font-size: 12px;
    margin: 1em auto;
    padding: 0.5em;
    width: 95%;
}
 
span
{
    display: block;
    font-size: 12px;
    margin: 1em auto;
    padding: 0.5em;
    width: 95%;
    text-align: left;
}
</style>
<script src="http://chat:8888/socket.io/socket.io.js"></script>
<script type="text/javascript">
<!--
// aquí ponemos la IP PÚBLICA
var websocket = io.connect("http://chat:8888");
 
window.onload = function()
{
    websocket.on("sendEvent", function(data)
    {
        var chat = document.getElementById('zchat');
        var span = document.createElement('span');
        var txt = document.createTextNode(data);
        span.appendChild(txt);
        if(chat.hasChildNodes())
            chat.insertBefore(span, chat.firstChild);
        else
            chat.appendChild(span);
    });
 
    var form = document.getElementById('zform');
    var message = document.getElementById('zmessage');
    form.onsubmit = function(e)
    {
        websocket.emit("newMessage", message.value);
        message.value = '';
        return false;
    };
 
    message.value = '';
    message.focus();
};
//-->
</script>
</head>
<body>
<div class="container">
<form id="zform">
    <label>Message: </label>
    <input type="text" name="zmessage" id="zmessage" placeholder="Please insert message" required />
    <input type="submit" />
</form>
</div>
<div id="zchat" class="container">
</div>
</body>
</html>