var shown = 1,index=0;

var filter = {
    count: 0,
    badge: [],
    range: false,
    rangeValues: [200, 1800],
    cena: 0,
    abc: 0,
    text: ""
}

function applyBadgeFilter(type, what) {
    if (filter[type].includes(what)) {
        filter[type].splice(filter[type].indexOf(what), 1);
        filter.count--;
    } else {
        filter[type].push(what)
        filter.count++;
    }
    unitedFilter()
}
function applyTypeSort(caller, what) {
    if ($(caller).attr("data-my-state") == 0) {
        $(caller).attr("data-my-state", 1).attr("aria-expanded", false)
        filter[what] = 1
    } else if ($(caller).attr("data-my-state") == 1) {
        $(caller).attr("data-my-state", 2).attr("aria-expanded", true)
        filter[what] = 2
    } else {
        $(caller).attr("data-my-state", 0).attr("aria-expanded", "mid")
        filter[what] = 0
    }
    unitedFilter()
}

function unitedFilter() {
    $("#ecomerce").children().each(w => { $("#ecomerce").children(w).show(); });
    var result = $("#ecomerce").children();
    //default sort apply
    result = $(result).sort((a, b) => (parseInt($(a).attr("data-my-order-default")) < parseInt($(b).attr("data-my-order-default"))) ? -1 : (parseInt($(a).attr("data-my-order-default")) < parseInt($(b).attr("data-my-order-default"))) ? 1 : 0);
    //Sorting
    if (filter.cena == 1) result = $(result).sort((a, b) => (parseInt($(a).find('#entry_price').text().replace(" Kč", "")) > parseInt($(b).find('#entry_price').text().replace(" Kč", ""))) ? -1 : (parseInt($(a).find('#entry_price').text().replace(" Kč", "")) > parseInt($(b).find('#entry_price').text().replace(" Kč", ""))) ? 1 : 0);

    else if (filter.cena == 2) result = $(result).sort((a, b) => (parseInt($(a).find('#entry_price').text().replace(" Kč", "")) < parseInt($(b).find('#entry_price').text().replace(" Kč", ""))) ? -1 : (parseInt($(a).find('#entry_price').text().replace(" Kč", "")) < parseInt($(b).find('#entry_price').text().replace(" Kč", ""))) ? 1 : 0);

    if (filter.abc == 1) result = $(result).sort((a, b) => (($(a).find('#entry_name').text()) > $(b).find('#entry_name').text()) ? -1 : ($(a).find('#entry_name').text() > $(b).find('#entry_name').text()) ? 1 : 0);

    else if (filter.abc == 2) result = $(result).sort((a, b) => (($(a).find('#entry_name').text()) < $(b).find('#entry_name').text()) ? -1 : ($(a).find('#entry_name').text() < $(b).find('#entry_name').text()) ? 1 : 0);
    
    $("#ecomerce").html(result); //apply sorts

    //Filtering
    if (filter.badge.length > 0) filter.badge.forEach(f => result = $(result).filter(w => $(result).eq(w).find(f).length != 0));
    if (filter.range == true) result = $(result).filter(w => $(result).eq(w).find('#entry_price').text().replace(" Kč", "") >= filter.rangeValues[0] && $(result).eq(w).find('#entry_price').text().replace(" Kč", "") <= filter.rangeValues[1]);
    if (filter.text != "") result = $(result).filter((w) => $(result).eq(w).text().toLowerCase().indexOf((filter.text).toLowerCase()) > -1);

    $("#ecomerce").children().not($(result)).hide(); //apply filters

    var selected = $("#entries option:selected").val() ;
    var indexed = selected / index;
    $("#ecomerce").children().filter(function(){ return $(this).is(":visible")}).eq(indexed-1).prevAll().hide();
    
    $("#ecomerce").children().filter(function(){ return $(this).is(":visible")}).eq(selected * shown-1).nextAll().hide()
    if (parseInt($("#ecomerce").children().filter(function(){ return $(this).is(":visible")}).length)<parseInt(selected * shown)) $("#showmore").hide()
    updateTags();
}

function morePage() {
    shown++;
    unitedFilter()
}
function nextPage() {
    index++;
    unitedFilter()
}



function removeBadgeFilter(type, what) {
    filter[type].splice(filter[type].indexOf(what), 1);
    filter.count--;
    unitedFilter()
}
function removeTypeSort(what) {
    $(("#button-"+what)).attr("data-my-state", 0).attr("aria-expanded", "mid")
    filter[what] = 0
    unitedFilter()
}
function removeRangeFilter() {
    filter.range=false;
    unitedFilter()
}





function updateTags() {
    $("#activefilters").children().each(w => $("#activefilters").children().eq(w).hide());
    filter.badge.forEach(f => {
        var id = "#active" + f.replace(".", "");
        if ($(id).is(":hidden")) {
            $(id).toggle()
        }
    });
    if (filter.range==true) {
        if ($("#activebadge-range").is(":hidden")) {
            $("#activebadge-range").toggle()
        }
    }
    if (filter.cena != 0) {
        if ($("#activebadge-cena").is(":hidden")) {
            $("#activebadge-cena").toggle()
        }
    }
    if (filter.abc != 0) {
        if ($("#activebadge-abc").is(":hidden")) {
            $("#activebadge-abc").toggle()
        }
    }
}






















$("#searchfilter").on("keyup", function () {
    filter.text = $(this).val().toLowerCase();
    unitedFilter();
});

$("#entries").on("change", function () {
    unitedFilter();
});

$("#priceRange").slider({ id: "slider12c", min: 0, max: 10, range: true, value: [2, 8] });

$('#priceRange').slider().on('change', function () {
    var numrange = $(this).val().split(",");
    $('#rangenum1').val(numrange[0])
    $('#rangenum2').val(numrange[1])
    $('#activebadge-range span').text(numrange[0] + " - " + numrange[1] + " Kč");
    filter.rangeValues[0] = parseInt(numrange[0])
    filter.rangeValues[1] = parseInt(numrange[1])
    filter.range = true;
    unitedFilter();
});

$('#rangenum1').on("change", function () {
    if (!isNaN(parseInt($(this).val()))) $("#priceRange").slider('setValue', [parseInt($(this).val()), parseInt($('#rangenum2').val())]);
    if (isNaN(parseInt($(this).val()))) {
        $("#priceRange").slider('setValue', [priceMin, parseInt($('#rangenum2').val())]);
        $(this).val(priceMin)
    }
});

$('#rangenum2').on("change", function () {
    if (!isNaN(parseInt($(this).val()))) $("#priceRange").slider('setValue', [parseInt($('#rangenum1').val()), parseInt($(this).val())]);
    if (isNaN(parseInt($(this).val()))) {
        $("#priceRange").slider('setValue', [parseInt($('#rangenum1').val()),priceMax]);
        $(this).val(priceMax)
    }
});