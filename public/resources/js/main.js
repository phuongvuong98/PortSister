(function ($) {
    "use strict";
  
    /*[ Back to top ]
    ===========================================================*/
    var windowH = $(window).height()/2;
  
    $(window).on('scroll',function(){
        if ($(this).scrollTop() > windowH) {
            $("#myBtn").css('display','flex');
        } else {
            $("#myBtn").css('display','none');
        }
    });
  
    $('#myBtn').on("click", function(){
        $('html, body').animate({scrollTop: 0}, 300);
    });
    
    /*==================================================================
    [ Show modal1 ]*/
    $('.js-show-modal1').on('click',function(e){
        e.preventDefault();
        $('.js-modal1').addClass('show-modal1');
    });
  
    $('.js-hide-modal1').on('click',function(){
        $('.js-modal1').removeClass('show-modal1');
    });

  })(jQuery);
  