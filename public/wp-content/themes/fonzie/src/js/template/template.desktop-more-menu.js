/* Template: Navigation 'More' Button
 ========================================================================== */

template.desktop_more_menu = function() {
    'use strict';

    var nav             = $('#primary-menu'),
        subNav          = $('.navbar__more'),
        subNavBtn       = $('.navbar__more_btn'),
        subNavList      = $('.navbar__more_list'),
        n = $,
        i = subNav,
        u = subNavList,
        t = nav.children('.menu-item'),
        o = n(".menu-toggle"),
        r = !1;

    nav.append(subNav);

    function g() {
        var c, f, l, n, h;
        if (!r) {
            if (r = !0, o.is(":visible")) {
                i.hide();
                t.show();
            }
            else if (t.hide(),
                    i.show(),
                    c = i.offset().top,
                    i.hide(),
                    t.show(),
                    f = t.eq(0).offset().top,
                    l = t.last().offset().top,
                    l > f) {
                for (u.empty(), e(t.last()), i.show().css("visiblity", "hidden"), n = t.length - 2; n >= 0; --n)
                    if (h = t.eq(n), h.offset().top > f || i.offset().top > c) e(h);
                    else break;
                i.show().css("visiblity", "visible");
            }
            setTimeout(function() {
                r = !1;
            }, 0);
        }
    }

    function e(n) {
        var t = n.children("a")[0],
            i = '<li><a href="' + t.href + '">' + t.innerHTML + "<\/a><\/li>";
        u.prepend(i);
        n.hide();
    }

    var tLengthLow = t.length < 2;

    if (nav.css("overflow", "visible"), !tLengthLow) {
        n(window).on("resize", g);
        g();
    }

    subNavBtn.on('click', function(){
        subNavList.stop().slideToggle(function(){
            subNavBtn.toggleClass('active');
        });
    });

};
