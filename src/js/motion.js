'use strict';
// import './modernizr.js'
$(document).ready(function () {
    
    var $wrap = $(".wrapper"),
        pages = $(".page").length,
        scrolling = false,
        clickDot=false,
        clickArrow=false,
        swipe = false,
        currentPage = 1,
        $navPanel = $(".nav-panel"),
        $scrollBtn = $(".scroll-btn"),
        $navBtn = $(".nav-btn");

    /* Navigate Functions */
    function manageClasses() {
    /*    $wrap.removeClass(function (index, css) { 
            return (css.match(/(^|\s)active-page\S+/g) || []).join(' ');
        });*/
        $wrap.removeClass(function (index, css) {
            return (css.match(/active-page\d/g) || []).join('');
        });
        $wrap.addClass("active-page" + currentPage);
        $navBtn.removeClass("active");
        $(".nav-btn.nav-page" + currentPage).addClass("active");
        scrolling = true;
        clickDot=true;
        clickArrow=true;
        swipe = true;
        setTimeout(function () {
            scrolling = false;
            clickDot=false;
            clickArrow=false;
            swipe = false;
        }, 1000);
    }
    function navigateUp() {
        if (currentPage > 1) {
            currentPage--;
            cssTransitionsIsExist();
        }else{
            currentPage=pages;
            cssTransitionsIsExist();
        }
    }
    function navigateDown() {
        if (currentPage < pages) {
            currentPage++;
            cssTransitionsIsExist();
        }else{
            currentPage=1;
            cssTransitionsIsExist();
        }
    }
    function cssTransitionsIsExist(){
        if (Modernizr.csstransitions) {
            // if(false){
                manageClasses();
            } else {

                cssTransitionsNotExist(currentPage);
                
            }
    }

    function cssTransitionsNotExist(page){
        $navBtn.removeClass("active");
        $(".nav-btn.nav-page" + page).addClass("active");
        scrolling = true;
        clickDot=true;
        clickArrow=true;
        swipe = true;
        $wrap.animate({ "top": "-" + ((page - 1) * 100) + "%" }, 1000);
        setTimeout(function () {
            scrolling = false;
            clickDot=false;
            clickArrow=false;
            swipe = false;
        }, 1000);
    }

    /* Trace */
    function trace (target) {     
        if(currentPage<target){
            setTimeout(function() {
                currentPage=currentPage+1
                $navBtn.removeClass('active')
                $('.nav-page'+currentPage).addClass('active');
                if(currentPage<target) {
                    trace(target);
                }
            },180)
        }else if (currentPage>target){
            setTimeout(function() {
                currentPage=currentPage-1
                $navBtn.removeClass('active')
                $('.nav-page'+currentPage).addClass('active');
                if(currentPage>target) {
                    trace(target);
                }
            },180)
        }
    }

    /* Navigation */

    /* MouseWheel */
    $(document).on("mousewheel DOMMouseScroll", function (e) {
        if (!scrolling&&!clickArrow&&!clickDot&&!swipe) {
            if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
                navigateUp();
            }else {
                navigateDown();
            }
        }
    });

    /* Arrow */
    $(document).on("click", ".scroll-btn", function () {
        if (!scrolling&&!clickArrow&&!clickDot&&!swipe){
            if ($(this).hasClass("up")) {
                navigateUp();
            }else {
                navigateDown();
            }
        }
    });
   
    /* Dot */
    $(document).on("click", ".nav-btn", function () {
        if (!scrolling&&!clickArrow&&!clickDot&&!swipe) {
            var target = $(this).attr("data-target");
            if (Modernizr.csstransitions) {
                // if(false){
                $wrap.removeClass(function (index, css) {
                    return (css.match(/active-page\d/g) || []).join('');
                });
                $wrap.addClass("active-page" + target);
                scrolling = true;
                clickDot=true;
                clickArrow=true;    
                trace(target);
                setTimeout(function () {
                    scrolling = false;
                    clickDot=false;
                    clickArrow=false;
                }, 1000);
            }else {

                cssTransitionsNotExist(target);
            }
        }
    });        

/* Touch */
    var startY,endY,swipeY;
    $(document).on('touchstart',function(e) {
        if (!scrolling&&!clickArrow&&!clickDot&&!swipe) {
            startY = e.originalEvent.targetTouches[0].pageY;
            // console.log(startY)
        }  
    });
    $(document).on('touchend',function(e) {
        if (!scrolling&&!clickArrow&&!clickDot&&!swipe) {
            endY = e.originalEvent.changedTouches[0].pageY;
            // console.log(endY)
            getDirection(startY,endY)
        }    
    });
    function getDirection(startY,endY){
        swipeY = endY-startY;
        if (swipeY>0) {
            // console.log('down')
            navigateDown();
        }
        else if (swipeY<0) {
            // console.log('up')
            navigateUp();
        }
    }
}); 