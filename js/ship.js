
$("#formPages").on('slid.bs.carousel', function () {
    var carr = $(".carousel-inner")
    var percent=carr.children(".active").index()/carr.children().length*100+10;
    $('.progress-bar').css({width:percent+'%'});
    console.log()
    $("#nav-tab").children().removeClass('active').eq(carr.children(".active").index()).addClass('active').removeClass("disabled");
});