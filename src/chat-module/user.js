const users = []

// Join user to chat
const userJoin = (id, username, email, room) => {
	const user = { id, username, email, room }

	users.push(user)
	return user
}

// Get current user
const getCurrentUser = (id) => {
	return users.find((user) => user.id === id)
}

// User leaves chat
const userLeaves = (id) => {
	const index = users.findIndex((user) => user.id === id)

	if (index !== -1) {
		return users.splice(index, 1)[0]
	}
}

// Get room users
const getRoomUsers = (room) => {
	return users.filter((user) => user.room === room)
}

const logUsers = () => {
	console.log(users)
}

module.exports = {
	userJoin,
	getCurrentUser,
	userLeaves,
	getRoomUsers,
	logUsers
}
