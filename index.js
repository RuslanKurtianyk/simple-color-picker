const generateHueChooserBackground = function() {
    let backgroundGradient = "-webkit-linear-gradient(left, ";
    for (let i = 10; i < 370; i += 10) {
        backgroundGradient += `hsla(${i}, 100%, 50%, 1),`
	}
	backgroundGradient = backgroundGradient.substring(0, backgroundGradient.length - 1);
    backgroundGradient += ");";
    return backgroundGradient;
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

		const template = document.createElement('template');
		template.innerHTML = `
			<link rel="stylesheet" href="index.css">
			<div class="color-picker-container" style="${paletteStyle}">
				<div class="palette-container">Here will be palette</div>
				<div class="hue-container">
					<div class="hue-chooser" style="background: ${backgroundHue}">
					</div>
				</div>
			</div>
		`
		
		this.shadowRoot.appendChild(
			template.content.cloneNode(true)
		)
	}
});
