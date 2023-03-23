import { createApp } from 'vue'
import './assets/css/style.scss'
import './assets/css/tailwind.css'
import App from './App.vue'

const app = createApp(App);

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
