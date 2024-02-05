window.addEventListener("DOMContentLoaded", () => {
  commonInit();
});
window.addEventListener("load", () => {
  layoutFunc();
  commonResize();
  posLayerEvent();
});


function commonResize() {
  var $window_width = 0;
  $(window).on("resize", function() {
    if ($window_width == $(window).width()) {
      return;
    }
    posLayerResize();
  }).resize();
}

/**
 * device check
 */
function commonInit() {
  let touchstart = "ontouchstart" in window;
  let userAgent = navigator.userAgent.toLowerCase();
  if (touchstart) {
    browserAdd("touchmode");
  }
  if (userAgent.indexOf("samsung") > -1) {
    browserAdd("samsung");
  }

  if (
    navigator.platform.indexOf("Win") > -1 ||
    navigator.platform.indexOf("win") > -1
  ) {
    browserAdd("window");
  }

  if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
    // iPad or iPhone
    browserAdd("ios");
  }

  function browserAdd(opt) {
    document.querySelector("html").classList.add(opt);
  }
}

/*
  resize
*/
function resizeAction(callback) {
  let windowWid = 0;
  window.addEventListener("resize", () => {
    if (window.innerWidth !== windowWid) {
      if (callback) {
        callback();
      }
    }
    windowWid = window.innerWidth;
  });
}

/**
 * 레이아웃
 */
function layoutFunc() {
  const btn_topgo = document.querySelector(".btn_topgo");
  if (!!btn_topgo) {
    btn_topgo.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    });
  }
}

/* rock */
function rockMenu(item) {
  const itemMenu = document.querySelector(item);
  if (!!itemMenu) {
    itemMenu.classList.add("active");
  }
}

/* popup */
class DesignPopup {
  constructor(option) {
    // variable
    this.option = option;
    this.selector = document.querySelector(this.option.selector);
    if (!this.selector) {
      return;
    }

    this.design_popup_wrap = document.querySelectorAll(".popup_wrap");
    this.domHtml = document.querySelector("html");
    this.domBody = document.querySelector("body");
    this.pagewrap = document.querySelector(".page_wrap");
    this.layer_wrap_parent = null;
    this.btn_closeTrigger = null;
    this.scrollValue = 0;

    // init
    const popupGroupCreate = document.createElement("div");
    popupGroupCreate.classList.add("layer_wrap_parent");
    if (!this.layer_wrap_parent && !document.querySelector(".layer_wrap_parent")) {
      this.pagewrap.append(popupGroupCreate);
    }
    this.layer_wrap_parent = document.querySelector(".layer_wrap_parent");


    // event
    this.btn_close = this.selector.querySelectorAll(".btn_popup_close");
    this.bg_design_popup = this.selector.querySelector(".bg_dim");
    let closeItemArray = [...this.btn_close];
    if (!!this.selector.querySelectorAll(".close_trigger")) {
      this.btn_closeTrigger = this.selector.querySelectorAll(".close_trigger");
      closeItemArray.push(...this.btn_closeTrigger);
    }
    if (closeItemArray.length) {
      closeItemArray.forEach((element) => {
        element.addEventListener("click", (e) => {
          e.preventDefault();
          this.popupHide(this.selector);
        }, false);
      });
    }
  }
  dimCheck() {
    const popupActive = document.querySelectorAll(".popup_wrap.active");
    if (!!popupActive[0]) {
      popupActive[0].classList.add("active_first");
    }
    if (popupActive.length > 1) {
      this.layer_wrap_parent.classList.add("has_active_multi");
    } else {
      this.layer_wrap_parent.classList.remove("has_active_multi");
    }
  }
  popupShow() {
    this.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
    if (this.selector == null) {
      return;
    }
    this.domHtml.classList.add("touchDis");
    this.selector.classList.add("active");
    setTimeout(() => {
      this.selector.classList.add("motion_end");
    }, 30);
    if ("beforeCallback" in this.option) {
      this.option.beforeCallback();
    }
    if ("callback" in this.option) {
      this.option.callback();
    }
    if (!!this.design_popup_wrap_active) {
      this.design_popup_wrap_active.forEach((element, index) => {
        if (this.design_popup_wrap_active !== this.selector) {
          element.classList.remove("active");
        }
      });
    }
    this.layer_wrap_parent.append(this.selector);
    this.dimCheck();
  }
  popupHide() {
    let target = this.option.selector;
    if (!!target) {
      this.selector.classList.remove("motion");
      if ("beforeClose" in this.option) {
        this.option.beforeClose();
      }
      //remove
      this.selector.classList.remove("motion_end");
      setTimeout(() => {
        this.selector.classList.remove("active");
      }, 400);
      this.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
      this.dimCheck();
      if ("closeCallback" in this.option) {
        this.option.closeCallback();
      }
      if (this.design_popup_wrap_active.length == 1) {
        this.domHtml.classList.remove("touchDis");
      }
    }
  }
}






function posLayerEvent() {
  var posCallBtn = $("[data-poslayer]");
  var poslayer_z = $(".poslayer_z");

  $("body").append(poslayer_z);



  posCallBtn.on("click", function(e) {
    var $this = $(this),
      $t_t = $($this.attr("data-poslayer"));
    e.preventDefault();
    posLayerShow($t_t, $this);
  });
  poslayer_z.on("click", ".layerclose", function(e) {
    e.preventDefault();
    posLayerHide($(this).parents(".poslayer_z"));
  });

  $(document).on("click", ".btn_psubmit", function(e) {
    e.preventDefault();
    let thisParent = $(this).parents(".poslayer_z");
    let targetCols = $(`[data-poslayer='#${thisParent.attr("id")}']`);
    let activeItem = thisParent.find(".pclayer_vlist > li.active");
    let activeItemArray = [];
    activeItem.each(function(item) {
      activeItemArray.push($(this).text());
    });
    targetCols.find(".mv_form_text").html(activeItemArray.join(' '));
    targetCols.addClass("result_mode");
    console.log(thisParent.find(".pclayer_vlist > li.active"));
    posLayerHide(thisParent);
  });

  $(document).on("click", ".pcv_chk", function(e) {
    e.preventDefault();
    $(this).parents("li").siblings().removeClass("active");
    $(this).parents("li").addClass("active");
  });

  $(document).on("click", function(e) {
    if (!$(e.target).parents("[data-poslayer] , .poslayer_z , .layer_in_control").length && !$(e.target).is("[data-poslayer]") && !$(e.target).is(".layer_in_control")) {
      posLayerHide($(".poslayer_z.active"));
    }
  });
}

function posLayerShow(target, btn) {
  var poslayer_z = $(".poslayer_z");
  var target = $(target);

  $("body").append(target);
  poslayer_z.removeClass("active");
  target.addClass("active");
  posLayerPos(target, btn);
}

function posLayerResize() {
  var poslayer_z = $(".poslayer_z");
  if (poslayer_z.length) {
    poslayer_z.each(function() {
      posLayerResizeAction($(this));
    });
  }
}

function posLayerPos(target, btn) {
  var $target = $(target);
  var $target_tvitdep = $target.find(".tvitdep_vlist_wrap");
  var $target_tvitdep_pos = $target_tvitdep.length ? $target_tvitdep.offset().left : 0;
  var $target_tvitdep_wid = $target_tvitdep.length ? $target_tvitdep.outerWidth() : 0;
  var $targetWid = $target.length ? $target.outerWidth() : 0;
  var $btn = $(btn);
  var $btnIndex = $btn.index();
  var $btnPosTop = $btn.length ? $btn.offset().top : 0;
  var $btnPosHeight = $btn.length ? $btn.outerHeight() : 0;
  var $btnPosLeft = $btn.length ? $btn.offset().left : 0;
  var $btnWid = $btn.length ? $btn.outerWidth() : 0;
  var elseMargin = 0;
  $target.css({
    "top": "",
    "left": "",
    "right": "",
    "width": ""
  });
  /* if ($targetWid + $btnPosLeft > $(window).width()){
		$target.css({
			"top": $btnPosTop + $btnPosHeight + 10,
			"left": "auto",
			"right" : 20,
      "width" : $btnWid
		});
	}else{
		$target.css({
			"top": $btnPosTop + $btnPosHeight + 10,
			"left": $btnPosLeft,
      "width" : $btnWid
		});
	} */
  $target.css({
    "top": $btnPosTop + $btnPosHeight + 10,
    "left": $btnPosLeft,
    "width": $btnWid
  });
}

function posLayerResizeAction(target) {
  var $target = $(target);
  var $target_tvitdep = $target.find(".tvitdep_vlist_wrap");
  var $target_tvitdep_pos = $target_tvitdep.length ? $target_tvitdep.offset().left : 0;
  var $target_tvitdep_wid = $target_tvitdep.length ? $target_tvitdep.outerWidth() : 0;
  var $targetWid = $target.length ? $target.outerWidth() : 0;
  var $btn = $("[data-poslayer='#" + $target.attr("id") + "']");
  var $btnIndex = $btn.index();
  var $btnPosTop = $btn.length ? $btn.offset().top : 0;
  var $btnPosHeight = $btn.length ? $btn.outerHeight() : 0;
  var $btnPosLeft = $btn.length ? $btn.offset().left : 0;
  var $btnWid = $btn.length ? $btn.outerWidth() : 0;
  $target.css({
    "top": "",
    "left": "",
    "right": "",
    "width": ""
  });
  /* if ($targetWid + $btnPosLeft > $(window).width()) {
		$target.css({
			"top": $btnPosTop + $btnPosHeight + 10,
			"left": "auto",
			"right": 20,
      "width" : $btnWid
		});
	} else {
		$target.css({
			"top": $btnPosTop + $btnPosHeight + 10,
			"left": $btnPosLeft,
      "width" : $btnWid
		});
	} */
  $target.css({
    "top": $btnPosTop + $btnPosHeight + 10,
    "left": $btnPosLeft,
    "width": $btnWid
  });
}

function posLayerHide(target) {
  var target = $(target) || target;
  target.removeClass("active");
}