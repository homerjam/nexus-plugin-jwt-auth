"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const cross_fetch_1 = require("cross-fetch");
// @ts-ignore
global.Headers = global.Headers || cross_fetch_1.Headers;
exports.auth = settings => ({
    settings,
    packageJsonPath: require.resolve('../package.json'),
    runtime: {
        module: require.resolve('./runtime'),
        export: 'plugin'
    }
});
//# sourceMappingURL=index.js.map