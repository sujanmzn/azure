
var hostname = window.location.host;
var protocol = window.location.protocol;

var path = protocol + "//" + hostname;


var JsonScheduleInfo = '[{}]';
var JsonContainerInfo = '[{}]';



function AddBookingContainer(uid, username, countryNme, countryzone, rate_value, arriavalDate) {



var jsData = '{"uid":"'+ uid +'","username":"' + username + '","countryname":"'+ countryNme +'","countryzone":"'+ countryzone +'","containerID":"'+ rate_value +'","requestDate":"'+ arriavalDate +'"}';


    $.ajax({
        url: '' + path + '/WebService/CMS.asmx/Add_Available_BookingContainer',
        data: jsData,
        method: 'post',
        dataType: 'xml',
        success: function (response) {
            var rtData = response;
            var fnData = rtData.getElementsByTagName("string")[0].childNodes[0].nodeValue;
                   
            if (fnData == "1") {

                alert("Booking Sucessfully!!!");

                window.location.href = path + '/pages/Booking_Status/';
            }

        },
        error: function (error) {
            alert(JSON.stringify(error));
        }
    });

}


function getAllInformationBookingContainer() {

    var uid = sessionStorage.getItem("session_UsrId");

    var username = sessionStorage.getItem("session_UsrNme");

    var e = document.getElementById("ChooseCountryId"); // Drop Down of Country Name
    var countryNme = e.options[e.selectedIndex].text;
   // var countryId = e.options[e.selectedIndex].value;


    var ee = document.getElementById("ChoosedZoneId"); // Drop Down of Country Zone
    var countryzone = ee.options[ee.selectedIndex].text;



    var rates = document.getElementsByName('countrycontainer'); // Avaiables container
    var rate_value;
    for (var i = 0; i < rates.length; i++) {
        if (rates[i].checked) {
            rate_value = rates[i].value;
        }
    } 


    var arriavalDate = document.getElementById("arrivalDateID").value;


    AddBookingContainer(uid, username, countryNme, countryzone,rate_value, arriavalDate);
    
   
}

function ViewAvaiableContainer() {

    var disdata = "";

    disdata += '<div class="col-12">';
    disdata += '<div class="card">';

    disdata += '<div class="card-body">';

    disdata += '<h5 class="card-title">Available Container For Your Country and Zone :</h5>';
    disdata += '<div class="card-body">';
    disdata += '<h4 class="card-title" style="font-weight:500;">';

    for (var ax = 0; ax < JsonContainerInfo.length; ax++){

        disdata += '<input type="radio" name="countrycontainer" value=' + JsonContainerInfo[ax].container_name + ' /> ' + JsonContainerInfo[ax].container_name + ' <br /><br />';

    }

    disdata += '</h4>';

    disdata += '</div>';

                                              

    disdata += '<h5 class="card-title" style="margin:30px 0px 30px 0px;">Choose container as per required date :</h5>';

    disdata += '<input type="date" class="textareaCss" id="arrivalDateID" name="arrivalDate" />';

                                             


    disdata += '<div class="cover_divtextfield">';
    disdata += '<button onclick="getAllInformationBookingContainer()" class="button">Book</button>';
    disdata += '</div>';


                                          
    disdata += '</div>';
    disdata += '</div>';

    disdata += '</div>';

    document.getElementById("AvaBookingContinerId").innerHTML = disdata;
}


function getDistinctValue(jsondata,jsondataNme) {

    var jsonObj = jsondata;

  
    var a = "";
    var b = "";
    var c = "";
    var ii = jsonObj.length;

    for (var tc = 0; tc < ii; tc++) {



        a = jsonObj[tc][jsondataNme];



        var bb = b.split("+");
        var y = b.split("+").length;

        for (var i = 0; i < b.split("+").length; i++) {

            if (a != bb[i]) {

                y = y - 1;

            }
        }

        if (y == 0) {

            b += a + "+";
            c += a + "+";

        }

    }

    // alert(c);
    return c;

}


function getCountryName() {

   var JsonSchdInfo = JsonScheduleInfo;

    var rtnvalue = getDistinctValue(JsonSchdInfo,'s_country_name');

    return rtnvalue;
}

function getcountryCodeId() {

    var JsonSchdInfo = JsonScheduleInfo;

    var rtnvalue = getDistinctValue(JsonSchdInfo, 's_CCID');

    return rtnvalue;

}

function getcountryzone(c_name) {

    var JsonSchdInfo = JsonScheduleInfo;
    var rtndata1 = "";
    var rtndata2 = "";

    for (var ax = 0; ax < JsonSchdInfo.length; ax++) {
    
        if(JsonSchdInfo[ax].s_country_name == c_name){
        
            rtndata1 += JsonSchdInfo[ax].s_CUID + "+";
            rtndata2 += JsonSchdInfo[ax].s_country_zone + "+";
        }
    
    }

    return rtndata1 + "~" + rtndata2;

}


function changeCountryZone() {


    var e = document.getElementById("ChooseCountryId");
    var countryNme = e.options[e.selectedIndex].text;
    var countryId = e.options[e.selectedIndex].value;

    loadScheduleZone(countryNme);

}


function ViewAvaibaleContainer() {

    var e = document.getElementById("ChoosedZoneId");
    var countryNme = e.options[e.selectedIndex].text;
    var countryId = e.options[e.selectedIndex].value;



    var jsData = '{"s_CUID":"' + countryId + '"}';

    $.ajax({
        url: '' + path + '/WebService/CMS.asmx/View_AviableContainer_CounZone',
        data: jsData,
        method: 'post',
        dataType: 'xml',
        success: function (response) {
            var rtData = response;
            var fnData = rtData.getElementsByTagName("string")[0].childNodes[0].nodeValue;
            JsonContainerInfo = JSON.parse(fnData);
            ViewAvaiableContainer();

        },
        error: function (error) {
            alert(JSON.stringify(error));
        }
    });

}


function submitbutton() {

   
    var disdata = '<button onclick=ViewAvaibaleContainer() class="button">Submit</button>'; 

    document.getElementById("buttonScheduleID").innerHTML = disdata;

}

function loadScheduleZone(country) {

    var disdata = "";
    var countryzone = (getcountryzone(country)).split("~"); 
    var countryContaineUqID = countryzone[0].split("+");
    var countryzonee = countryzone[1].split("+");

  

    disdata += '<span class="texttitle">Choose Zone:</span>';
    disdata += '<select id="ChoosedZoneId" style="text-transform:uppercase;margin:20px;" class="textareaCss">';

    for (xc = 0; xc < countryContaineUqID.length - 1; xc++) {

        disdata += '<option value=' + countryContaineUqID[xc] + '>' + countryzonee[xc] + '</option>';
    }
    disdata += '</select>';
    

    document.getElementById("countryZOneID").innerHTML = disdata;

    submitbutton();

}


function loadScheduleCountry() {

    var disdata = "";
    var countryName = (getCountryName()).split("+");
    var countryCodeId = (getcountryCodeId()).split("+");
   
   

    disdata += '<span class="texttitle">Choose Country:</span>';
    disdata += '<select id="ChooseCountryId" onchange="changeCountryZone()" style="text-transform:uppercase;margin:20px;" class="textareaCss">';

    for (var xx = 0; xx < countryName.length - 1; xx++) {

        disdata += '<option value=' + countryCodeId[xx] + '>' + countryName[xx] + '</option>';

    }
    disdata += '</select>';


    document.getElementById("countrynameID").innerHTML = disdata;


    loadScheduleZone('India');
}


function getSchedule_Information_API() {


    $.ajax({
        url: '' + path + '/WebService/CMS.asmx/View_Schedule_Information',
      //data: '',
        method: 'post',
        dataType: 'xml',
        success: function (response) {
            var rtData = response;
            var fnData = rtData.getElementsByTagName("string")[0].childNodes[0].nodeValue;
            JsonScheduleInfo = JSON.parse(fnData);
            loadScheduleCountry();
        },
        error: function (error) {
            alert(JSON.stringify(error));
        }
    });


}


function Userlogout() {

    sessionStorage.setItem("session_UsrNme", "");
    sessionStorage.setItem("session_UsrRole", "");

    window.location.href = '' + path + '/';
}

function setNavMenuClickAble(desgniation) {

    if (desgniation == "Client") {

        document.getElementById("userImgId").src = "" + path + "/assets/images/users/2.jpg"; // To view the user profile picture according to their desgination


        document.getElementById("BookingContainerID").style.display = "block";
        document.getElementById("BookingStatusID").style.display = "block";
        document.getElementById("ManageBookingContainerID").style.display = "none";


    }

    else if (desgniation == "Admin") {

        document.getElementById("userImgId").src = "" + path + "/assets/images/users/1.jpg"; // To view the user profile picture according to their desgination


        document.getElementById("BookingContainerID").style.display = "none";
        document.getElementById("BookingStatusID").style.display = "none";
        document.getElementById("ManageBookingContainerID").style.display = "block";


    }


    getSchedule_Information_API();
}

function CheckUserLoginValidation() {

    var userNmae = sessionStorage.getItem('session_UsrNme');
    var UserRole = sessionStorage.getItem('session_UsrRole');

  

    if (userNmae == "" || userNmae == null || UserRole == "" || UserRole == null) {

        window.location.href = '' + path + '/';

    }


    document.getElementById("usrNmeId").innerText = userNmae;
    document.getElementById("usrdesgId").innerText = UserRole;


    setNavMenuClickAble(UserRole);
}

CheckUserLoginValidation();





