const userService = require("../services/users");
/**
 * Get Users
 * @param req
 * @param res
 */
export function get(req, res) {
    return res.json(userService.getUsers());
}
