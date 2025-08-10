import path from "node:path";
import { fileURLToPath } from "node:url";
import { Worker, threadId } from "node:worker_threads";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const INTERATIONS_PER_TASK = 2e9

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

function createInSequence(from: number, to: number) {
    const startTime = performance.now()
    let count=0
    for(let i = from; i < to; i++){ count++ }
    const endTime = performance.now()
    console.log(`benchamark-thread-id[[${threadId}] - ${(endTime - startTime).toFixed(2)}ms - ${new Date().toLocaleTimeString("pt-BR", {hour12: false})}`)
    return count
}

const startTimeSingle = performance.now()
const totalSingle = await Promise.all([
    createInSequence(0, INTERATIONS_PER_TASK),
    createInSequence(0, INTERATIONS_PER_TASK),
    createInSequence(0, INTERATIONS_PER_TASK),
    createInSequence(0, INTERATIONS_PER_TASK),
    createInSequence(0, INTERATIONS_PER_TASK),
])
const endTimeSingle = performance.now()
console.log("===================================")
console.log(`single thread: ${(endTimeSingle - startTimeSingle).toFixed(2)}ms`)
console.log("Itens processados: ", (totalSingle.reduce((acc: number, val:any) => acc + val, 0)).toLocaleString())
console.log("===================================")
console.log("")

const startTimeMult = performance.now()
const totalMult = await Promise.all([
    createThread({ from: 0, to: INTERATIONS_PER_TASK }),
    createThread({ from: 0, to: INTERATIONS_PER_TASK }),
    createThread({ from: 0, to: INTERATIONS_PER_TASK }),
    createThread({ from: 0, to: INTERATIONS_PER_TASK }),
    createThread({ from: 0, to: INTERATIONS_PER_TASK }),
])
const endTimeMult = performance.now()
console.log("===================================")
console.log(`mult threads: ${(endTimeMult - startTimeMult).toFixed(2)}ms`)
console.log("Itens processados: ", (totalMult.reduce((acc: number, val:any) => acc + val, 0)).toLocaleString())
console.log("===================================")
