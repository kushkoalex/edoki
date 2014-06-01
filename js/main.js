$(function () {

    var isOrdered = false;
    $(".fancy").fancybox({ hideOnContentClick: true, showCloseButton: false, padding: 0, margin: 0, opacity: false });


    var u;
    var dc = $(".dish-component");
    dc.mouseenter(function () {
        $(this).addClass("active");
    });

    dc.mouseleave(function () {
        if (!$(this).hasClass("selected")) {
            $(this).removeClass("active");
        }
    });


    function setActiveComponent(component) {
        var current = component;
        $(".dish-component").each(function () {
            $(this).removeClass("selected");
            if (this != current) {
                $(this).removeClass("active");
            }
        });
        $(current).addClass("selected");
        var classNames = current.getAttribute("class");
        var id = getIdByClassName(classNames);
        var currentControlId = getCurrentItemName();
        $(".dish-components-item").each(function () {
            if (id != currentControlId) {
                $(this).css("display", "none");
                //$(this).removeClass("selected");
            }
        });
        $("#" + id).fadeIn();
    }


    dc.click(function () {
        setActiveComponent(this);
    });


    $("#navi-prev").click(function () {
        var current = getCurrentItem();
        if (current != u) {
            var sib = current.previousElementSibling;
            if (sib != null) {
                setActiveComponent(sib);
            }
        }
    });

    $("#navi-next").click(function () {
        var current = getCurrentItem();
        if (current != u) {
            var sib = current.nextElementSibling;
            if (sib != null) {
                setActiveComponent(sib);
            }
        }
    });


    function getIdByClassName(classNames) {
        if (classNames.indexOf("egg") > 0) {
            return "egg";
        }
        if (classNames.indexOf("onion") > 0) {
            return "onion";
        }
        if (classNames.indexOf("mushroom") > 0) {
            return "mushroom";
        }
        if (classNames.indexOf("chicken") > 0) {
            return "chicken";
        }
        if (classNames.indexOf("noodles") > 0) {
            return "noodles";
        }
        if (classNames.indexOf("nori") > 0) {
            return "nori";
        }
        if (classNames.indexOf("pot") > 0) {
            return "pot";
        }
    }

    function getCurrentItemName() {
        var result = null;
        $(".dish-components-item").each(function () {
            if ($(this).css("display") == "block") {
                result = this.getAttribute("id");
            }
        });
        return result;
    }

    function getCurrentItem() {
        var items = $(".dish-component.selected");
        if (items.length > 0) {
            return items[0];
        }
    }

    var firstElement = $(".dish-component.egg")[0];

    setActiveComponent(firstElement);


    $(".order-button").click(function () {
        $(".order-text").fadeOut();
        $(".order-phone-input").fadeIn().focus();
        $(".enter-phone-number-text").fadeIn();
        $(".check-map").fadeIn();
    });

    $("#btnMakeDinner").click(function () {
        //hideControls();
        $("#btnMakeDinner").fadeOut();
        $(".order-block.top").fadeOut();
        $(".dish-components").css("visibility", "hidden");
        $(".dish-components-description").fadeOut();
        $(".kitchen").css("display", "block");
        $(".check-map").fadeIn();
        //setTimeout(mixComponents, 500);
        //mixComponents();


        var egg = $(".egg")[0];
        egg.coef = 3;

        var onion = $(".onion")[0];
        onion.coef = 1.8;

        var mushroom = $(".mushroom")[0];
        mushroom.coef = 0.43;

        var chicken = $(".chicken")[0];
        chicken.coef = 0;

        var noodles = $(".noodles")[0];
        noodles.coef = -0.9;

        var nori = $(".nori")[0];
        nori.coef = -1.8;

        var pot = $(".pot")[0];
        pot.coef = -3;

        var components = [egg, onion, mushroom, chicken, noodles, nori, pot];
        for (var i = 0; i < components.length; i++) {
            components[i].top = 0;
            components[i].left = 0;
        }


        animate(
            {
                delay: 10,
                steps: 40,
                delta: 4,
                components: components,
                complete: function () {
                    //pot.fadeOut();
                    $(".egg").fadeOut();
                    $(".onion").fadeOut();
                    $(".mushroom").fadeOut();
                    $(".chicken").fadeOut();
                    $(".noodles").fadeOut();
                    $(".nori").fadeOut();
                    $(".pot").fadeOut();

                    $(".plate").fadeIn(1000, function () {
                        $(".volume").fadeIn(1000, function () {
                            $(".marketing-free").fadeIn(1000, function () {
                                $(".price_bottom").fadeIn(1000, function () {
                                    $(".sticks").fadeIn(1000, function () {
                                        if (!isOrdered) {
                                            $(".order-block.bottom").fadeIn(1000, function () {
                                                $(".check-map-bottom").fadeIn(1000);
                                            });
                                        }
                                    });
                                });
                            });
                        });
                    });
                }
            });

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

    //mixComponents();


    function animate(options) {

        var count = 0;

        var components = options.components;

        var timer = setInterval(function () {

            for (var i = 0; i < components.length; i++) {
                components[i].top = components[i].top + options.delta;
                components[i].left = components[i].left + options.delta * components[i].coef;
                components[i].style.top = components[i].top + 'px';
                components[i].style.left = components[i].left + 'px';
            }

            count = count + 1;

            if (count > options.steps) {
                clearInterval(timer);
                options.complete && options.complete();
            }

        }, options.delay || 10);

        return timer;
    }


});