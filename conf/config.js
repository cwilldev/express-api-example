var convict = require('convict');
var appRoot = process.cwd();

var config = module.exports = convict({

    env: {
        doc: "The applicaton environment.",
        format: ["development", "test", "production"],
        default: "development",
        env: "NODE_ENV"
    }

});

config.validate();