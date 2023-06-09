import axios from 'axios';

// @ts-ignore
window.axios = axios;

import { createApp } from 'vue'
import './assets/css/style.scss'
import './assets/css/tailwind.css'
// @ts-ignore
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
import App from './App.vue'
import ContactFormApp from './ContactFormApp.vue'
import QuickFormPopup from './QuickFormPopup.vue'
import SuccessMessage from './components/SuccessMessage.vue';

const telInputOptions = {
	mode: 'auto',
	defaultCountry: 'tr',
	autoDefaultCountry: false,
	inputOptions:{
		placeholder: '05** *** ** **',
	},
	onlyCountries:[
		"tr",
		"az",
		"ru",
		"ua",
		"by",
		"us",
		"gb",
		"de",
		"fr",
		"es",
		"it",
		"pt",
		"gr",
		"nl",
		"pl",
	]
};


if (document.getElementById('offer-form-module')) {
	const app = createApp(App);
	
	// @ts-ignore
	app.use(VueTelInput, telInputOptions);
	
	// Make a directive to handle the click outside of the element by typescript
	app.directive('click-outside', {
		beforeMount(el, binding: any, vnode: any) {
			// Provided expression must evaluate to a function.
			if (typeof binding.value !== 'function') {
				const compName = vnode.context.name
				let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
				if (compName) {
					warn += `Found in component '${compName}'`
				}
				console.warn(warn)
			}
			// Define Handler and cache it on the element
			const bubble = binding.modifiers.bubble
			const handler = (e: MouseEvent) => {
				if (bubble || (!el.contains(e.target) && el !== e.target)) {
					binding.value(e)
				}
			}
			el.__vueClickOutside__ = handler

			// add Event Listeners
			document.addEventListener('click', handler)
		},

		unmounted(el) {
			// Remove Event Listeners
			document.removeEventListener('click', el.__vueClickOutside__)
			el.__vueClickOutside__ = null
		},
	})

	app.mount('#offer-form-module')
} else if (document.getElementById('contact-form-module')) {
	const contactFormApp = createApp(ContactFormApp);

	// @ts-ignore
	contactFormApp.use(VueTelInput, telInputOptions);
	contactFormApp.mount('#contact-form-module')
}else if (document.getElementById('success-message')){
	const successMessage = createApp(SuccessMessage);
	successMessage.mount('#success-message');
}

if(document.getElementById('quick-form-popup')){
		const quickFormPopup = createApp(QuickFormPopup);

		// @ts-ignore
		quickFormPopup.use(VueTelInput, telInputOptions);
		quickFormPopup.mount('#quick-form-popup')
}
