const cards = document.querySelectorAll('.cards')

function autoSlider(card, slides, dots, arrows) {
	let cardLength = card.querySelectorAll('.card__slide').length
	if (card.classList.contains('auto')) {
		// Проверка является ли активный слайд поумолчанию первым либо последним
		arrowEndDelOrAdd(numberActiveElement(slides), slides, arrows)
		setInterval(() => {
			let activeSlide = numberActiveElement(slides) + 1
			clearActiveClasses(slides, dots)
			arrowEndDelOrAdd(activeSlide, slides, arrows)
			// Если слайд не последний
			if (activeSlide < cardLength) {
				slides[activeSlide].classList.add('_active')
				if (dots !== undefined) {
					dots[activeSlide].classList.add('_active')
				}
			} // Если слайд последний, то последующая итерация сделает активными все первые элементы
			else if (activeSlide === cardLength) {
				slides[0].classList.add('_active')
				if (arrows !== undefined) {
					arrows[0].classList.add('_end')
				}
				if (dots !== undefined) {
					dots[0].classList.add('_active')
				}
			}
		}, 3000);
	}
}

// Добавляем стрелки, если они нужны
function arrowsAdd(card) {
	// Есть ли класс "arrows"
	if (card.classList.contains('arrows')) {
		// Добавить левую стрелку
		let arrowDivLeft = document.createElement('div')
		arrowDivLeft.innerHTML = `<img src="./img/arrow-left.png" alt="">`
		arrowDivLeft.classList.add('cards__arrow-left', 'cards__arrow')
		card.prepend(arrowDivLeft)
		
		// Добавить правую стрелку
		let arrowDivRight = document.createElement('div')
		arrowDivRight.innerHTML = `<img src="./img/arrow-right.png" alt="">`
		arrowDivRight.classList.add('cards__arrow-right', 'cards__arrow')
		card.append(arrowDivRight)
	}
}

// Добавляем точки, если они нужны
function dotsAdd(card, activeSlideIndex) {
	// Есть ли класс "dots"
	if (card.classList.contains('dots')) {
		// Количество слайдов
		const cardLength = card.querySelectorAll('.card__slide').length
		// Родитель
		let dotsDiv = document.createElement('div')
		dotsDiv.classList.add('_dots')
		// Добавляем в слайдер
		card.querySelector('.cards__container').append(dotsDiv)
		// Добавляем в dots точки
		for (let i = 0; i < cardLength; i++) {
			// Дети
			let dotDiv = document.createElement('div')
			dotDiv.classList.add('dot')
			// Добавляем к точке класс "_active", если её индекс равняется индексу активного слайда
			if (activeSlideIndex === i) {
				dotDiv.classList.add('_active')
			}
			card.querySelector('._dots').appendChild(dotDiv)
		}
	}
}

// Ищет активный слайд и возвращает его индекс
function numberActiveElement(arrSlides) {
	for (let i = 0; i < arrSlides.length; i++) {
		if (arrSlides[i].classList.contains('_active')) {
			return i
		}
	}
}

// Удаляет "_active"
function clearActiveClasses(slides, dots) {
	slides.forEach((slide) => {
		slide.classList.remove('_active')
	})
	if (dots !== undefined) {
		dots.forEach((dot) => {
			dot.classList.remove('_active')
		})
	}
}

// Удаляет у стрелок класс "_end" в случае, когда он уже не нужен
function arrowEndDelOrAdd(active, slides, arrows) {
	if (arrows !== undefined) {
		// Если 1 слайд
		active === 0 ? arrows[0].classList.add('_end') : arrows[0].classList.remove('_end')
		// Если последний слайд
		active === slides.length - 1 ? arrows[1].classList.add('_end') : arrows[1].classList.remove('_end')
	}
}

function sliders(card, slides) {
	let arrows
	// Если есть стрелки
	if (card.classList.contains('arrows')) {
		let cardLength = card.querySelectorAll('.card__slide').length
		const arrowLeft = card.querySelector('.cards__arrow-left')
		const arrowRight = card.querySelector('.cards__arrow-right')
		arrows = [arrowLeft, arrowRight]
		// По клику на стрелку
		// Левая стрелка
		arrowLeft.addEventListener('click', () => {
			let activeSlideIndex = numberActiveElement(slides);
			activeSlideIndex--
			if (activeSlideIndex >= 0) {
				clearActiveClasses(slides, dots)
				slides[activeSlideIndex].classList.add('_active')
				dots[activeSlideIndex].classList.add('_active')
			}
			// Если 1 слайд
			if (activeSlideIndex === 0) {
				arrowLeft.classList.add('_end')
			}
			// Если дошло до конца и нажали на противоположную стрелку
			if (arrowRight.classList.contains('_end')) {
				arrowRight.classList.remove('_end')
			}
		})
		// Правая стрелка
		arrowRight.addEventListener('click', () => {
			let activeSlideIndex = numberActiveElement(slides);
			activeSlideIndex++
			if (activeSlideIndex < cardLength) {
				clearActiveClasses(slides, dots)
				slides[activeSlideIndex].classList.add('_active')
				dots[activeSlideIndex].classList.add('_active')
			}
			// Если последний слайд
			if (activeSlideIndex === cardLength - 1) {
				arrowRight.classList.add('_end')
			}
			// Если дошло до конца и нажали на противоположную стрелку
			if (arrowLeft.classList.contains('_end')) {
				arrowLeft.classList.remove('_end')
			}
		})
	}
	let dots
	// Есть ли есть точки
	if (card.classList.contains('dots')) {
		dots = card.querySelectorAll('.dot')
		dots.forEach((dot) => {
			dot.addEventListener('click', () => {
				clearActiveClasses(slides, dots)
				dot.classList.add('_active')
				let activeSlideIndex = numberActiveElement(dots);
				slides[activeSlideIndex].classList.add('_active')
				arrowEndDelOrAdd(activeSlideIndex, slides, arrows)
			})
		})
	}
	if (card.classList.contains('auto')) {
		autoSlider(card, slides, dots, arrows)
	}
	// Проходимся по всем слайдам
	slides.forEach((slide) => {
		// По клику на слайд
		slide.addEventListener('click', () => {
			clearActiveClasses(slides, dots)
			slide.classList.add('_active')
			if (arrows !== undefined) {
				arrowEndDelOrAdd(numberActiveElement(slides), slides, arrows)
			}
			if (dots !== undefined) {
				dots[numberActiveElement(slides)].classList.add('_active')
			}
		})
	})
	
}

function createSlider(card) {
	const slides = card.querySelectorAll('.card__slide')
	let activeSlideIndex = numberActiveElement(slides)
	arrowsAdd(card)
	dotsAdd(card, activeSlideIndex)
	sliders(card, slides, activeSlideIndex)
}

cards.forEach(card => createSlider(card))