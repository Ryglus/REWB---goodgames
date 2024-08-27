$(function () {
  var countDownDate = new Date();
  var startDate = new Date();
  countDownDate.setHours(23, 59, 59, 59);
  startDate.setHours(0, 0, 0, 0);
  countDownDate = countDownDate.getTime();
  var percent = 0, bar = $('#blips'), crsl = $('.carousel');
  function progressBarCarousel() {
    bar.css({ width: percent + '%' });
    percent = percent + .80;
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    $("#zhavinkaCountDown").text(hours + ":" + ('0' + minutes).slice(-2) + ":" + ('0' + seconds).slice(-2));
    $("#zhavinkaProgressBar").css("width", (startDate / now) * 90 + "%")
    if (percent > 100) {
      crsl.carousel('next');
      percent = 100;
    }
  }
  var barInterval = setInterval(progressBarCarousel, 50);
  crsl.carousel().on('slid.bs.carousel', function () {
    percent = 0;
    var currentIndex = $(".carousel-inner").children(".active").index();

    $('#blips').appendTo($('#result li').eq(currentIndex))
    $('#result li').removeClass('active-p').eq(currentIndex).addClass('active-p');
  });
  crsl.hover(
    function () {
      clearInterval(barInterval);
      percent = 0;
      bar.css({ width: percent + '%' });
    },
    function () {
      barInterval = setInterval(progressBarCarousel, 50);
    })
});

$(window).resize(function () {
  $('#result li').css("height", parseInt($('.carousel-inner').css("height")) / $('#result li').length);
});
$($('.carousel-inner')).ready(function () {
  var interval = setInterval(function () {
    if (parseInt($('.carousel-inner').css("height")) > 50) {
      clearInterval(interval);
      $('#result li').css("height", parseInt($('.carousel-inner').css("height")) / $('#result li').length);
    }
    console.log("ree");
  }, 30);

});