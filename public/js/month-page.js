var dDate = new Date();
var cur_month = dDate.getMonth();
var day_of_month = dDate.getDate();
var cur_year = dDate.getFullYear();

var Prev_Element = {};
var wecolor, tbgcolor, ntbgcolor, sbgcolor;


function opted_day(el)
{ //обраний день
    if (el.id == "cal_cell")
    {
        if (!isNaN(parseInt(el.children["cal_text"].innerText)))
        {
            el.bgColor=sbgcolor;
            Prev_Element.bgColor=ntbgcolor;
            document.all.selected_date.value=parseInt(el.children["cal_text"].innerText);
            Prev_Element=el;
        }
    }
}

function DaysInMonth(iMonth, iYear)
{
    var prev_date=new Date(iYear, iMonth, 0);
    return prev_date.getDate();
}

function build_cal(iYear, iMonth)
{
    var the_month=[];
    the_month[0]=["Пн","Вт","Ср","Чт","Пт","Сб","Нд"];
    var dCalDate=new Date(iYear, iMonth-1, 1);
    var day_first=dCalDate.getDay();

    var iDaysInMonth = DaysInMonth(iMonth, iYear);
    for (var i = 1; i < 7; i++) {
        the_month[i] = new Array(7);
    }
    var iVarDate=1;
    var d, w;
    if (day_first == 0) {
        day_first = 6;
    }
    else {
        day_first = day_first - 1;
    }

    for (d=day_first; d < 7; d++) {
        the_month[1][d] = iVarDate;
        iVarDate++;
    }

    for (w=2; w < 7; w++) {
        for (d=0; d < 7; d++) {
            if (iVarDate <= iDaysInMonth)
            {
                the_month[w][d]=iVarDate;
                iVarDate++;
            }
            else if (the_month[5][6] === iDaysInMonth || the_month[5][6] === undefined)
            {
                var copyArr = new Array(6);
                for (var i = 0; i < 6; i++) {
                    copyArr[i] = new Array(7);
                }
                for (var i = 0; i < 6; i++) {
                    for (var j = 0; j < 7; j++) {
                        copyArr[i][j] = the_month[i][j];
                    }
                }
                return copyArr;
            }
        }
    }
    return the_month;
}

function draw_cal(iYear, iMonth, cell_width, cell_height, text_weight, iwecolor, intbgcolor, isbgcolor) {

    wecolor=iwecolor;
    ntbgcolor=intbgcolor;
    sbgcolor=isbgcolor;

    var my_month;
    my_month=build_cal(iYear, iMonth);
    document.write("<table id = 'calendarTable'>");
    document.write("<tr style='text-align:center' >");
    document.write("<th><b>" + my_month[0][0] + "</b></th>");
    document.write("<th><b>" + my_month[0][1] + "</b></th>");
    document.write("<th><b>" + my_month[0][2] + "</b></th>");
    document.write("<th><b>" + my_month[0][3] + "</b></th>");
    document.write("<th><b>" + my_month[0][4] + "</b></th>");
    document.write("<th><b>" + my_month[0][5] + "</b></th>");
    document.write("<th><b>" + my_month[0][6] + "</b></th>");
    document.write("</tr>");
    for (w = 1; w < my_month.length; w++)
    {
        document.write("<tr align='center' valign='center'>");
        for (d=0; d < 7; d++) {
            if (!isNaN(my_month[w][d]))
            {
                if (my_month[w][d] == day_of_month && iMonth == cur_month && iYear == cur_year) {
                    document.write("<td id=today_cell bgcolor='" + tbgcolor + "' width='" + cell_width + "' height='" + cell_height +
                        "' style='cursor:pointer; font-weight:" + text_weight
                        + "' onMouseOver='fToggle_color(this)' onMouseOut='fToggle_color(this)' onclick=opted_day(this)>");
                }
                else {
                    document.write("<td id=cal_cell bgcolor='" + ntbgcolor + "' width='" + cell_width +
                        "' height='" + cell_height + "' style='cursor:pointer;font-weight:" + text_weight +
                        "' onMouseOver='fToggle_color(this)' onMouseOut='fToggle_color(this)' onclick=opted_day(this)>");
                }
            }
            else
            {
                document.write("<td id=nonDay bgcolor='wight'" + "' width='" + cell_width + "' height='" + cell_height +
                    "; font-weight:" + text_weight
                    + "' onMouseOver='fToggle_color(this)' onMouseOut='fToggle_color(this)' onclick=opted_day(this)>");
            }
            if (!isNaN(my_month[w][d])) {
                document.write("<div id=cal_text onclick=opted_day(this)>" + my_month[w][d]);
            }
            else {
                document.write("<div id=cal_text onclick=opted_day(this)>&nbsp;");
            }
            document.write("</td>")
        }
        document.write("</tr>");
    }
    document.write("</table>")
}
