# Exemplo de Uso de Node.js Multi-Threads

Este repositório demonstra o uso do **Worker Threads** do Node.js para execução de tarefas em **múltiplos threads**, permitindo que operações pesadas sejam processadas em paralelo, sem bloquear o **event loop** principal.

### 📌 Objetivo

O objetivo deste exemplo é mostrar como criar e gerenciar **workers** no Node.js para dividir tarefas pesadas (como cálculos extensos ou processamento de dados) em diferentes threads, melhorando o desempenho e a escalabilidade da aplicação.

### Estrutura dos Arquivos
├─ index.ts # Arquivo principal que cria os workers e gerencia as execuções

├─ thread.ts # Código executado dentro de cada worker

### Tecnologias Utilizadas

- **Node.js** >= 16
- **TypeScript**
- **Worker Threads** (`worker_threads`)

### Funcionamento

1. **index.ts**  
   - Cria múltiplos **workers** usando a API `Worker` do módulo `worker_threads`.
   - Envia para cada worker um payload (ex.: intervalo de números para processar).
   - Recebe do worker o resultado via evento `message`.

2. **thread.ts**  
   - Recebe a mensagem inicial com os dados para processar.
   - Executa a tarefa (ex.: somar números de um intervalo, processar dados).
   - Retorna o resultado para o thread principal via `parentPort.postMessage`.

### Teste de Desempenho
Single Thread: Executar o mesmo cálculo sem workers para medir o tempo.

Multi Thread: Dividir o cálculo entre cinco ou mais workers e comparar o tempo.

A ideia é observar que, o uso de múltiplos threads pode reduzir significativamente o tempo total.

### Benchmark Node.js — Single vs Multi-thread

```bash
descrição+threadId | tempo_de_processamento | hora_procesamento
---------------------------------------------------------------
benchamark-thread-id[[0] - 1131.30ms - 19:20:35
benchamark-thread-id[[0] - 1143.28ms - 19:20:36
benchamark-thread-id[[0] - 1134.21ms - 19:20:37
benchamark-thread-id[[0] - 2759.55ms - 19:20:40
benchamark-thread-id[[0] - 1884.50ms - 19:20:42
===============================================================
single thread: 8070.69ms
Itens processados:  10,000,000,000
===============================================================

descrição+threadId | tempo_de_processamento | hora_procesamento
---------------------------------------------------------------
benchamark-thread-id[[1] - 1284.68ms - 19:20:43
benchamark-thread-id[[3] - 1287.64ms - 19:20:43
benchamark-thread-id[[2] - 1291.82ms - 19:20:43
benchamark-thread-id[[5] - 1883.75ms - 19:20:44
benchamark-thread-id[[4] - 1886.30ms - 19:20:44
===============================================================
mult threads: 1947.66ms
Itens processados:  10,000,000,000
===============================================================
```
Pode ser observado que a hora_processamento entre os itens processados em multi threads é quase o mesmo mostrando assim que ambos foram executados separadamente e tiveram sua finalização quase no mesmo instante.

