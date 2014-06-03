$(function () {

    var isOrdered = false;
    $(".fancy").fancybox({ hideOnContentClick: true, showCloseButton: false, padding: 0, margin: 0, opacity: false });


    $(".order-button").click(function () {

        $(".order-text").fadeOut();
        $(".order-phone-input").fadeIn().focus();
        $(".enter-phone-number-text").fadeIn();
        $(".check-map").fadeIn();
    });


    $(".order-phone-input").inputmask("(999)999-99-99", {
        oncomplete: function () {
            $(".order-link").fadeIn();
            $(".enter-phone-number-text").fadeIn();
            $(".check-map").fadeIn();
        },
        oncleared: function () {
            $(".order-link").fadeOut();
            $(".check-map").fadeOut();
        },
        onincomplete: function () {
            $(".order-link").fadeOut();
            $(".order-phone-input").fadeOut();
            $(".order-text").fadeIn();
            $(".enter-phone-number-text").fadeOut();
            $(".check-map").fadeOut();
        },
        "clearIncomplete": true
    });


    $(".order-link").click(function () {
        var phone = document.getElementsByClassName("order-phone-input")[0].value;
        console.log(phone);

        var data = {};
        data.phone = phone;
        data.from = document.getElementById("fromPage").value;
        console.log(data);
        $.ajax({
            url: "/api/makeorder/" + phone,
            contentType: "application/json",
            accepts: "application/json",
            type: "POST",
            data: data,
            success: function () {
                $(".order-button").fadeOut();
                $(".order-link").fadeOut();
                $(".enter-phone-number-text").fadeOut();
                $(".check-map").fadeOut();
                //$(".phone span").show(0);
                alert("Спасибо за заказ!\r\n Едоки свяжутся с Вами в ближайшее время :)");
                isOrdered = true;
            },
            error: function (err) {
                $(".order-button").fadeOut();
                $(".order-link").fadeOut();
                $(".enter-phone-number-text").fadeOut();
                $(".check-map").fadeOut();
                alert("Ошибка при отправке запроса");
                console.log(err);
                for (var prop in err) {
                    console.log(prop);
                }
                isOrdered = true;
            }
        });
    });

});