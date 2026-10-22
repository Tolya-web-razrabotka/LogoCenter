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
});
