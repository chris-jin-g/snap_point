jQuery( document ).ready(function() {

  var controller = new ScrollMagic.Controller( {globalSceneOptions: {  triggerHook: 'onEnter' }} );
  var winwid = jQuery( window ).width() + 400;
  if (jQuery(".green_none").length) {
  TweenMax.set('.green_none', {visibility:'visible'});
  }

  //  //fix and small logo on scroll
  //   var stickyOffset = jQuery('.sticky').offset().top;
  //
  // jQuery(window).scroll(function(){
  //   var sticky = jQuery('.sticky'),
  //       scroll = jQuery(window).scrollTop();
  //
  //   if (scroll >= stickyOffset) sticky.addClass('jr_fixed');
  //   else sticky.removeClass('jr_fixed');
  // });
  //
  // var pin_small = gsap.timeline();
  // pin_small.to('#jr_head_logo', {duration: .5, scale:.75}, 0)
  // .fromTo('.navbar', {paddingTop: "24px", paddingBottom: "24px"}, {duration: .5, ease:Linear.easeNone, paddingTop: "8px", paddingBottom: "8px"}, 0)
  // ;
  //
  // var pin_top = new ScrollMagic.Scene({ triggerElement: "#upper_nav", triggerHook:"onLeave", offset: up_head_height})
  //   .setTween(pin_small)
  //   .addTo(controller);

  // var i1 = 0;
  // var i2 = 0;
  //
  // //slide out nav
  // var nav_down = gsap.timeline({delay:0.5});
  // nav_down.to("#wrapper-navbar", 1, {top: "-200"});
  // nav_down.pause();
  //
  // var s_nav_pin = new ScrollMagic.Scene()
  //   .addTo(controller)
  //   .on("update", function() {
  //       var x1 = controller.info("scrollDirection");
  //       var x2 = jQuery(window).scrollTop();
  //       var x3 = 200;
  //
  //           if ( x1 == "REVERSE" && x2 >= x3 && i1 == 0) {
  //               nav_down.reverse();
  //               i1++;
  //               i2 = 0;
  //           }
  //           if ( x1 == "FORWARD" && x2 > x3 && i2 == 0) {
  //               nav_down.play();
  //               i1 = 0;
  //               i2++;
  //           }
  //   });

  //Start Front Page Check
  if (jQuery("#front_slider").length) {

  //slide left
  var slide_left = gsap.from('.slide_left', {duration: 1, x:'-=' +winwid});
  var s_slide_left = new ScrollMagic.Scene({ triggerElement: ".slide_left", offset: 150 })
    .setTween(slide_left)
    .addTo(controller);

  //slide right
  var slide_right = gsap.from('.slide_right', {duration: 1, x:'+=' +winwid});
  var s_slide_right = new ScrollMagic.Scene({ triggerElement: ".slide_right", offset: 150 })
    .setTween(slide_right)
    .addTo(controller);

  //checkmarks
  jQuery(".check_wrapper").each(function() {

    var tcheck = gsap.timeline();

    tcheck.from( jQuery(this).find(".check_mark .s2"), {duration: .5, scaleX: 0, transformOrigin: '0% 100%'})
    .from( jQuery(this).find(".check_mark .s1"), {duration: .5, scaleY: 0, transformOrigin: '0% 100%'});

    var check_scene = new ScrollMagic.Scene({ triggerElement: this, offset: 150 })
    .setTween(tcheck)
    .addTo(controller);

  });


  }//End Front Page Check

  //Stagger Our Mission icons
  if (jQuery(".our_mission").length) {
  var stag_icons = gsap.timeline();
  stag_icons.from('.icon_wrapper .icons:nth-child(1)', {duration: 2, backgroundColor: "#ffffff"})
  .from('.icon_wrapper .icons:nth-child(2)', {duration: 2, backgroundColor: "#ffffff"}, "-=1.9")
  .from('.icon_wrapper .icons:nth-child(3)', {duration: 2, backgroundColor: "#ffffff"}, "-=1.8")
  .from('.icon_wrapper .icons:nth-child(4)', {duration: 2, backgroundColor: "#ffffff"}, "-=1.7");
  var s_stag_icons = new ScrollMagic.Scene({ triggerElement: ".our_mission", offset: 150 })
    .setTween(stag_icons)
    .addTo(controller);
  }

  //icons slider
 jQuery (function (){

   if (jQuery("#awards_slider").length) {
    var slides = document.querySelectorAll("#awards_slider .icon");
    var container = document.querySelector("#awards_slider .icons_wrapper");
    var containerWrap = document.querySelector("#awards_slider .icons_outer_wrapper");
    var dur = 0.5;
    var offsets = [];
    var oldSlide = 0;
    var activeSlide = 0;

    var leftArrow = jQuery("#awards_slider .left_arrow");
    jQuery(leftArrow).click(slideAnim);
    var rightArrow = jQuery("#awards_slider .right_arrow");
    jQuery(rightArrow).click(slideAnim);
    // document.querySelector("#left_arrow").addEventListener("click", slideAnim);
    // document.querySelector("#right_arrow").addEventListener("click", slideAnim);

    // get elements positioned
    // gsap.set(".nav-arrow", {yPercent:-50});

    // make the whole thing draggable
    var dragMe = Draggable.create(container, {
      type: "x",
      edgeResistance: 1,
      snap: offsets,
      throwProps:true,
      bounds: "#awards_slider .inner_wrapper",
      onDragEnd: slideAnim,
      allowNativeTouchScrolling: false,
      zIndexBoost:false
    });

    dragMe[0].id = "dragger";
    sizeIt();

    // main action check which of the 4 types of interaction called the function
    function slideAnim(event) {
      var slidesByRow = sizeIt(slidesByRow);
      oldSlide = activeSlide;
      // dragging the panels
      if (this.id === "dragger") {
        activeSlide = offsets.indexOf(this.endX);
      } else {
        if (gsap.isTweening(container)) {
          return;
        }
      }

        // arrow clicks
        if (jQuery(this).attr("class") === jQuery(leftArrow).attr("class") || jQuery(this).attr("class") === jQuery(rightArrow).attr("class")) {
          activeSlide = jQuery(this).attr("class") === jQuery(rightArrow).attr("class") ? (activeSlide += 1) : (activeSlide -= 1);
        }

        var baseColumnsF = Math.floor(slides.length / slidesByRow);
        var baseColumns = (slides.length / slidesByRow);
        baseColumns = baseColumnsF >= baseColumns ? baseColumnsF -1 : baseColumnsF;

        // make sure we're not past the end or beginning slide
        activeSlide = activeSlide < 0 ? 0 : activeSlide;
        activeSlide = activeSlide > baseColumns  ? baseColumns  : activeSlide;
        if (oldSlide === activeSlide) {
          return;
        }


      // if we're dragging we don't animate the container
      if (this.id != "dragger") {
        gsap.to(container, dur, { x: offsets[activeSlide] });
      }

    }


    // update the draggable element snap points
    function sizeIt() {
        var wd = jQuery(window).width();
        var slidesByRow;
        var slidesByRow = 1;
        if(wd > 575){
          var slidesByRow = 2;
        }
        if(wd > 991){
          var slidesByRow = 5;
        }
        if(wd > 1348){
          var slidesByRow = 6;
        }

        var baseColumnsF = Math.floor(slides.length / slidesByRow);
        var baseColumns = (slides.length / slidesByRow);
        baseColumns = baseColumnsF >= baseColumns ? baseColumnsF : baseColumnsF +1;

        offsets = [];
        iw = jQuery(containerWrap).innerWidth();
        gsap.set(slides, { width: iw/slidesByRow });
        gsap.set(container, { width: slides.length * Math.round(iw/slidesByRow) });
        var offset = 0;
        for (let i = 0; i < baseColumns; i++) {
      		// offset = i*Math.round(iw/slidesByRow);
          offset = i*Math.round(iw);
          offsets.push(-offset);
          // offsets.push(-slides[i].offsetLeft);
        }
      gsap.set(container, { x: offsets[activeSlide] });
      console.log( offsets[activeSlide] );
      dragMe[0].vars.snap = offsets;
      console.log( offsets );
      return slidesByRow;

    }

  }//end length check

  //throttle the resize event
  let resizeListen = gsap.delayedCall(0.3, sizeIt).pause();

  window.addEventListener("resize", function() {
    resizeListen.restart(true);
  });


  let resizeListenSA = gsap.delayedCall(0.4, slideAnim).pause();

  window.addEventListener("resize", function() {
    resizeListenSA.restart(true);
    activeSlide = activeSlide;
  });

}); //end icon slider

//testimonial slider
jQuery (function (){

 if (jQuery("#test_wrapper").length) {
  var slides = document.querySelectorAll("#test_wrapper .test_slider_content");
  var container = document.querySelector("#test_wrapper .test_slider_container");
  var containerWrap = document.querySelector("#test_wrapper .test_slider_wrapper");
  var dur = 0.5;
  var offsets = [];
  var oldSlide = 0;
  var activeSlide = 0;

  var leftArrow = jQuery("#client_reviews_arrows .left_arrow");
  jQuery(leftArrow).click(slideAnim);
  var rightArrow = jQuery("#client_reviews_arrows .right_arrow");
  jQuery(rightArrow).click(slideAnim);

  // get elements positioned
  // gsap.set(".nav-arrow", {yPercent:-50});

  // make the whole thing draggable
  var dragMe = Draggable.create(container, {
    type: "x",
    edgeResistance: 1,
    snap: offsets,
    throwProps:true,
    bounds: "#test_wrapper",
    onDragEnd: slideAnim,
    allowNativeTouchScrolling: false,
    zIndexBoost:false
  });

  dragMe[0].id = "dragger_test";
  sizeIt();

  // main action check which of the 4 types of interaction called the function
  function slideAnim(event) {
    var slidesByRow = sizeIt(slidesByRow);
    oldSlide = activeSlide;
    // dragging the panels
    if (this.id === "dragger_test") {
      activeSlide = offsets.indexOf(this.endX);
    } else {
      if (gsap.isTweening(container)) {
        return;
      }
    }

      // arrow clicks
      if (jQuery(this).attr("class") === jQuery(leftArrow).attr("class") || jQuery(this).attr("class") === jQuery(rightArrow).attr("class")) {
        activeSlide = jQuery(this).attr("class") === jQuery(rightArrow).attr("class") ? (activeSlide += 1) : (activeSlide -= 1);
      }

      var baseColumnsF = Math.floor(slides.length / slidesByRow);
      var baseColumns = (slides.length / slidesByRow);
      baseColumns = baseColumnsF >= baseColumns ? baseColumnsF -1 : baseColumnsF;

      // make sure we're not past the end or beginning slide
      activeSlide = activeSlide < 0 ? 0 : activeSlide;
      activeSlide = activeSlide > baseColumns  ? baseColumns  : activeSlide;
      if (oldSlide === activeSlide) {
        return;
      }


    // if we're dragging we don't animate the container
    if (this.id != "dragger_test") {
      gsap.to(container, dur, { x: offsets[activeSlide] });
    }

  }


  // update the draggable element snap points
  function sizeIt() {
      var wd = jQuery(window).width();
      var slidesByRow;
      var slidesByRow = 1;

      var baseColumnsF = Math.floor(slides.length / slidesByRow);
      var baseColumns = (slides.length / slidesByRow);
      baseColumns = baseColumnsF >= baseColumns ? baseColumnsF : baseColumnsF +1;

      offsets = [];
      iw = jQuery(containerWrap).innerWidth();
      gsap.set(slides, { width: iw });
      gsap.set(container, { width: slides.length * Math.round(iw/slidesByRow) });
      var offset = 0;
      for (let i = 0; i < baseColumns; i++) {
        // offset = i*Math.round(iw/slidesByRow);
        offset = i*Math.round(iw);
        offsets.push(-offset);
        // offsets.push(-slides[i].offsetLeft);
      }
    gsap.set(container, { x: offsets[activeSlide] });
    console.log( offsets[activeSlide] );
    dragMe[0].vars.snap = offsets;
    console.log( offsets );
    return slidesByRow;

  }

}//end length check

//throttle the resize event
let resizeListen = gsap.delayedCall(0.3, sizeIt).pause();

window.addEventListener("resize", function() {
  resizeListen.restart(true);
});


let resizeListenSA = gsap.delayedCall(0.4, slideAnim).pause();

window.addEventListener("resize", function() {
  resizeListenSA.restart(true);
  activeSlide = activeSlide;
});

}); //end testimonial slider

}); //end jQuery onLoad
