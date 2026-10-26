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

	// Выпадающий список услуг

	$('.requestFormSelect').each(function () {
		var $wrap = $(this).addClass('isCustom');
		var $select = $wrap.find('select').attr('tabindex', '-1');
		var $btn = $('<button type="button" class="requestFormSelectBtn" aria-haspopup="listbox" aria-expanded="false"><span></span></button>');
		var $list = $('<ul class="requestFormSelectList" role="listbox"></ul>');

		$select.find('option').each(function (i) {
			if ($(this).is(':disabled')) return;
			$('<li class="requestFormSelectOption" role="option"></li>')
				.text($(this).text())
				.attr('data-index', i)
				.appendTo($list);
		});
		$wrap.append($btn, $list);

		var $options = $list.children();

		function render() {
			var $current = $select.find('option:selected');
			$btn.find('span').text($current.text());
			$btn.toggleClass('isPlaceholder', $current.is(':disabled'));
			$options.removeClass('isSelected').attr('aria-selected', 'false')
				.filter('[data-index="' + $current.index() + '"]').addClass('isSelected').attr('aria-selected', 'true');
		}
		function setActive($option) {
			$options.removeClass('isActive');
			$option.addClass('isActive');
		}
		function open() {
			$('.requestFormSelect.isOpen').not($wrap).each(function () {
				$(this).removeClass('isOpen').find('.requestFormSelectBtn').attr('aria-expanded', 'false');
			});
			$wrap.addClass('isOpen');
			$btn.attr('aria-expanded', 'true');
			var $selected = $options.filter('.isSelected');
			setActive($selected.length ? $selected : $options.first());
		}
		function close() {
			$wrap.removeClass('isOpen');
			$btn.attr('aria-expanded', 'false');
		}
		function choose($option) {
			$select.prop('selectedIndex', $option.data('index')).trigger('change');
			render();
			close();
			$btn.trigger('focus');
		}

		$btn.on('click', function () {
			$wrap.hasClass('isOpen') ? close() : open();
		});
		$options.on('click', function () {
			choose($(this));
		}).on('mouseenter', function () {
			setActive($(this));
		});
		$wrap.on('keydown', function (e) {
			var isOpen = $wrap.hasClass('isOpen');
			var $active = $options.filter('.isActive');
			if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
				e.preventDefault();
				if (!isOpen) return open();
				var $next = e.key === 'ArrowDown' ? $active.next() : $active.prev();
				if ($next.length) setActive($next);
			} else if ((e.key === 'Enter' || e.key === ' ') && isOpen) {
				e.preventDefault();
				if ($active.length) choose($active);
			} else if (e.key === 'Escape' && isOpen) {
				e.stopPropagation();
				close();
				$btn.trigger('focus');
			} else if (e.key === 'Tab') {
				close();
			}
		});
		$(document).on('click', function (e) {
			if (!$wrap.is(e.target) && !$wrap.has(e.target).length) close();
		});

		render();
	});
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
