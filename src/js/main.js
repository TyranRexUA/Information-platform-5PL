//====================== PRELOAD IMAGES =================================

const imgSliderArray = [];
for (let i = 1; i<=14; i++) {
    imgSliderArray.push(`url(img/slider/${i}.jpg)`);
}

$(".preload__img").css('background', imgSliderArray.join(', '));

// ===================== SLIDER ======================================

let imgNumber = 1;

setInterval(() => {
    imgNumber++;
    if (imgNumber > 14) {
        imgNumber = 1;
    }

    //$('.slider img').attr('src', `img/slider/${imgNumber}.jpg`);
    $('.slider__content').css('background-image', `url(img/slider/${imgNumber}.jpg)`);
}, 5000)

//============================= ACCORDION =============================

$('.accordion__item').on('click', function (event) {
    if ($(this).children('.accordion__content').is(':visible')) {
        $(this).removeClass('activeItem');
        $(this).children('.accordion__content').slideUp(1000);
    } else {
        $('.activeItem').removeClass('activeItem');
        $('.accordion__content').slideUp(1000);

        $(this).addClass('activeItem');
        $(this).children('.accordion__content').slideDown(1000);
    }
})
