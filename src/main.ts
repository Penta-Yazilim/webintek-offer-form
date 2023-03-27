import axios from 'axios';

// @ts-ignore
window.axios = axios;

import { createApp } from 'vue'
import './assets/css/style.scss'
import './assets/css/tailwind.css'
import App from './App.vue'
import ContactFormApp from './ContactFormApp.vue'
import 'vue3-tel-input/dist/vue3-tel-input.css'
// @ts-ignore
import VueTelInput from 'vue3-tel-input'

const app = createApp(App);

app.use(VueTelInput);

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

const contactFormApp = createApp(ContactFormApp);

contactFormApp.use(VueTelInput);

contactFormApp.mount('#contact-form-module')
