$(document).ready(()=>{

    $("#socketusername").show();
    $("#myhomepage").hide();

    const socket = io.connect();

    $("#usernamesubmit").click(()=>{
        console.log("entered click event of socket");
        var username = $("#username").val();
        socket.emit("usernamesent",username,(useralreadypresent)=>{
            if(useralreadypresent==true){
                $("#invalidusername").html("<b>This username is already taken, Please try another!!</b>")
            }
            else{
                $("#socketusername").hide();
                $("#myhomepage").show();
                i=1;
                $(".usernameajax").attr("id",username);
            }
        });
    });

   $("#mymessage").keydown((e)=>{
        if(e.keyCode==13){
            $("#messageform").submit();
            return false;
        }
   })

   $("#messageform").submit((event)=>{
        event.preventDefault();
        var mymessage = $("#mymessage").val();
        $("#mymessage").val("");
        if(mymessage!=""){
        socket.emit("mynewmessage",mymessage);
        }
    });

    socket.on("sendmessage",(objectfromserver)=>{
        var chatusername =$(".usernameajax").attr("id");
        console.log("The Username from html is "+chatusername)
        console.log("The username from server is "+objectfromserver.user)
        if(objectfromserver.user==chatusername){
            $("#"+chatusername).append("<table><tr><td style='width:50%;'></td><td style='width: 50%; background-color:violet; border-radius: 15px; padding:15px; align: right'><b>You: </b>"+objectfromserver.msg+"</td></tr></table></br>");
        }else{
            $("#"+chatusername).append("<table><tr><td style='width: 50%; background-color:violet; border-radius: 15px; padding:15px; align: left'><b>"+objectfromserver.user+": </b>"+objectfromserver.msg+"</td style='width:50%;'><td></td></tr></table></br>");
        }
        scrollCorrect()
    })

    function scrollCorrect(){
        var chatusername =$(".usernameajax").attr("id");
        $(".usernameajax").scrollTop($("#"+chatusername).outerHeight());
    }





});