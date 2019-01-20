
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

    $('#conformpassChangeId').click(function () {
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




function RegisterDetailsIntoAPI(username, emailAdd, newpass, address, contacNum) {


    var jsData = '{"username":"' + username + '","emailAdd":"' + emailAdd + '","newpass":"' + newpass + '","address":"' + address + '","contacNum":"' + contacNum + '"}';

    $.ajax({
        url: '' + path + '/WebService/CMS.asmx/Register_Client_Details',
        data: jsData,
        method: 'post',
        dataType: 'xml',
        success: function (response) {
            var rtData = response;
            var fnData = rtData.getElementsByTagName("string")[0].childNodes[0].nodeValue;

            if (fnData == "1") {

                alert("Registration Sucessfull!!!");

                window.location.href = path + '/';
            }

        },
        error: function (error) {
            alert(JSON.stringify(error));
        }
    });


}



function LoginAfterValidation(validationCheck) {


    if (validationCheck != true) { return; }


    var username = document.getElementById("usernameId").value;
    var emailAdd = document.getElementById("EmailId").value;
    var newpass = document.getElementById("NewPassID").value;
    var address = document.getElementById("addressId").value;
    var contacNum = document.getElementById("contactNoId").value;


   

    RegisterDetailsIntoAPI(username, emailAdd, newpass, address, contacNum);
}

