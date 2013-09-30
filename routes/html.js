/**
 * Route: html.
 * Configuration file: ./conf/express-api/html.json
 *
 * Provides some basic examples of how to deal with html requests
 * and responses.
 *
 * @author Christopher Will<contact@cwill-dev.com>
 */

/**
 * Gets paramter named "headline" as JSON-input.
 * Responses the value wrapped in HTML to the client.
 *
 * @param request {request} The express request
 * @param response {response} The express response
 * @param next {delegate} Middleware delegation
 */
exports.show = function (request, response, next) {

    // Build the HTML by using the request parameter as headline text
    var html = "<HTML><h1>" + request.apiData.headline + "</h1></HTML>";

    // Set the generated HTML as response
    response.apiData = html;

    // Continue with next middleware
	next();
};