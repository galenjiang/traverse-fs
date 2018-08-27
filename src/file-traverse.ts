import * as util from 'util'
import * as fs from 'fs'
import * as path from 'path'
import { padEnd } from 'lodash'

const readdir = util.promisify(fs.readdir)
const stat = util.promisify(fs.stat)

export default async function traverseDir(dir: string, invoker: (...args: any[]) => any) {
    const res = await readdir(dir)

    for await (let file of res) {
        const s = await readFileStat(path.join(dir, file))

        const wholePath = path.join(dir, file).split('/')
        wholePath.shift()

        if (s.isDirectory()) {
            if (invoker) {
                invoker(wholePath, s)
            } else {
                console.log(padEnd(path.join(...wholePath), 10), `${`${padEnd(s.size.toString(), 6)}`} ${s.atime}`)
            }
            traverseDir(path.join(dir, file), invoker)
        } else {

            if (invoker) {
                invoker(wholePath, s)
            } else {
                console.log(padEnd(path.join(...wholePath), 10), `${`${padEnd(s.size.toString(), 6)}`} ${s.atime}`)
            }
        }
    }
}

async function readFileStat(p: string) {
    return stat(p)
}




