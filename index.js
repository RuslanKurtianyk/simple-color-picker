customElements.define('simple-colorpicker', class extends HTMLElement {
	constructor() {
		super();
		
		this.attachShadow({
			mode: 'open'
		});
		
		const template = document.createElement('template');
		template.innerHTML = `
			<link rel="stylesheet" href="index.css">
			<div>Test</div
		`;
		
		this.shadowRoot.appendChild(
			template.content.cloneNode(true)
		);
	}
});
