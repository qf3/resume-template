'use strict';
// import './modernizr.js'
$(document).ready(function () {
    
    var $wrap = $(".wrapper"),
        pages = $(".page").length,
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
        clickDot=true;
        clickArrow=true;
        swipe = true;
        setTimeout(function () {
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
        clickDot=true;
        clickArrow=true;
        swipe = true;
        $wrap.animate({ "top": "-" + ((page - 1) * 100) + "%" }, 1000);
        setTimeout(function () {
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


    /* Arrow */
    $(document).on("click", ".scroll-btn", function () {
        if (!clickArrow&&!clickDot&&!swipe){
            if ($(this).hasClass("up")) {
                navigateUp();
            }else {
                navigateDown();
            }
        }
    });
   
    /* Dot */
    $(document).on("click", ".nav-btn", function () {
        if (!clickArrow&&!clickDot&&!swipe) {
            var target = $(this).attr("data-target");
            if (Modernizr.csstransitions) {
                // if(false){
                $wrap.removeClass(function (index, css) {
                    return (css.match(/active-page\d/g) || []).join('');
                });
                $wrap.addClass("active-page" + target);
                clickDot=true;
                clickArrow=true;    
                trace(target);
                setTimeout(function () {
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
    var flag = false;
    $(document).on('touchstart',function(e) {
        if (e.touches.length===1) {
            flag = true;
            if (!clickArrow&&!clickDot&&!swipe) {
                startY = e.originalEvent.targetTouches[0].pageY;
            // console.log(startY)
            }  
        }
    });
    $(document).on('touchmove',function(e) {
        if (e.touches.length===1&&flag===true) {
            if (!clickArrow&&!clickDot&&!swipe) {
                endY = e.originalEvent.changedTouches[0].pageY;
                // console.log(endY)
                getDirection(startY,endY)
            }
        }else{
            flag = false;
            endY = startY;
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