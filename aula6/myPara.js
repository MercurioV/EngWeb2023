$(function() {

    var paraCount = 0

    $.get('http://localhost:3000/paras',function(data){
        data.forEach(element => {
            $("#paraList").append("<li><b>"+element.dataTime+"</b>:"+element.p+"</li>")
        });
        paraCount = data.length
    })

    $("#addPara").click(function(){
        var d = new Date()
        var timestamp = d.toISOString().substring(0,16)
        $("#paraList").append("<li><b>"+timestamp+"</b>:"+$("#paraText").val()+"</li>")
        paraCount++
        var newPara = {
            id:"p"+paraCount,
            dataTime:timestamp,
            p:$("#paraText").val()
        }
        $.post('http://localhost:3000/paras',newPara,function(res){
            alert("Record inserted: "+JSON.stringify(res))
        }).fail(function(err){
            alert("ERROR: "+JSON.stringify(err))
        })
    })
})