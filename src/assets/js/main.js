function mvSlider(){
    const mv_slide = document.querySelectorAll(".mv_swiper_contianer .swiper-slide");
    const mv_tab = document.querySelectorAll(".mv_tab_list_wrap .mv_tab");
    if(!mv_slide){return;}
    let mvSwiper = new Swiper(".mv_swiper_contianer",{
        speed : 1000,
        loop : true,
        init : false,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        }
    });

    
    mvSwiper.on("init",()=>{
        console.log('init');
    });
    
    mvSwiper.on("slideChange",()=>{
        console.log('slideChange');
        mv_tab.forEach((item)=>{
            item.classList.remove("active");
        });
        console.log(mvSwiper.realIndex);
        mv_tab[mvSwiper.realIndex].classList.add("active");
    });

    mv_tab.forEach((item,index)=>{
        item.addEventListener("click",(e)=>{
            e.preventDefault();
            mv_tab.forEach((item)=>{
                item.classList.remove("active");
            });
            e.currentTarget.classList.add("active");
            mvSwiper.slideTo(index+1);
        });
    });

    mvSwiper.init();
}