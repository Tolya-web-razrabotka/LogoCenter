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
		if (e.key === 'Escape') {
			closeMenu();
			closeModal();
		}
	});

	// Модалка обратной связи

	var $modal = $('.callbackModal');
	var $lastToggle = null;

	function openModal($toggle) {
		$lastToggle = $toggle;
		closeMenu();
		$('body').addClass('modalOpen');
		$modal.attr('aria-hidden', 'false');
		setTimeout(function () {
			$modal.find('.requestFormInput').first().trigger('focus');
		}, 400);
	}
	function closeModal() {
		if (!$('body').hasClass('modalOpen')) return;
		$('body').removeClass('modalOpen');
		$modal.attr('aria-hidden', 'true');
		if ($lastToggle) $lastToggle.trigger('focus');
	}
	$(document).on('click', '.callback-toggle', function (e) {
		e.preventDefault();
		openModal($(this));
	});
	$('.callbackModalClose, .callbackModalOverlay').on('click', closeModal);
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
