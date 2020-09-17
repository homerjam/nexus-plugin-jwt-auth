"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const schema_1 = require("./lib/schema");
exports.plugin = settings => project => {
    var plugins = [];
    const protectedPaths = settings.protectedPaths;
    if (protectedPaths) {
        plugins.push(schema_1.jwtAuthPlugin(protectedPaths));
    }
    return {
        context: {
            create: async (req) => {
                if (settings.verify) {
                    return {
                        token: await settings.verify(req)
                    };
                }
                else if (settings.appSecret != undefined) {
                    let token;
                    if (settings.useCookie && req.cookies && settings.cookieName && req.cookies[settings.cookieName]) {
                        token = req.cookies[settings.cookieName];
                    }
                    else if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                        token = req.headers.authorization.split(' ')[1];
                    }
                    return verifyToken(token, settings.appSecret);
                }
                return {
                    token: null
                };
            },
            typeGen: {
                fields: {
                    'token': settings.tokenType || 'string | null'
                }
            }
        },
        schema: {
            plugins
        }
    };
};
/**
 * Verify a token
 *
 * @param token
 * @param appSecret
 */
const verifyToken = (token, appSecret) => {
    try {
        const verifiedToken = jsonwebtoken_1.verify(token, appSecret);
        return {
            token: verifiedToken,
        };
    }
    catch (err) {
        return {
            token: null,
        };
    }
};
//# sourceMappingURL=runtime.js.map