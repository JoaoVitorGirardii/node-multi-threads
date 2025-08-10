import path from "node:path";
import { fileURLToPath } from "node:url";
import { Worker, threadId } from "node:worker_threads";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

function createThread(payload: {from: number, to: number}) {
    const worker = new Worker(path.resolve(__dirname,'./thread.js'))
    const promise = new Promise((resolve, reject) => {
        worker.once('message', (msg) => {
            return resolve(msg)
        })
        worker.once('error', reject)
    })

    worker.postMessage(payload)
    return promise 
}

function createInSequence() {
    console.time(`benchamark-base[1e9] thredId[${threadId}] inSequence`)
    let count=0
    for(let i=0; i<1e9; i++){ count++ }
    console.timeEnd(`benchamark-base[1e9] thredId[${threadId}] inSequence`)
}

console.time("benchamark-base[1e9] single thread")
await Promise.all([
    createInSequence(),
    createInSequence(),
    createInSequence(),
    createInSequence(),
    createInSequence(),
])
console.log("===================================")
console.timeEnd("benchamark-base[1e9] single thread")
console.log("total de itens processados em uma thread: ", (1e9 * 5).toLocaleString())
console.log("===================================")

console.time("benchamark-[1e9] mult threads")
await Promise.all([
    createThread({ from: 0, to: 1e9 }),
    createThread({ from: 0, to: 1e9 }),
    createThread({ from: 0, to: 1e9 }),
    createThread({ from: 0, to: 1e9 }),
    createThread({ from: 0, to: 1e9 }),
])
console.log("===================================")
console.timeEnd("benchamark-[1e9] mult threads")
console.log("total de itens processados em paralelo: ", (1e9 * 5).toLocaleString())
console.log("===================================")