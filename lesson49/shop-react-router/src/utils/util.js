export function convertToSlug(text) {
	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.trim()
		.replace(/[\s\W-]+/g, '-')
		.replace(/^-+|-+$/g, '')
}
