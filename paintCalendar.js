var object = null;
var colorname = null;
var engine = null;

function bodyOnLoad() {
    returnIEVersion();
    var HTMLContent = document.getElementById("HTMLContent").innerText; //达梦返回的考勤数据
    var Ornament = document.getElementById("Ornament").innerText; //工作日和异常文档详情
    var DaysContent = HTMLContent.split(";"); //每一天的打卡数据
    var dateStr = DaysContent[0].split(",")[0];
    var dateArr = dateStr.split("-");
    var Ornaments = Ornament.split(";");
    var tdContent = "";
    var AtagContent = '<a class="icon" href="#"><img onclick="spreadMenu(this)" src="menuicon.png" /></a>';
    var Html_kqResult = "<table class='month' border='1'><caption align='center'>" + dateArr[0] + "年" + dateArr[1] + "月考勤信息</caption>";
    Html_kqResult = Html_kqResult + "<tr><th>星期日</th><th>星期一</th><th>星期二</th><th>星期三</th><th>星期四</th><th>星期五</th><th>星期六</th></tr><tr>";
    for (a = 1; a < DaysContent[0].split(",")[1]; a++) {
        Html_kqResult = Html_kqResult + "<td class='previous'></td>";

    }
    for (i = 0; i < DaysContent.length; i++) {
        var DayContent = DaysContent[i].split(",");
        var datevalue = DayContent[0]; //考勤日期
        var weekday = DayContent[1]; //周几
        var checkinTime = DayContent[2]; //上午打卡时间
        var AM_Status = DayContent[3]; //上午考勤状态
        var AM_ReviseType = DayContent[4]; //上午修订状态
        var checkoutTime = DayContent[5]; //下午打卡时间
        var PM_Status = DayContent[6]; //下午考勤状态
        var PM_ReviseType = DayContent[7]; //下午修订状态
        var remark = DayContent[8]; //备注说明     
        var liContent_AM = "<li><span>" + checkinTime + "</span>&nbsp<span>" + AM_Status + "</span>&nbsp<span>" + AM_ReviseType + "</span></li>";
        var liContent_PM = "<li><span>" + checkoutTime + "</span>&nbsp<span>" + PM_Status + "</span>&nbsp<span>" + PM_ReviseType + "</span></li>";
        var isWorkday = Ornaments[i].split(",")[0];
        var reviseDoc1 = Ornaments[i].split(",")[1];
        var reviseDoc2 = Ornaments[i].split(",")[2];
        var reviseDoc3 = Ornaments[i].split(",")[3];
        if (isWorkday == "工作日") {
            if (AM_ReviseType != "") {
                if (reviseDoc1 != "")
                    liContent_AM = "<li><span>" + checkinTime + "</span>&nbsp<a href=" + reviseDoc1 + " target=_blank><span>" + AM_ReviseType + "</span></a></li>";
                else
                    liContent_AM = "<li><span>" + checkinTime + "</span>&nbsp<span>" + AM_ReviseType + "</span></li>";
            }
            if ((AM_ReviseType == "" || AM_ReviseType == "旷工") && AM_Status == "缺勤") {
                liContent_AM = "<li class='important'><span>" + checkinTime + "</span>&nbsp<span>" + AM_Status + "</span></li>";
            }
            if (PM_ReviseType != "") {
                if (reviseDoc2 != "")
                    liContent_PM = "<li><span>" + checkoutTime + "</span>&nbsp<a href=" + reviseDoc2 + " target=_blank><span>" + PM_ReviseType + "</span></a></li>";
                else
                    liContent_PM = "<li><span>" + checkoutTime + "</span>&nbsp<span>" + PM_ReviseType + "</span></li>";
            }
            if ((PM_ReviseType == "" || PM_ReviseType == "旷工") && PM_Status == "缺勤") {
                liContent_PM = "<li class='important'><span>" + checkoutTime + "</span>&nbsp<span>" + PM_Status + "</span></li>"
            }
            tdContent = "<td class='active'><font size='5px'>" + datevalue.split("-")[2] + "</font>" + AtagContent + "<ul>" + liContent_AM + liContent_PM + "</ul></td>";
        } else if (isWorkday == "") {
            tdContent = "<td class='absent'><font size='5px'>" + datevalue.split("-")[2] + "</font>" + AtagContent + "<ul>" + liContent_AM + liContent_PM + "</ul></td>";
        } else {
            tdContent = "<td class='holiday'><font size='5px'>" + datevalue.split("-")[2] + "</font>" + AtagContent + "<ul>" + liContent_AM + liContent_PM + "</ul></td>";
        }


        if (weekday == "1")
            Html_kqResult = Html_kqResult + "<tr>" + tdContent;
        else if (weekday == "7")
            Html_kqResult = Html_kqResult + tdContent + "</tr>";
        else
            Html_kqResult = Html_kqResult + tdContent;
        if (i == (DaysContent.length - 1)) {
            for (b = 0; b < (7 - weekday); b++) {
                Html_kqResult += "<td class='next'></td>";
            }
            Html_kqResult += "</tr></table>"
        }
    }

    document.getElementById("Calendar").innerHTML = Html_kqResult;


}

function spreadMenu(obj) {
    var ie_v = engine;
    object = obj;
    var tdobj = obj.parentNode.parentNode;
    var color = tdobj.style.backgroundColor;
    colorname = color;
    tdobj.style.backgroundColor = "#1E90FF";
    if (ie_v > 8 || ie_v == null) {
        createMenu(obj);
    } else {
        obj.src = "+icon2.png";
        createMenu(obj);

    }
}

function createMenu() {
    var port = window.parent.location.port;
    if (port == "80")
        var host = "http://" + window.parent.location.hostname;
    else
        var host = "http://" + window.parent.location.hostname + ":" + port;

    var urls = new Array();
    var typeNames = new Array("请假", "公出", "出差", "异常/哺乳假", "加班");
    var QJurl = host + "/path/docname.html";
    var GCurl = host + "/path/docname.html";
    var CCurl = host + "/path/docname.html";
    var YCurl = host + "/path/docname.html";
    var JBurl = host + "/path/docname.html";
    urls.push(QJurl, GCurl, CCurl, YCurl, JBurl);
    var tag_a_content = "";
    for (i = 0; i < urls.length; i++) {
        if (tag_a_content == "") {
            tag_a_content = "<a class='acontent' href='" + urls[i] + "' target=_blank onclick='closeDialog()'><span>" + (i + 1) + "&nbsp&nbsp&nbsp&nbsp</span>" + typeNames[i] + "申请</a></br>";
        } else {
            tag_a_content = tag_a_content + "<a class='acontent' href='" + urls[i] + "' target=_blank onclick='closeDialog()'><span>" + (i + 1) + "&nbsp&nbsp&nbsp&nbsp</span>" + typeNames[i] + "申请</a></br>";
        }
    }
    var buttonContent = "<input id='close' type='button' onclick='closeDialog()' value='关闭' />"
    var obj_div = document.getElementById("typeSelect");
    obj_div.innerHTML = "<div class='title'>考勤修订类别</div></br></br><div class='divcontent'>" + tag_a_content + "</br></div><div style='text-align:center'>" + buttonContent + "</div>";
    obj_div.style.display = "block";
    document.getElementById("div_bg").style.display = "block";

}

function closeDialog() {
    document.getElementById("typeSelect").style.display = "none";
    document.getElementById("div_bg").style.display = "none";
    object.parentNode.parentNode.style.backgroundColor = colorname;
}

function returnIEVersion() {

    if (window.navigator.appName == "Microsoft Internet Explorer") {
        // This is an IE browser. What mode is the engine in?
        if (document.documentMode) // IE8 or later
            engine = document.documentMode;
        else // IE 5-7
        {
            engine = 5; // Assume quirks mode unless proven otherwise
            if (document.compatMode) {
                if (document.compatMode == "CSS1Compat")
                    engine = 7; // standards mode
            }
            // There is no test for IE6 standards mode because that mode  
            // was replaced by IE7 standards mode; there is no emulation.
        }
        // the engine variable now contains the document compatibility mode.
    }


}