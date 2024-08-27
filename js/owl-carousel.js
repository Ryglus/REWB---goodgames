
$('.viewcarousel').each(function () {
    $(this).children().each(function (index) {
        $(this).attr('data-position', index); // NB: .attr() instead of .data()
    });
    $(this).owlCarousel({
        navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>', '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
        loop: true,
        responsiveClass: true,
        nav: true,
        responsiveBaseElement: ".owl-carousel",
        responsive: {
            0: {
                items: 2,
                loop: true,
                nav:true
            },
            720: {
                items: 4,
                loop: true,
                nav:true
            },
            960: {
                items: 5,
                loop: true,
                nav:true
            }
        }
    });
});
$('#zhavinkacarousel').each(function () {
    $(this).children().each(function (index) {
        $(this).attr('data-position', index); // NB: .attr() instead of .data()
    });
    $(this).owlCarousel({
        navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>', '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
        loop: true,
        responsiveClass: true,
        nav: true,
        startPosition: 2,
        responsiveBaseElement: ".owl-carousel",
        responsive: {
            0: {
                items: 2,
                loop: true,
                nav:true
            },
            500: {
                items: 2,
                loop: true,
                nav:true
            },
            750: {
                items: 2.5,
                loop: true,
                nav:true
            },
            951: {
                items: 2,
                loop: true,
                nav:true
            },
            1057: {
                items: 2.5,
                loop: true,
                nav:true
            },
            1251: {
                items: 3,
                loop: true,
                nav:true
            }
        }
    });
});





$(document).on('click', '.owl-item>div', function () {
    var $speed = 300;  // in ms
    $(this).parent().trigger('to.owl.carousel', [$(this).data('position'), $speed]);
});
$(document).ready(function () {
    $('#my-carousel').on('initialized.owl.carousel', function () {
        $('.navigator').eq(0).addClass('active');
    });
    $('#my-carousel').owlCarousel({
        navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>', '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
        dots:true,
        responsive: {
            0: {
                dots:true,
                items: 1,
                nav:true

            },
            992: {
                dots:false,
                items: 1,
                nav:false
            }
        }
    });
    $('#carouselSelector').owlCarousel({
        responsive: {
            960: {
                items: 5,
            },
            1140: {
                items: 6,
            },
            1320: {
                items: 7,
            }
        }
    });
    $('#my-carousel').on('changed.owl.carousel', function (ev) {
        var item_index = ev.page.index;
        $('.navigator').removeClass('active').eq(item_index).addClass('active');
    });
    $('.navigator').on('click', function () {
        var item_no = $(this).data('item');
        $('#my-carousel').trigger('to.owl.carousel', [item_no, 1000, true]);
    });
});

