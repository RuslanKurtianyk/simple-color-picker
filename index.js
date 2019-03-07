function generateHueChooserBackground() {
    let backgroundGradient = "-webkit-linear-gradient(left, "
    for (let i = 10; i < 370; i += 10) {
        backgroundGradient += `hsla(${i}, 100%, 50%, 1),`
	}
	backgroundGradient = backgroundGradient.substring(0, backgroundGradient.length - 1)
    backgroundGradient += ");"
    return backgroundGradient
}

customElements.define('simple-colorpicker', class extends HTMLElement {
	constructor() {
		super()
		
		this.attachShadow({
			mode: 'open'
		})

		const width = this.getAttribute('width') || null
		const height = this.getAttribute('height') || null
		const paletteStyle = `width: ${width}px; height: ${height}px`
		const backgroundHue = generateHueChooserBackground()

		const template = document.createElement('template')
		template.innerHTML = `
			<link rel="stylesheet" href="index.css">
			<div class="color-picker-container" style="${paletteStyle}">
				<div class="palette-container">Here will be palette</div>
				<div class="hue-container">
					<div class="hue-chooser" id="hue-slider" style="background: ${backgroundHue}">
						<span class="hue-handler"></span>
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
		const range = this.shadowRoot.getElementById('hue-slider')
		const dragger = range.children[0]
		const draggerWidth = 20
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

		document.addEventListener('mousemove', e => {
			updateDragger(e)
		})

		document.addEventListener('mouseup', () => {
			down = false
		})

		function updateDragger(e) {
			if (down && e.pageX >= rangeLeft && e.pageX <= (rangeLeft + rangeWidth)) {		
				dragger.style.left = `${e.pageX - rangeLeft - draggerWidth}px`
			}
		}
	}
});
