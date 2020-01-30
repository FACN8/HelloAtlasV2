const handlers = require('./handlers.js')

/*--- Router Function Section ---*/
const router = function(request, response) {
    const url = request.url;
    /*--- Managing Different URL ends ---*/
    if (url === '/') {
        handlers.handleHome(request, response);
    } else if (url.indexOf('/public/') !== -1) {
        handlers.handlePublic(request, response);
    } else if (url.indexOf('/type') !== -1) {
        handlers.handleType(request, response);
    }else if (url.indexOf('/photos') !== -1) {
        handlers.handlePhotos(request, response);
    }
     else {
        handlers.handleError(request, response);
    }
}

/*--- Router Function Section - End ---*/

module.exports = router;