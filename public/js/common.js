"use strict";

var $ = jQuery;
var JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	body: document.querySelector("body"),
	modalCall: function modalCall() {
		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад" // PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"

				}
			}
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
		$.fancybox.defaults.backFocus = false;
	},
	// /magnificPopupCall
	toggleMenu: function toggleMenu() {
		var _this = this;

		if (_this.btnToggleMenuMobile) {
			_this.btnToggleMenuMobile.forEach(function (element) {
				element.addEventListener('click', function () {
					_this.btnToggleMenuMobile.forEach(function (element) {
						element.classList.toggle("on");
					});

					_this.menuMobile.classList.toggle("active");

					_this.body.classList.toggle("fixed");

					return false;
				});
			});
		}
	},
	closeMenu: function closeMenu() {
		var _this = this;

		if (_this.menuMobile) {
			_this.btnToggleMenuMobile.forEach(function (element) {
				element.classList.remove("on");
			});

			_this.menuMobile.classList.remove("active");

			_this.body.classList.remove("fixed");
		}
	},
	mobileMenu: function mobileMenu() {
		// закрыть/открыть мобильное меню
		var _this = this;

		if (_this.menuMobileLink) {
			_this.toggleMenu();

			document.addEventListener('mouseup', function (event) {
				var container = event.target.closest(".menu-mobile--js.active"); // (1)

				if (!container) {
					_this.closeMenu();
				}
			});
		}
	} // /mobileMenu

};

function eventHandler() {
	JSCCommon.modalCall();
	JSCCommon.mobileMenu(); // /закрыть/открыть мобильное меню

	function heightses() {
		var w = $(window).width();
		var topH = $("header ").innerHeight();
		$(window).scroll(function () {
			if ($(window).scrollTop() > topH) {
				$('.top-nav  ').addClass('fixed');
			} else {
				$('.top-nav  ').removeClass('fixed');
			}
		}); // конец добавил

		if (window.matchMedia("(min-width: 992px)").matches) {
			JSCCommon.closeMenu();
		}
	}

	$(window).resize(function () {
		heightses();
	});
	heightses(); // листалка по стр

	$(" .top-nav li a, .scroll-link").click(function () {
		var elementClick = $(this).attr("href");
		var destination = $(elementClick).offset().top;
		$('html, body').animate({
			scrollTop: destination
		}, 1100);
		return false;
	});

	function animateElem() {
		var _TimelineMax;

		var controller = new ScrollMagic.Controller(); // define movement of panels

		var wipeAnimation = (_TimelineMax = new TimelineMax()).fromTo.apply(_TimelineMax, arguments); // in from left
		// create scene to pin and link animation


		new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: "onLeave",
			duration: "100%"
		}) // .setPin("#sBrendRepresent")
		.setTween(wipeAnimation) // .addIndicators() // add indicators (requires plugin)
		.addTo(controller);
	} //axilary funcs


	animateElem.call("#headerBlock", '#artical', .1, {
		y: -80,
		x: -50
	}, {
		y: 100,
		x: 0
	});
	animateElem.call("#headerBlock", '#element--1', .1, {
		y: -80,
		x: -150
	}, {
		y: 100,
		x: 0
	});
	animateElem.call("#headerBlock", '#element--2', .1, {
		y: 80,
		x: 150
	}, {
		y: -50,
		x: -50
	}); // animateElem.call("#headerBlock", '#element--3', .1, { y: -80, x: -50 }, { y: 100, x: 0 });
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}