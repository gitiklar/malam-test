const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
ac.grant("guest").readOwn("profile").updateOwn("profile")
ac.grant("client").extend("guest").readAny("profile")
ac.grant("admin").extend("guest").extend("client").updateAny("profile").deleteAny("profile")
return ac;
})();