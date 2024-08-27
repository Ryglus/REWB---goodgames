$(document).ready(function () {
  var nav_width = $('.menu').outerWidth(true);
  var item_count_og = ($("#menu_ul li").length);
  var items_widths = [];
  var item_count = ($("#menu_ul li").length);
  for (let i = item_count; i >= 0; i--) {
    var width = 0;
    $('#menu_ul').each(function () { width += $(this).outerWidth(true); });
    if (width == 0) {
      $('#menu_ul li').appendTo($('#overflow'));
      items_widths.push($('#menu_ul li').not('#more').last().outerWidth(true));
    }
    if (nav_width - Math.round(width) < Math.round($('#menu_ul li').not('#more').last().outerWidth(true))) {
      items_widths.push($('#menu_ul li').not('#more').last().outerWidth(true));
      $('#menu_ul li').not('#more').last().appendTo($('#overflow'));

      $('#more').appendTo($('#menu_ul'));
      $('#more').show();
    }
    if (nav_width - Math.round(width) > Math.round(items_widths[items_widths.length - 1]) && items_widths[items_widths.length - 1] != undefined) {
      items_widths.pop()
      $('#overflow li').last().appendTo($('#menu_ul')).after($('.dropdown-menu + .dropdown-menu'));
      $('#more').appendTo($('#menu_ul'));
    }
    if (item_count_og - 1 < item_count && items_widths.length == 0) {
      //console.log("hid more")
      $('#more').appendTo('body');
      $('#more').hide();
    }
  }

  $(window).resize(function () {
    item_count = ($("#menu_ul li").length);
    overflow_count = ($("#overflow li").length);
    if (item_count == 0)
      if ($('#menu_ul').is(':visible')) {
        $('#overflow li').slice(0, 2).insertBefore($('.dropdown-menu').first());
        $('#overflow li').appendTo($('#menu_ul')).after($('.dropdown-menu + .dropdown-menu'));
      }
    if ($('#menu_ul').is(':visible')) {
      item_count = ($("#menu_ul li").length);
      nav_width = $('.menu').outerWidth(true);
      for (let i = 0; i < item_count * 2; i++) {
        var width = 0;
        $('#menu_ul').each(function () { width += $(this).outerWidth(true); });

        if (nav_width - Math.round(width) < Math.round($('#menu_ul li').not('#more').last().outerWidth(true))) {
          items_widths.push($('#menu_ul li').not('#more').last().outerWidth(true));
          $('#menu_ul li').not('#more').last().appendTo($('#overflow'));

          $('#more').appendTo($('#menu_ul'));
          $('#more').show();
        }
        if (items_widths[0] == undefined) {
          items_widths.shift()
          $('#overflow li').appendTo($('#menu_ul')).after($('.dropdown-menu + .dropdown-menu'));
          $('#more').appendTo($('#menu_ul'));

        }
        if (nav_width - Math.round(width) > Math.round(items_widths[items_widths.length - 1]) && items_widths[items_widths.length - 1] != undefined) {
          items_widths.pop()
          //console.log("add: "+);
          $('#overflow li').last().appendTo($('#menu_ul')).after($('.dropdown-menu + .dropdown-menu'));
          $('#more').appendTo($('#menu_ul'));

        }
        if (item_count_og < item_count && items_widths.length == 0) {
          //console.log("hid more")
          $('#more').appendTo('body');
          $('#more').hide();
        }
      }
    }
    //console.log(Math.round($('#menu_ul li').not('#more').last().outerWidth(true)),Math.round(items_widths[items_widths.length-1]))
  });
});