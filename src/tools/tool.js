const log = console.log.bind(console)

const ajax = function(request) {
	var r = new XMLHttpRequest()
	// var host = "http://localhost:5000"
    // var url = host + request.path
    var url = request.path
	r.open(request.method, url, true)
	if (request.contentType !== undefined) {
		r.setRequestHeader('Content-Type', request.contentType)
	}
	r.onreadystatechange = function(event) {
		if(r.readyState === 4) {
			if (request.callBack !== undefined) {
                request.callBack(r.response)
			}
		}
	}
	var d = JSON.stringify(request.data)
	r.send(d)
}

const tool = {
    log,
    ajax,
}

module.exports = tool
