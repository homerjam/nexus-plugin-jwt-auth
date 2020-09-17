"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAuthPlugin = void 0;
const schema_1 = require("@nexus/schema");
function jwtAuthPlugin(protectedPaths) {
    return schema_1.plugin({
        name: 'JWT Auth Plguin',
        description: 'A nexus schema plugin for jwt auth.',
        onCreateFieldResolver(config) {
            return async (root, args, ctx, info, next) => {
                const parentType = config.parentTypeConfig.name;
                if (parentType != 'Query' && parentType != 'Mutation') {
                    return await next(root, args, ctx, info);
                }
                const resolver = `${parentType}.${config.fieldConfig.name}`;
                if (!protectedPaths.includes(resolver)) {
                    return await next(root, args, ctx, info);
                }
                if (!ctx.token) {
                    throw new Error('Not Authorized!');
                }
                return await next(root, args, ctx, info);
            };
        },
    });
}
exports.jwtAuthPlugin = jwtAuthPlugin;
//# sourceMappingURL=index.js.map