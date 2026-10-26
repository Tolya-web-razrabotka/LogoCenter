$(document).ready(function () {

	// Фиксированная шапка

	var $header = $('.header');
	function toggleHeader() {
		$header.toggleClass('headerFixed', $(window).scrollTop() > 10);
	}
	$(window).on('scroll', toggleHeader);
	toggleHeader();

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

	var sliderMaxSlides = 4;

	$('.cardsSliderWrap').each(function () {
		var $wrap = $(this);
		var $slider = $wrap.find('.cardsSlider');
		var $items = $slider.children('.cardsSliderItem');

		// Пока карточек не больше, чем помещается на экран, slick не листает —
		// дублируем набор, чтобы карусель крутилась по кругу
		if ($items.length && $items.length <= sliderMaxSlides) {
			$items.clone().addClass('cardsSliderItemClone').appendTo($slider);
		}

		$slider.slick({
			slidesToShow: sliderMaxSlides,
			slidesToScroll: 1,
			infinite: true,
			speed: 400,
			arrows: false,
			draggable: true,
			swipe: true,
			swipeToSlide: true,
			touchThreshold: 8,
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

		$wrap.find('.cardsSliderPrev').on('click', function () {
			$slider.slick('slickPrev');
		});
		$wrap.find('.cardsSliderNext').on('click', function () {
			$slider.slick('slickNext');
		});
	});
});
