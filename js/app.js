const cards = document.querySelectorAll('.cards')

// Удаляет класс "_active"
function clearActiveClasses(slides, dots) {
	slides.forEach((slide) => {
		slide.classList.remove('_active')
	})
	dots.forEach((dot) => {
		dot.classList.remove('_active')
	})
}

// Номер елемента с классом"_active"
function numberActiveElement(el) {
	for (let i = 0; i < el.length; i++) {
		if (el[i].classList.contains('_active')) {
			return i
		}
	}
}

// Удаляет у стрелок класс "_end" в случае, когда он уже не нужен
function delArrowEnd(active, slides, arrows) {
	// Если 1 слайд
	active === 0 ? arrows[0].classList.add('_end') : arrows[0].classList.remove('_end')
	// Если последний слайд
	active === slides.length - 1 ? arrows[1].classList.add('_end') : arrows[1].classList.remove('_end')
}

function sliders(card, slides, arrows, dots) {
	// Проходимся по всем слайдам
	slides.forEach((slide) => {
		let dotsDiv = document.createElement('div')
		dotsDiv.classList.add('dot')
		card.querySelector('.dots').appendChild(dotsDiv)
		// По клику на слайд
		slide.addEventListener('click', () => {
			clearActiveClasses(slides, dots)
			slide.classList.add('_active')
			let numSlide = numberActiveElement(slides)
			dots[numSlide].classList.add('_active')
			delArrowEnd(numSlide, slides, arrows)
		})
	})
	dots = card.querySelectorAll('.dot')
	dots[numberActiveElement(slides)].classList.add('_active')
	// Проходимся по всем точкам
	dots.forEach((dot) => {
		// По клику на точку
		dot.addEventListener('click', () => {
			clearActiveClasses(slides, dots)
			dot.classList.add('_active')
			let numDot = numberActiveElement(dots)
			slides[numDot].classList.add('_active')
			delArrowEnd(numDot, slides, arrows)
		})
	})
	// По клику на стрелку
	// Левая стрелка
	arrows[0].addEventListener('click', () => {
		let numSlide = numberActiveElement(slides)
		if (numSlide - 1 !== -1) {
			clearActiveClasses(slides, dots)
			slides[numSlide - 1].classList.add('_active')
			dots[numSlide - 1].classList.add('_active')
		}
		// Если 1 слайд
		if (numSlide - 1 === 0) {
			arrows[0].classList.add('_end')
		}
		// Если дошло до конца и нажали на противоположную стрелку
		if (arrows[1].classList.contains('_end')) {
			arrows[1].classList.remove('_end')
		}
	})
	// Правая стрелка
	arrows[1].addEventListener('click', () => {
		let numSlide = numberActiveElement(slides)
		if (numSlide + 1 !== slides.length) {
			clearActiveClasses(slides, dots);
			slides[numSlide + 1].classList.add('_active')
			dots[numSlide + 1].classList.add('_active')
		}
		// Если последний слайд
		if (numSlide + 1 === slides.length - 1) {
			arrows[1].classList.add('_end')
		}
		// Если дошло до конца и нажали на противоположную стрелку
		if (arrows[0].classList.contains('_end')) {
			arrows[0].classList.remove('_end')
		}
	})
}

// Создать слайдер
function createSlider(card) {
	const slides = card.querySelectorAll('.card__slide')
	const arrows = card.querySelectorAll('.cards__arrow')
	let dots
	sliders(card, slides, arrows, dots)
}

cards.forEach(card => createSlider(card))