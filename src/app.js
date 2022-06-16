import './css/style.scss';
import 'jquery';

$('.cards__item').on('click', function(event){
    $(this).toggleClass('active');
    if (!$(this).data('status')) {
        $(this).children('.cards__item-desc').html('Печень утки разварная с артишоками.');
        $(this).data('status', true);
    }
    else {
        $(this).children('.cards__item-desc').html('');
        $(this).children('.cards__item-desc').append('<span>Чего сидишь? Порадуй котэ, <a href="##" class="cards__item-desc-link">купи.</a></span>');
        $(this).data('status', false);
    }
});

