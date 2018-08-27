var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import * as util from 'util';
import * as fs from 'fs';
import * as path from 'path';
import { padEnd } from 'lodash';
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
export default function traverseDir(dir, invoker) {
    return __awaiter(this, void 0, void 0, function* () {
        var e_1, _a;
        const res = yield readdir(dir);
        try {
            for (var res_1 = __asyncValues(res), res_1_1; res_1_1 = yield res_1.next(), !res_1_1.done;) {
                let file = res_1_1.value;
                const s = yield readFileStat(path.join(dir, file));
                const wholePath = path.join(dir, file).split('/');
                wholePath.shift();
                if (s.isDirectory()) {
                    if (invoker) {
                        invoker(wholePath, s);
                    }
                    else {
                        console.log(padEnd(path.join(...wholePath), 10), `${`${padEnd(s.size.toString(), 6)}`} ${s.atime}`);
                    }
                    traverseDir(path.join(dir, file), invoker);
                }
                else {
                    if (invoker) {
                        invoker(wholePath, s);
                    }
                    else {
                        console.log(padEnd(path.join(...wholePath), 10), `${`${padEnd(s.size.toString(), 6)}`} ${s.atime}`);
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (res_1_1 && !res_1_1.done && (_a = res_1.return)) yield _a.call(res_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
function readFileStat(p) {
    return __awaiter(this, void 0, void 0, function* () {
        return stat(p);
    });
}
//# sourceMappingURL=file-traverse.js.map