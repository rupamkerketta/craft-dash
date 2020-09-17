// Chalk
const chalk = require('chalk')
const error = chalk.redBright.bold
const info = chalk.yellowBright.bold

// Function for printing the error message
printErrMsg = (url, method, stack) => {
	console.log(error(`[ERROR] ${url} ${method} `))
	console.log(info(stack))
}

module.export = {
	printErrMsg
}
