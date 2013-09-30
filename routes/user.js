/**
 * Route: user.
 * Configuration file: ./conf/express-api/user.json
 *
 * Provides some basic examples of how to deal with endpoints, requests
 * and responses.
 *
 * @author Christopher Will<contact@cwill-dev.com>
 */

/**
 * Endpoint: GET:/user
 * Parameter: id (Number)
 *
 * Returns the user that belongs to the provided id.
 *
 * @param request {request} The express request
 * @param response {response} The express response
 * @param next {delegate} Middleware delegation
 */
exports.show = function (request, response, next) {

    /**
     * REQUEST
     * Dealing with request parameters
     *
     * ExpressAPI guarantees that a route gets called only if the validation
     * succeeded completely - based on the according endpoint configuration and
     * validation.
     * So at this point you do not have to check anymore whether the id got
     * passed during the request or if it is of type integer or valid at all.
     *
     * To access any data of the request just use follow accessor:
     * request.apiData
     */
    var userId = request.apiData.id;
    // Now you'd usually want to retrieve the model from MongoDB or any other
    // persistence container.
    // var model = MyModel.get(userId)

    // But we will build - as this is an example - our own user object.
    // As you can see, the response of this example contains more data to be
    // responded than actually are configured in the endpoint configuration.
    // ExpressAPI won't deliver those values to the client (according to to
    // the specified response endpoint configuration).
    var user = {
        "name":"John Doe",
        "phone": "+ 49 123 4567890",
        "location" : {
            "city" : "Berlin",
            "country" : "Germany",
            "street" : "Prenzlauer Allee" // Will not get send
        },
        "id": userId, // Will not get send
        "password": "foobar" // Will not get send
    };

    /**
     * RESPONSE
     * Dealing with response data
     *
     * ExpressAPI assumes that every data to be responded gets assigned
     * to the property "apiData" of the express response.
     * The modul itself will purge the response data according to the
     * endpoint's response-configuration.
     *
     * Information:
     * The actually used wrapper-key of the response is configurable
     * in the express-api config ("response.wrapper.key") - but is not
     * of any interests in the router layer.
     */
    response.apiData = user;

    // Finally, we just continue using other middlewares..
    next();

};

/**
 * Endpoint: POST:/user
 * Parameter: User data
 *
 * Example input
 * {
 *   "data": {
 *     "name": "Jon Doe",
 *     "phone": "+49 123 4567890",
 *     "location": {
 *       "country": "Germany",
 *       "city": "Berlin"
 *     }
 *   }
 * }
 *
 * Creates a new user object and returns it.
 *
 * @param request {request} The express request
 * @param response {response} The express response
 * @param next {delegate} Middleware delegation
 */

exports.create = function (request, response, next) {

    // Creating dummy user object.
    // In contrary to the show-endpoint the create-endpoint is configured to be
    // allowed to pass the id field to the client. So int this case the id will
    // not get removed by ExpressAPI
    var user = {
        "name": request.apiData.name,
        "phone": request.apiData.phone,
        "location" : {
            "city" : request.apiData.location.city,
            "country" : request.apiData.location.country
        },
        "id": 666,
        "foobar": "Nope" // Again just an example: This field won't get delivered
    };

    // Assign to response
    response.apiData = user;

    next();

};