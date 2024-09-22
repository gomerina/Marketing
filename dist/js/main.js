$(document).ready(function () {
	window.scrollTo(0, 0);
	var filtersSlider = new Swiper(".filters-slider", {
		spaceBetween: 40,
		slidesPerView: 2,
		slidesPerGroup: 1,
		speed: 900,
		autoHeight: true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: ".swiper-pagination",
			type: "fraction",
		},
		breakpoints: {
			0: {
				slidesPerView: 1.1,
			},
			768: {
				slidesPerView: 2,
			},
		},
	});

	$(document).on("click", ".jsTabHead", function () {
		$(this).addClass("active").siblings().removeClass("active");
		let jqParent = $(this).closest(".jsTabParent");
		$(this).closest(".jsAside").find(".jsAsideText").text($(this).text());
		$(".jsAsideMobile, .jsAside").removeClass("active");
		if (jqParent.length) {
			jqParent
				.find(".jsTabBody")
				.eq($(this).index())
				.addClass("active")
				.siblings()
				.removeClass("active");
		} else {
			$(".jsTabBody")
				.eq($(this).index())
				.addClass("active")
				.siblings()
				.removeClass("active");
		}
	});
	$(document).on("click", ".jsTogglerHead", function () {
		$(this).toggleClass("active");
		$(this).next(".jsTogglerBody").slideToggle();
	});
	$(document).on("click", ".jsAnchorLink", function () {
		$(".jsAnchorLink").removeClass("current");
		$(this).addClass("current");
		$(".jsBurger, .jsMenu").removeClass("active");
		let anchor = $(this).attr("href");
		$("html, body").animate(
			{
				scrollTop: $(anchor).offset().top - 140,
			},
			600
		);
	});
	$(document).on("click", ".jsAnchorLogo", function () {
		$("html, body").animate(
			{
				scrollTop: 0,
			},
			600
		);
		return false;
	});
	$(document).on("click", ".jsOpenFrame", function (e) {
		let objButton = $(this);
		e.preventDefault();
		$.fancybox.open({
			src: objButton.data("url"),
			type: "iframe",
			opts: {
				touch: false,
				//afterLoad: function (instance, current) {
				//    let objSource = current.$content;
				//    objSource.find('.jsTel').inputmask({ "mask": "+7 (999) 999-99-99" });
				//},
			},
		});
	});

	$(document).on("click", ".jsAsideMobile", function () {
		$(this).toggleClass("active");
		$(this).closest(".jsAside").toggleClass("active");
	});
	$(document).on("click", ".jsBurger", function () {
		$(".jsBurger, .jsMenu").toggleClass("active");
	});

	if (!window.location.hash) {
		$(".jsAnchorLink").first().addClass("current");
	} else {
		$(".jsAnchorLink").each(function () {
			var $this = $(this);
			if (window.location.hash == $this.attr("href")) {
				$this.addClass("current");
			}
		});
		placeTimer()
		scrollNav()
		$("html, body").animate(
			{
				scrollTop: $(window.location.hash.replace('/', '')).offset().top - 140,
			},
			600
		);
		return false;
	}

	function placeTimer() {
		function declensionTime(value, words) {
			const cases = [2, 0, 1, 1, 1, 2];
			const output =
				words[
				value % 100 > 4 && value % 100 < 20 ? 2 : cases[Math.min(value % 10, 5)]
				];
			return output;
		}

		const targetDate = new Date("2024-09-25T09:00:00");
		function updateTimer() {
			const now = new Date();
			const remaining = targetDate - now;

			if (remaining <= 0) {
				console.log("Время вышло");
				clearInterval(timerInterval);
				$("#timer").remove();
				return;
			}

			const totalHours = Math.floor(remaining / (1000 * 60 * 60));
			const hours = totalHours % 24;
			const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

			const outputTimer = `
				<div class="timer__item hours"><span>${totalHours}</span> <p>${declensionTime(
				totalHours,
				["час", "часа", "часов"]
			)}</p></div>
				<div class="timer__item minutes"><span>${minutes}</span> <p>${declensionTime(
				minutes,
				["минута", "минуты", "минут"]
			)}</p></div>
			`;
			$("#timer .timer__row").html(outputTimer);
		}

		const timerInterval = setInterval(updateTimer, 1000);
		updateTimer();
	}

	function scrollNav() {
		window.addEventListener('scroll', () => {
			const sections = document.querySelectorAll('section');
			const navLinks = document.querySelectorAll('.jsAnchorLink');

			sections.forEach(section => {
				const rect = section.getBoundingClientRect();
				if (rect.top >= -50 && rect.top <= 150) {
					navLinks.forEach(link => {
						link.classList.remove('current');
						if (link.getAttribute('href').substring(1) === section.id) {
							link.classList.add('current');
							window.location.hash = '#' + '/' + section.id
						}
					});
				}
			});
		});
	}
	placeTimer()
	scrollNav()
});
