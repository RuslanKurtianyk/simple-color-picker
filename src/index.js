import jssSheets from './jss'

window.customElements.define('simple-colorpicker', class extends HTMLElement {

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

		const { classes } = jssSheets.registry[0]
		const style = jssSheets.toString()
		const template = document.createElement('template')

		template.innerHTML = `
			<div class=${classes.colorPickerContainer} style="${paletteStyle}">
				<div class=${classes.paletteContainer}>
					<div class="${classes.palette} ${classes.paletteMain}">
						<div class="${classes.palette} ${classes.paletteSaturation}" id="saturation-lightness-container">
							<div class="${classes.palette} ${classes.paletteLightness}"></div>
							<div class=${classes.paletteChooser} id="saturation-lightness-chooser"></div>
						</div>
					</div>
				</div>
				<div class="${classes.settingsContainer}">
					<div class=${classes.sliderContainer}>
						<div class="${classes.sliderChooser} ${classes.hueChooser}" id="hue-chooser">
							<input class=${classes.slider} id="hue-handler" type="range" min="0" max="360" value="${this.hslValue.hue}">
						</div>
					</div>
					<div class=${classes.sliderContainer}>
						<div class="${classes.sliderChooser} ${classes.alphaChooser}" id"="alpha-chooser">
							<input class=${classes.slider} id="alpha-handler" type="range" min="0" max="1" step="0.01" value="${this.hslValue.alpha}">
						</div>
					</div>
					<div class=${classes.colorResult}>   
						<div class="result-hsla">
							<div class=${classes.hslaValue} id="hsla-value">
								${this.generateHslaString()}
							</div>
							<div>HSLA</div>
						</div>
					</div>
				</div>
			</div>
			<style>${style}<style>
		`
		this.shadowRoot.appendChild(
			template.content.cloneNode(true)
		)
	}

	connectedCallback() {
		this.initAlphaListener()
		this.initHueListener()
		this.initSaturationLightnessChooser()
	}

	initAlphaListener() {
		const alphaRange = this.shadowRoot.querySelector('#alpha-handler')
		alphaRange.addEventListener('input', () => {
			this.hslValue.alpha = alphaRange.value
			this.updateHslaView()
		}, false)
	}

	initHueListener() {
		const hueRange = this.shadowRoot.querySelector('#hue-handler')
		hueRange.addEventListener('input', () => {
			this.hslValue.hue = hueRange.value
			this.updateHslaView()
		}, false)
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
			if (e.type === 'touchstart') {
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

				if (e.type === 'touchmove') {
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
			element.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`
		}

		container.addEventListener('touchstart', dragStart, false)
		container.addEventListener('touchend', dragEnd, false)
		container.addEventListener('touchmove', drag, false)

		container.addEventListener('mousedown', dragStart, false)
		container.addEventListener('mouseup', dragEnd, false)
		container.addEventListener('mousemove', drag, false)
	}

	generateHslaString() {
		return `hsla(${this.hslValue.hue}, ${this.hslValue.saturation}%, ${this.hslValue.lightness}%, ${this.hslValue.alpha} )`
	}

	updateHslaView() {
		const hslaElement = this.shadowRoot.getElementById('hsla-value')
		hslaElement.innerHTML = this.generateHslaString()
	}
});