$(document).ready(function () {
    var priceMax = NaN, priceMin = NaN;
    $("#ecomerce").children().each(function () {
        $(this).attr("data-my-order-default", $(this).index())
        var cena = parseInt($(this).find("#entry_price").text().replace(" Kč", ""));
        if (cena > priceMax || isNaN(priceMax)) priceMax = cena;
        if (cena < priceMin || isNaN(priceMin)) priceMin = cena;
    });

    $("#priceRange").slider({ id: "slider12c", min: priceMin, max: priceMax, range: true, value: [2, 8] });

    $('#rangenum1').val(Math.round(priceMax / 10 * 2))
    $('#rangenum2').val(Math.round(priceMax / 10 * 8))

    $('#activebadge-range span').text(Math.round(priceMax / 10 * 2) + " - " + Math.round(priceMax / 10 * 8) + " Kč");

    $(".filterbutton").each(function () {
        $(this).attr("data-my-state", 0)
        $(this).attr("aria-expanded", "mid")
    });

    var selected = $("#ecomerce").attr("data-show-default");
    if ($("#ecomerce").children().length > 0 && $("#ecomerce").children().length > selected - 1) {
        $("#ecomerce").children().eq(selected - 1).prevAll().show();
        $("#ecomerce").children().eq(selected - 1).nextAll().hide();
        $("#ecomerce").children().eq(selected - 1).show();
    } else {
        $("#ecomerce").children().eq(0).nextAll().show();
        $("#showmore").hide()
    }
});








