$(document).ready(function(){
    
    // Initialisation Fullpage Plugin
    $('#fullpage').fullpage({
        sectionsColor: ['#dcdcdc', '#1a8295', '#C63D0F', '#297e0b', '#e0b800', '#aa012d', '#302c79', '#f4f4f4'],
        navigation: true,
        navigationPosition: 'right',
        responsiveWidth: 900
    });
    
    // Set active-Class & Animation to next step
    $('section label').click(function(){
        
        // Jump to next Selection
        setTimeout('$.fn.fullpage.moveSectionDown()',600);
        
        // Active Highlighting
        $(this).parent().parent().find('label').css('opacity',0.25).removeClass('active');
        $(this).addClass('active');
        
        // Disable "CalcResult" content
        $('#calcResult').hide();
        $('.errorBox').removeClass('active')

    });
    
    
    // Sections complete, start calculating
    $('#calculateNow').click(function(){
        
        // check if all radio-buttons are checked, if not make error
        if ($('.sectionWithQuestion:not(:has(:radio:checked))').length) {
            var allDone = false;
            
            // find first error and scroll up to it
            var target_top = $('.sectionWithQuestion:not(:has(:radio:checked)):first').offset().top;
            $('html, body').animate({scrollTop:target_top}, 300);
            
        }
        else{
            var allDone = true;
        }
        
        // All Done - No Error
        if(allDone){
            // set score-points:
            var points = 0;

            $('.sectionWithQuestion').each(function(){
                points += parseInt($(this).find('input[type=radio]:checked').val());
            })
            
            $('#calculateNow').addClass('loading');
            $('#calcResult').html('Deine Freundin ist '+points+' Kamele wert!<br><br>').addClass('active');

            for(var i = 0; i < points; i++){
                $('#calcResult').append('<img src="img/img_result_animal.png">');
            }
            
            // Simulate Loading-Animation
            setTimeout(function(){
                $('#calcResult').fadeIn();
                $('#calculateNow').removeClass('loading');
            },800)
            
            
            
        }
        else{
            // Delete Result-Content, Activate Error-Box
            $('#calcResult').html('');
            $('.errorBox').addClass('active')
        }
    });
})