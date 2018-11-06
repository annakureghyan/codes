function toUserDTO (model) {
	return {
		username : model.get('username'),
		mail : model.get('mail')
	}
}

module.exports = {
	toUserDTO
}