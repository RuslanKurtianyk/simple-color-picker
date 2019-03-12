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

		const width = this.getAttribute('width') || null
		const height = this.getAttribute('height') || null
		const paletteStyle = `width: ${width}px; height: ${height}px`
		const backgroundHue = generateHueChooserBackground()

		const template = document.createElement('template')
		template.innerHTML = `
			<link rel="stylesheet" href="index.css">
			<div class="color-picker-container" style="${paletteStyle}">
				<div class="palette-container">
					<div class="palette-main">
						<div class="palette-saturation">
							<div class="palette-lightness"></div>
							<div class="palette-chooser"></div>
						</div>
					</div>
				</div>
				<div class="hue-container">
					<div class="hue-chooser" id="hue-slider" style="background: ${backgroundHue}">
						<span class="hue-handler"></span>
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
		this.initHueSlider()
	}

	initHueSlider() {
		const hslaElement = this.shadowRoot.getElementById('hsla-value')
		const range = this.shadowRoot.getElementById('hue-slider')
		const dragger = range.children[0]
		const draggerWidth = 22
		let hueValue = this.hslValue.hue
		let	down = false
		let	rangeWidth
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
				this.hslValue.hue = parseInt(parseInt((hue / rangeWidth) * 100) * 3.6)
				hslaElement.innerHTML = this.generateHslaString()
				dragger.style.left = `${hue - draggerWidth}px`
			}
		}
	}

	generateHslaString() {
		return `hsla(${this.hslValue.hue}, ${this.hslValue.saturation}%, ${this.hslValue.lightness}%, ${this.hslValue.alpha} )`
	}
});
