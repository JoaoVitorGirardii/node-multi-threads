import { parentPort, threadId } from "node:worker_threads"

parentPort?.once('message', ({from, to}) => {
    const startTime = performance.now()
    let count = 0
    for (let i=from; i < to; i++ ) {
        count++
    }
    const endTime = performance.now()
    console.log(`benchamark-thread-id[${threadId}] - ${(endTime - startTime).toFixed(2)}ms - ${new Date().toLocaleTimeString("pt-BR", {hour12: false})}`)
    parentPort?.postMessage(count)
})
