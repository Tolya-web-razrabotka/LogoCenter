$(document).ready(function () {

	// Бургер-меню

	function openMenu() {
		$('body').addClass('menuOpen');
	}
	function closeMenu() {
		$('body').removeClass('menuOpen');
	}
	$('.headerBurger').on('click', openMenu);
	$('.mobileMenuClose, .mobileMenuOverlay, .mobileMenuNav a').on('click', closeMenu);
	$(document).on('keydown', function (e) {
		if (e.key === 'Escape') closeMenu();
	});
	$(window).on('resize', function () {
		if ($(window).width() > 1279) closeMenu();
	});

	// Слайдеры техники и материалов

	$('.cardsSliderWrap').each(function () {
		var $slider = $(this).find('.cardsSlider');
		$(this).find('.cardsSliderPrev').on('click', function () {
			$slider.slick('slickPrev');
		});
		$(this).find('.cardsSliderNext').on('click', function () {
			$slider.slick('slickNext');
		});
	});

	$('.cardsSlider').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		infinite: true,
		speed: 400,
		arrows: false,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 601,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
});
