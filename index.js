function generateHueChooserBackground() {
	let backgroundGradient = '-webkit-linear-gradient(left, '
	for (let i = 10; i < 370; i += 10) {
		backgroundGradient += `hsla(${i}, 100%, 50%, 1),`
	}
	backgroundGradient = backgroundGradient.substring(0, backgroundGradient.length - 1)
	backgroundGradient += ');'
	return backgroundGradient
}

customElements.define('simple-colorpicker', class extends HTMLElement {

	constructor() {
		super()

		this.attachShadow({
			mode: 'open'
		})

		this.type = "hsla"
		this.hslValue = {
			hue: 0,
			saturation: 100,
			lightness: 50,
			alpha: 1
		}

		const width = this.getAttribute('width') || 100
		const height = this.getAttribute('height') || 100
		const paletteStyle = `width: ${width}px; height: ${height}px`
		const backgroundHue = generateHueChooserBackground()

		const template = document.createElement('template')
		template.innerHTML = `
			<link rel="stylesheet" href="index.css">
			<div class="color-picker-container" style="${paletteStyle}">
				<div class="palette-container">
					<div class="palette-main">
						<div class="palette-saturation" id="saturation-lightness-container">
							<div class="palette-lightness"></div>
							<div class="palette-chooser" id="saturation-lightness-chooser"></div>
						</div>
					</div>
				</div>
				<div class="hue-container">
					<div class="hue-chooser" id="hue-slider" style="background: ${backgroundHue}">
						<span class="hue-handler"></span>
					</div>
				</div>
				<div class="aplha-container">
					<div class="alpha-chooser" id="alpha-slider" style="background:linear-gradient(to right, rgba(146, 114, 114, 0) 0%, rgb(146, 114, 114) 100%);">
						<span class="alpha-handler"></span>
					</div>
				</div>
				<div class="color-result">
					<div class="result-hsla">
						<div class="hsla-value" id="hsla-value">
							${this.generateHslaString()}
						</div>
						<div>HSLA</div>
					</div>
				</div>
			</div>
		`

		this.shadowRoot.appendChild(
			template.content.cloneNode(true)
		)
	}

	connectedCallback() {
		this.initHorizontalSlider('hue-slider', 'hue')
		this.initHorizontalSlider('alpha-slider', 'alpha')
		this.initSaturationLightnessChooser()
	}

	initHorizontalSlider(name, value) {
		const range = this.shadowRoot.getElementById(name)
		const dragger = range.children[0]
		const draggerWidth = 22
		let down = false
		let rangeWidth
		let rangeLeft

		dragger.style.width = `${draggerWidth}px`
		dragger.style.left = `${-draggerWidth}px`
		dragger.style.marginLeft = `${(draggerWidth / 2)}px`

		range.addEventListener('mousedown', e => {
			rangeWidth = this.offsetWidth
			rangeLeft = this.offsetLeft
			down = true
			updateDragger(e)
			return false
		})

		range.addEventListener('mousemove', e => {
			updateDragger(e)
		})

		range.addEventListener('mouseup', () => {
			down = false
		})

		const updateDragger = (e) => {
			if (down && e.pageX >= rangeLeft && e.pageX <= (rangeLeft + rangeWidth)) {
				const hue = e.pageX - rangeLeft
				this.hslValue[value] = parseInt(parseInt((hue / rangeWidth) * 100) * 3.6)
				this.updateHslaView()
				dragger.style.left = `${hue - draggerWidth}px`
			}
		}
	}

	initSaturationLightnessChooser() {
		// TODO: rewrite all sliders to one approach
		const container = this.shadowRoot.getElementById('saturation-lightness-container')
		const dragCircle = this.shadowRoot.getElementById('saturation-lightness-chooser')
		let active = false
		let currentX
		let currentY
		let initialX
		let initialY
		let xOffset = 0
		let yOffset = 0

		const dragStart = (e) => {
			if (e.type === "touchstart") {
				initialX = e.touches[0].clientX - xOffset
				initialY = e.touches[0].clientY - yOffset
			} else {
				initialX = e.clientX - xOffset
				initialY = e.clientY - yOffset
			}

			if (e.target === dragCircle) {
				active = true
			}
		}

		const dragEnd = () => {
			initialX = currentX
			initialY = currentY

			active = false
		}

		const drag = (e) => {
			if (active) {
				e.preventDefault()
				const dragAreaWidth = container.clientWidth
				const dragAreaHeight = container.clientHeight

				if (e.type === "touchmove") {
					currentX = e.touches[0].clientX - initialX
					currentY = e.touches[0].clientY - initialY
				} else {
					currentX = e.clientX - initialX
					currentY = e.clientY - initialY
				}

				xOffset = currentX
				yOffset = currentY

				this.hslValue.saturation = parseInt(parseInt((xOffset / dragAreaWidth) * 100))
				this.hslValue.lightness = parseInt(parseInt((yOffset / dragAreaHeight) * 100))
				setTranslate(currentX, currentY, dragCircle)
				this.updateHslaView()
			}
		}

		const setTranslate = (xPos, yPos, element) => {
			element.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)"
		}

		container.addEventListener("touchstart", dragStart, false)
		container.addEventListener("touchend", dragEnd, false)
		container.addEventListener("touchmove", drag, false)

		container.addEventListener("mousedown", dragStart, false)
		container.addEventListener("mouseup", dragEnd, false)
		container.addEventListener("mousemove", drag, false)
	}

	generateHslaString() {
		return `hsla(${this.hslValue.hue}, ${this.hslValue.saturation}%, ${this.hslValue.lightness}%, ${this.hslValue.alpha} )`
	}

	updateHslaView() {
		const hslaElement = this.shadowRoot.getElementById('hsla-value')
		hslaElement.innerHTML = this.generateHslaString()
	}
});