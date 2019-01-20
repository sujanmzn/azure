
var hostname = window.location.host;
var protocol = window.location.protocol;

var path = protocol + "//" + hostname;


(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function () {
        $(this).on('blur', function () {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })
    })


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('#LoginBtnId').click(function () {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        LoginAfterValidation(check);

        // return check;
    });


    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if ($(input).val().trim() == '') {

                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    /*==================================================================
    [ Show pass ]*/

    var showPass = 0;
    $('.btn-show-pass').on('click', function () {
        if (showPass == 0) {
            $(this).next('input').attr('type', 'text');
            $(this).find('i').removeClass('zmdi-eye');
            $(this).find('i').addClass('zmdi-eye-off');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type', 'password');
            $(this).find('i').addClass('zmdi-eye');
            $(this).find('i').removeClass('zmdi-eye-off');
            showPass = 0;
        }

    });


})(jQuery);




function LoginAfterValidation(validationCheck) {


    if (validationCheck != true) { return; }

    var username = document.getElementById("EmailId").value;
    var password = document.getElementById("PassId").value;

    LoginCheckToAPI(username, password);
}



function LinkthePageAccToDesg(design) {

    if (design == "Admin") {

        window.location.href = '' + path + '/Pages/Manage_Booking_Container/';

    }
    else if (design == "Client") {

        window.location.href = '' + path + '/Pages/Booking_Container/';
    }

   


}


function LoginCheckToAPI(uname, pass) {


    var jJsonData = '{"uname":"' + uname + '","pass":"' + pass + '"}';




    $.ajax({
        url: '' + path + '/WebService/CMS.asmx/CMSLoginCheck',
        data: jJsonData,
        method: 'post',
        dataType: 'xml',
        success: function (response) {
            var rtData = response;
            var fnData = rtData.getElementsByTagName("string")[0].childNodes[0].nodeValue;

         

            try {
             
                if (fnData != "0") {
                    if (typeof (localStorage) !== "undefined" && (localStorage) !== null) {
                        fnData = fnData.split('~');
                        sessionStorage.setItem("session_UsrNme", fnData[0]);
                        sessionStorage.setItem("session_UsrRole", fnData[1]);
                        sessionStorage.setItem("session_UsrId", fnData[2]);

                        LinkthePageAccToDesg(fnData[1]);

                    }

                }
                else {

                    var xx = document.getElementById("errMsgId");

                    xx.innerHTML = '<span style="color: red;">Invalid Email or Password! <br/> Please Enter Valid Information</span>';

                }


            }



            catch (err) {

                alert(fnData);

            }

        },
        error: function (error) {
            alert(JSON.stringify(error));
           
        }




    });


}