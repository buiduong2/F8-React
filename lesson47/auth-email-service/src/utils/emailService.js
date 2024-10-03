import { init, send } from '@emailjs/browser'

const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID
const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID
const emailPublicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY

init({
	publicKey: emailPublicKey
})
export function sendEmail(data) {
	return send(serviceId, templateId, data)
}
