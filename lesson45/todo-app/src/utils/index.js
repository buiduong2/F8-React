let internalAddNotificatoin = function () {}

export let addNotification = (...args) => internalAddNotificatoin(...args)

export function setAddNotificationFn(fn) {
	internalAddNotificatoin = fn
}

export function debounce(fn, delay) {
	return {
		timeoutId: null,
		invoke(...args) {
			this.clear()
			this.timeoutId = setTimeout(() => fn(...args), delay)
		},
		async invokeImmediately(...args) {
			this.clear()
			await fn(...args)
		},
		clear() {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId)
				this.timeoutId = null
			}
		}
	}
}

export function createDeferred() {
	let resolve
	let isResolved = false

	const promise = new Promise(
		res =>
			(resolve = (...args) => {
				res(...args)
				isResolved = true
			})
	)

	return {
		promise,
		resolve,
		isResolved
	}
}
