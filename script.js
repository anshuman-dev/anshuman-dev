$(document).ready(function(){
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        //if(this.scroll > 500){
        //    $('.scroll-up-btn').addClass("show");
        //}else{
        //    $('.scroll-up-btn').removeClass("show");
        //}
    });

    //$('.scroll-up-btn').click(function(){
    //   $('html').animate({scrollTop: 0});
    //});

    //Type animation
    //var Typed = new Typed(".typing",{
    //    strings: ["Programmer","Space Enthusiast", "Blogger", "Freelancer"],
    //    typeSpeed: 100,
    //    backSpeed: 60,
    //    loop: True
    //});

    //toggle menu/navbar
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
        
    });
});