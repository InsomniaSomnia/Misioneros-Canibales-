const Nodo = require('./Nodo');
const {bfs, dfs} = require('./Buscador');

// Estado inicial: 3 misioneros, 3 caníbales, barco en la izquierda
const inicio = new Nodo(3, 3, 1);

function imprimirResultado(nombre, resultado) {
    console.log("\n══════════════════════════════════");
    console.log(`Resultado de ${nombre}:`);
    console.log("══════════════════════════════════");

    if (!resultado) {
        console.log("No se encontró solución.");
        return;
    }

      const { ruta, nodosExplorados } = resultado;

  console.log(`\n  Estado inicial: (3M, 3C, barca: izquierda)`);
  console.log(`  Estado objetivo: (0M, 0C, barca: derecha)\n`);

  ruta.forEach((nodo, i) => {
    const lado = nodo.barca === 1 ? 'izquierda' : 'derecha';
    if (i === 0) {
      console.log(`  Paso 0: [INICIO] → Izq(${nodo.misioneros}M, ${nodo.canibales}C) | Der(${3-nodo.misioneros}M, ${3-nodo.canibales}C) | Barca: ${lado}`);
    } else {
      console.log(`  Paso ${i}: [${nodo.accion}] → Izq(${nodo.misioneros}M, ${nodo.canibales}C) | Der(${3-nodo.misioneros}M, ${3-nodo.canibales}C) | Barca: ${lado}`);
    }
  });

  console.log(`\n  ✓ Solución encontrada en ${ruta.length - 1} pasos`);
  console.log(`  ✓ Nodos explorados: ${nodosExplorados}`);
}

// Ejecutar BFS
console.log("\n[BFS] Iniciando búsqueda en amplitud...");
const resBFS = bfs(inicio);
imprimirResultado("BFS", resBFS);

// Ejecutar DFS
console.log("\n[DFS] Iniciando búsqueda en profundidad...");
const resDFS = dfs(new Nodo(3, 3, 1));
imprimirResultado("DFS", resDFS);
