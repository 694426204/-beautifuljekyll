// Dean Attali / Beautiful Jekyll 2023

let BeautifulJekyllJS = {

  bigImgEl : null,
  numImgs : null,
  $navbar : null,
  scrollTimeout : null,
  imgCycleTimer : null,
  imgCycleRunning : false,
  escapeHandler : null,

  init : function() {
    // Cache DOM elements
    BeautifulJekyllJS.$navbar = $(".navbar");

    setTimeout(BeautifulJekyllJS.initNavbar, 10);

    // Shorten the navbar after scrolling a little bit down
    // Throttled scroll handler
    $(window).scroll(function() {
      if (BeautifulJekyllJS.scrollTimeout === null) {
        BeautifulJekyllJS.scrollTimeout = setTimeout(function() {
          BeautifulJekyllJS.scrollTimeout = null;
          if (BeautifulJekyllJS.$navbar.offset().top > 50) {
            BeautifulJekyllJS.$navbar.addClass("top-nav-short");
          } else {
            BeautifulJekyllJS.$navbar.removeClass("top-nav-short");
          }
        }, 16); // ~60fps
      }
    });

    // On mobile, hide the avatar when expanding the navbar menu
    $('#main-navbar').on('show.bs.collapse', function () {
      BeautifulJekyllJS.$navbar.addClass("top-nav-expanded");
    });
    $('#main-navbar').on('hidden.bs.collapse', function () {
      BeautifulJekyllJS.$navbar.removeClass("top-nav-expanded");
    });

    // On mobile, collapse the navbar after selecting a menu item
    $('#main-navbar a:not(.dropdown-toggle)').click(function() {
      $('#main-navbar').collapse('hide');
    });

    // show the big header image
    BeautifulJekyllJS.initImgs();

    BeautifulJekyllJS.initSearch();

    // Pause image cycle when page is hidden
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        BeautifulJekyllJS.pauseImgCycle();
      } else {
        BeautifulJekyllJS.resumeImgCycle();
      }
    });
  },

  initNavbar : function() {
    // Set the navbar-dark/light class based on its background color
    const bgColor = BeautifulJekyllJS.$navbar.css("background-color");
    if (!bgColor || bgColor === "transparent" || bgColor === "rgba(0, 0, 0, 0)") {
      return;
    }
    const rgb = bgColor.replace(/[^\d,]/g,'').split(",");
    if (!rgb || rgb.length < 3 || isNaN(parseInt(rgb[0])) || isNaN(parseInt(rgb[1])) || isNaN(parseInt(rgb[2]))) {
      return;
    }
    const brightness = Math.round(( // http://www.w3.org/TR/AERT#color-contrast
      parseInt(rgb[0]) * 299 +
      parseInt(rgb[1]) * 587 +
      parseInt(rgb[2]) * 114
    ) / 1000);
    if (brightness <= 125) {
      BeautifulJekyllJS.$navbar.removeClass("navbar-light").addClass("navbar-dark");
    } else {
      BeautifulJekyllJS.$navbar.removeClass("navbar-dark").addClass("navbar-light");
    }
  },

  initImgs : function() {
    // If the page was large images to randomly select from, choose an image
    if ($("#header-big-imgs").length > 0) {
      BeautifulJekyllJS.bigImgEl = $("#header-big-imgs");
      BeautifulJekyllJS.numImgs = BeautifulJekyllJS.bigImgEl.attr("data-num-img");

      // 2fc73a3a967e97599c9763d05e564189
      // set an initial image
      const imgInfo = BeautifulJekyllJS.getImgInfo();
      const src = imgInfo.src;
      const desc = imgInfo.desc;
      BeautifulJekyllJS.setImg(src, desc);

      // If there are multiple images, cycle through them
      if (BeautifulJekyllJS.numImgs > 1) {
        BeautifulJekyllJS.startImgCycle();
      }
    }
  },

  startImgCycle : function() {
    if (BeautifulJekyllJS.imgCycleRunning) {
      return;
    }
    BeautifulJekyllJS.imgCycleRunning = true;
    BeautifulJekyllJS.scheduleNextImg();
  },

  pauseImgCycle : function() {
    if (BeautifulJekyllJS.imgCycleTimer) {
      clearTimeout(BeautifulJekyllJS.imgCycleTimer);
      BeautifulJekyllJS.imgCycleTimer = null;
    }
    BeautifulJekyllJS.imgCycleRunning = false;
  },

  resumeImgCycle : function() {
    if (BeautifulJekyllJS.numImgs > 1 && !BeautifulJekyllJS.imgCycleRunning) {
      BeautifulJekyllJS.startImgCycle();
    }
  },

  scheduleNextImg : function() {
    if (!BeautifulJekyllJS.imgCycleRunning) {
      return;
    }
    // For better UX, prefetch the next image so that it will already be loaded when we want to show it
    const imgInfo = BeautifulJekyllJS.getImgInfo();
    const src = imgInfo.src;
    const desc = imgInfo.desc;

    const prefetchImg = new Image();
    prefetchImg.src = src;

    BeautifulJekyllJS.imgCycleTimer = setTimeout(function(){
      if (!BeautifulJekyllJS.imgCycleRunning) {
        return;
      }
      const img = $("<div></div>").addClass("big-img-transition").css("background-image", 'url(' + src + ')');
      $(".intro-header.big-img").prepend(img);
      setTimeout(function(){ img.css("opacity", "1"); }, 50);

      // after the animation of fading in the new image is done, prefetch the next one
      BeautifulJekyllJS.imgCycleTimer = setTimeout(function() {
        if (!BeautifulJekyllJS.imgCycleRunning) {
          return;
        }
        BeautifulJekyllJS.setImg(src, desc);
        img.remove();
        BeautifulJekyllJS.scheduleNextImg();
      }, 1000);
    }, 6000);
  },

  getImgInfo : function() {
    const randNum = Math.floor((Math.random() * BeautifulJekyllJS.numImgs) + 1);
    const src = BeautifulJekyllJS.bigImgEl.attr("data-img-src-" + randNum);
    const desc = BeautifulJekyllJS.bigImgEl.attr("data-img-desc-" + randNum);

    return {
      src : src,
      desc : desc
    }
  },

  setImg : function(src, desc) {
    $(".intro-header.big-img").css("background-image", 'url(' + src + ')');
    if (typeof desc !== typeof undefined && desc !== false) {
      $(".img-desc").text(desc).show();
    } else {
      $(".img-desc").hide();
    }
  },

  initSearch : function() {
    if (!document.getElementById("beautifuljekyll-search-overlay")) {
      return;
    }

    $("#nav-search-link").click(function(e) {
      e.preventDefault();
      $("#beautifuljekyll-search-overlay").show();
      $("#nav-search-input").focus().select();
      $("body").addClass("overflow-hidden");
      // Attach escape key handler
      if (!BeautifulJekyllJS.escapeHandler) {
        BeautifulJekyllJS.escapeHandler = function(e) {
          if (e.key == "Escape") {
            BeautifulJekyllJS.closeSearch();
          }
        };
        $(document).on('keyup', BeautifulJekyllJS.escapeHandler);
      }
    });

    $("#nav-search-exit").click(function(e) {
      e.preventDefault();
      BeautifulJekyllJS.closeSearch();
    });
  },

  closeSearch : function() {
    $("#beautifuljekyll-search-overlay").hide();
    $("body").removeClass("overflow-hidden");
    if (BeautifulJekyllJS.escapeHandler) {
      $(document).off('keyup', BeautifulJekyllJS.escapeHandler);
      BeautifulJekyllJS.escapeHandler = null;
    }
  }
};

// 2fc73a3a967e97599c9763d05e564189

document.addEventListener('DOMContentLoaded', BeautifulJekyllJS.init);
