import * as program from "commander";
import traverseDir from "../src/file-traverse";
import {padEnd} from "lodash";
import * as path from "path";

program.version('0.1.0')
    .arguments('[dir]')
    .action((dir) => {
        if (dir) {
            traverseDir(dir, invoker)
        } else {
            traverseDir('./', invoker)
        }
    })
    .parse(process.argv)

function invoker(pathArray: string[], s: any) {
    // console.log(path.join(...pathArray), s)
    console.log(padEnd(path.join(...pathArray), 10), `${`${padEnd(s.size.toString(), 6)}`} ${s.atime}`)
}