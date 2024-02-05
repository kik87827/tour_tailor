function mvSlider() {
  const mv_slide = document.querySelectorAll(".mv_swiper_contianer .swiper-slide");
  const mv_tab = document.querySelectorAll(".mv_tab_list_wrap .mv_tab");
  if (!mv_slide) {
    return;
  }
  let mvSwiper = new Swiper(".mv_swiper_contianer", {
    speed: 1000,
    loop: true,
    init: false,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    }
  });


  mvSwiper.on("init", () => {
    console.log('init');
  });

  mvSwiper.on("slideChange", () => {
    console.log('slideChange');
    mv_tab.forEach((item) => {
      item.classList.remove("active");
    });
    console.log(mvSwiper.realIndex);
    mv_tab[mvSwiper.realIndex].classList.add("active");
  });

  mv_tab.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      mv_tab.forEach((item) => {
        item.classList.remove("active");
      });
      e.currentTarget.classList.add("active");
      mvSwiper.slideTo(index + 1);
    });
  });

  mvSwiper.init();
}



function customerFunc() {
  const call_layer = document.querySelectorAll(".call_layer");
  const page_wrap = document.querySelector(".page_wrap");
  const customer_guide_layer_wrap = document.querySelectorAll(".customer_guide_layer_wrap");
  const btn_guide_layer_close = document.querySelectorAll(".btn_guide_layer_close");

  if (!!customer_guide_layer_wrap) {
    window.addEventListener("resize", () => {
      posLayer();
    });
    customer_guide_layer_wrap.forEach((item) => {
      const thisItem = item;

      page_wrap.append(thisItem);
    });
    posLayer();
  }

  function posLayer() {
    customer_guide_layer_wrap.forEach((item) => {
      const thisItem = item;
      const thisBtn = document.querySelector("[href='#" + thisItem.getAttribute("id") + "']");
      const thisParent = thisBtn.closest(thisBtn.dataset.callparent)

      thisItem.style.removeProperty("top", "left", "width");

      thisItem.style.top = window.scrollY + thisBtn.getBoundingClientRect().top + thisBtn.getBoundingClientRect().height + 10 + "px";
      thisItem.style.left = thisParent.getBoundingClientRect().left + "px";
      thisItem.style.width = thisParent.getBoundingClientRect().width + "px";
    });
  }
  if (!!call_layer) {
    call_layer.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const thisItem = e.currentTarget;
        const thisTarget = document.querySelector(thisItem.getAttribute("href"));

        customer_guide_layer_wrap.forEach((item) => {
          const thisItem = item;
          item.classList.remove("active");
        });
        if (!!thisTarget) {
          thisTarget.classList.toggle("active");
        }
      });
    })
  }
  if (!!btn_guide_layer_close) {
    btn_guide_layer_close.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const thisItem = e.currentTarget;
        const thisParent = thisItem.closest(".customer_guide_layer_wrap");
        thisParent.classList.remove("active");
      })
    });
    document.querySelector("body").addEventListener("click", (e) => {
      if (!e.target.closest(".customer_guide_layer_wrap , .call_layer")) {
        customer_guide_layer_wrap.forEach((item) => {
          item.classList.remove("active");
        });
      }
    });
  }
}


function flowBanner() {
  let flow_obj = null;
  const flow_wrap = document.querySelector(".flow-container");
  const flow_slide = flow_wrap.querySelectorAll(".swiper-slide");
  if (flow_slide.length > 1) {
    flow_obj = new Swiper(".flow-container", {
      speed: 1000,
      loop: true,
      spaceBetween: 11,
      slidesPerGroup: 1,
      slidesPerView: 7,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: '.flow_banner_wrap .btn_flow_control.next',
        prevEl: '.flow_banner_wrap .btn_flow_control.prev',
      }
    });
  }
}