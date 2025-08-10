import { parentPort, threadId } from "node:worker_threads"

parentPort?.once('message', ({from, to}) => {
    console.time(`benchamark-thread-id[${threadId}]`)
    let count = 0
    for (let i=from; i < to; i++ ) {
        count++
    }
    console.timeEnd(`benchamark-thread-id[${threadId}]`)
    parentPort?.postMessage(`I'm threadId[${threadId}] finish! with ${count} items`)
})
