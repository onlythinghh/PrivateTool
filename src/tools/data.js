var now = new Date(); //当前日期
var nowDayOfWeek = now.getDay(); //今天本周的第几天
var nowDay = now.getDate(); //当前日
var nowMonth = now.getMonth(); //当前月
var nowMonths=Number(nowMonth)+Number(1)
var nowYear = now.getYear(); //当前年
nowYear += (nowYear < 2000) ? 1900 : 0; //
var unixtime=new Date().getTime(); //当前时间戳
var lastMonthDate = new Date(); //上月日期
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
var lastYear = lastMonthDate.getYear();
var lastMonth = lastMonthDate.getMonth();

//格式化日期：yyyy-MM-dd
function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();

    if (mymonth < 10) {
        mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
        myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday);
}
//获得某月的天数
function getMonthDays(myMonth) {
    var monthStartDate = new Date(nowYear, myMonth, 1);
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
}
// 获取当天 日期
export function getDateTime() {
    var dateTime = new Date(parseInt(unixtime));
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    if (month > 0 && month < 10) {
      month = "0" + month;
    }
    var day = dateTime.getDate();
    if (day > 0 && day < 10) {
      day = "0" + day;
    }
    var hour = dateTime.getHours();
    var minute = dateTime.getMinutes();
    var second = dateTime.getSeconds();
    var now = new Date();
    var now_new = Date.parse(now.toDateString()); //typescript转换写法
    var milliseconds = now_new - dateTime;
    var timeSpanStr = year + "-" + month + "-" + day;
    return timeSpanStr;
  }
//获得本周的开始日期
export function getWeekStartDate() {
    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
    return formatDate(weekStartDate);
}

//获得本周的结束日期
export function getWeekEndDate() {
    var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
    return formatDate(weekEndDate);
}

//获得本月的开始日期
export function getMonthStartDate() {
    var monthStartDate = new Date(nowYear, nowMonth, 1);
    return formatDate(monthStartDate);
}

//获得本月的结束日期
export function getMonthEndDate() {
    var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
    return formatDate(monthEndDate);
}

//获取三十天前日期
var lw = new Date(now - 1000 * 60 * 60 * 24 * 30);//最后一个数字30可改，30天的意思
var lastY = lw.getFullYear();
var lastM = lw.getMonth()+1;
var lastD = lw.getDate();
var startdate=lastY+"-"+(lastM<10 ? "0" + lastM : lastM)+"-"+(lastD<10 ? "0"+ lastD : lastD);//三十天之前日期

export function dayThree(){
    return startdate
}

//获取半年前日期
var lws = new Date(now - 1000 * 60 * 60 * 24 * 180);//最后一个数字30可改，30天的意思
var lastYs = lws.getFullYear();
var lastMs = lws.getMonth()+1;
var lastDs = lws.getDate();
var startdates=lastYs+"-"+(lastMs<10 ? "0" + lastMs : lastMs)+"-"+(lastDs<10 ? "0"+ lastDs : lastDs);//三十天之前日期

export function monthSix(){
    return startdates
}

//获取一年前日期
var lwT = new Date(now - 1000 * 60 * 60 * 24 * 365);//最后一个数字30可改，30天的意思
var lastYT = lwT.getFullYear();
var lastMT = lwT.getMonth()+1;
var lastDT = lwT.getDate();
var startdateT=lastYT+"-"+(lastMT<10 ? "0" + lastMT : lastMT)+"-"+(lastDT<10 ? "0"+ lastDT : lastDT);//三十天之前日期

export function YearOne(){
    return startdateT
}
