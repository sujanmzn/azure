var JsonBookingContainer = '[{}]';

var hostname = window.location.host;
var protocol = window.location.protocol;

var path = protocol + "//" + hostname;


function ConformBooking(containerName) {

    var jJsonData = '{"ContainerName":"' + containerName + '"}';

    $.ajax({
        url: '' + path + '/WebService/CMS.asmx/Update_Booking_Conatiner_Status_Admin',
        data: jJsonData,
        method: 'post',
        dataType: 'xml',
        success: function (response) {
            var rtData = response;
            var fnData = rtData.getElementsByTagName("string")[0].childNodes[0].nodeValue;
            if(fnData == "1"){
            
                alert("Conform Sucessfully!!!");
                loadAllBookingContainerList();
                
            }
        },
        error: function (error) {
            alert(JSON.stringify(error));
        }
    });


}

function loadManageBookingContainer() {

    var disdata = "";

    disdata += '<div class="col-12">';
    disdata += '<div class="card">';

    disdata += '<div class="card-body">';

    disdata += '<h5 class="card-title">Client Booking Container List :</h5>';
    disdata += '<div class="card-body">';

    disdata += '<div class="table-responsive">';
    disdata += '<table class="table table-hover">';
    disdata += '<thead>';
    disdata += '<tr>';
    disdata += '<th scope="col">S.No</th>';
    disdata += '<th scope="col">Username</th>';
    disdata += '<th scope="col">Country</th>';
    disdata += '<th scope="col">Zone</th>';
    disdata += '<th scope="col">Container ID</th>';
    disdata += '<th scope="col">Arrival Date</th>';
    disdata += '<th scope="col">Container Available Status</th>';
    disdata += '<th scope="col">Booking Status</th>';
    disdata += '<th scope="col" style="text-align:center;">Action</th>';
    disdata += '</tr>';
    disdata += '</thead>';
    disdata += '<tbody>';

    for (var fu = 0; fu < JsonBookingContainer.length; fu++){

        disdata += '<tr style="text-align: center;">';

        disdata += '<th scope="row">'+ parseInt(fu + 1) +'</th>';
        disdata += '<td id="usernametdID' + fu + '">' + JsonBookingContainer[fu].username + '</td>';
        disdata += '<td id="countrytdID' + fu + '">' + JsonBookingContainer[fu].u_country + '</td>';
        disdata += '<td id="zonetdID' + fu + '">' + JsonBookingContainer[fu].u_zone + '</td>';
        disdata += '<td id="containerNmetdID' + fu + '">' + JsonBookingContainer[fu].u_container_name + '</td>';
        disdata += '<td id="ArriavlDatetdID' + fu + '">' + JsonBookingContainer[fu].u_request_date + '</td>';
        disdata += '<td id="ContinerStatustdID' + fu + '">' + JsonBookingContainer[fu].u_available_status + '</td>';
        disdata += '<td id="ContinerStatustdID' + fu + '">' + JsonBookingContainer[fu].u_booking_status + '</td>';
        disdata += '<td>';
        disdata += '<div class="cover_divtextfield">';
  
        if (JsonBookingContainer[fu].u_booking_status != "On-Transit" && JsonBookingContainer[fu].u_booking_status != "Delivered") {

            disdata += '<button id="ConformBtnId' + fu + '" style="margin: 0px;padding: 6px 10px 6px 10px;background-color:#4CAF50;" onclick=ConformBooking("' + JsonBookingContainer[fu].u_container_name + '") class="button">Conform</button>';
        }
        else if (JsonBookingContainer[fu].u_booking_status == "On-Transit" || JsonBookingContainer[fu].u_booking_status == "Delivered") {
            disdata += '<button id="ConformBtnId' + fu + '" disabled style="cursor: not-allowed;margin: 0px;padding: 6px 10px 6px 10px;background-color:#327335;" onclick=ConformBooking("' + JsonBookingContainer[fu].u_container_name + '") class="button">Conform</button>';
    }

    disdata += '</div>';
    disdata += '</td>';

    disdata += '</tr>';
}
    disdata += '</tbody>';
    disdata += '</table>';
    disdata += '</div>';


    disdata += '</div>';                         
                              
    disdata += '</div>';
    disdata += '</div>';

    disdata += '</div>';


    document.getElementById("AvaBookingContinerId").innerHTML = disdata;

}

function loadAllBookingContainerList(){

    //var jJsonData = '{"idid":"' + idid + '"}';

    $.ajax({
        url: '' + path + '/WebService/CMS.asmx/View_ALL_BookingContainer',
        //data: jJsonData,
        method: 'post',
        dataType: 'xml',
        success: function (response) {
            var rtData = response;
            var fnData = rtData.getElementsByTagName("string")[0].childNodes[0].nodeValue;
            JsonBookingContainer = JSON.parse(fnData);
            loadManageBookingContainer();
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

    loadAllBookingContainerList();
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

