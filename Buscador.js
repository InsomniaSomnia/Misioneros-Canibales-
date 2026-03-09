// ───────────────────────────────────────────────────────
// busqueda.js — Implementación de BFS y DFS
// ───────────────────────────────────────────────────────

const { generarSucesores, esObjetivo } = require('./Problema');

// Reconstruye el camino desde el nodo objetivo hasta el inicial
function reconstruirRuta(nodo) {
    const ruta = [];

    while (nodo) {
        ruta.unshift(nodo);
        nodo = nodo.padre;
    }

    return ruta;
}


// ───────────────────────────────────────────────────────
// BFS — Breadth First Search (Búsqueda en amplitud)
// Usa una COLA (FIFO)
// ───────────────────────────────────────────────────────

function bfs(inicio) {

    const cola = [inicio];
    const visitados = new Set();
    let nodosExplorados = 0;

    while (cola.length > 0) {

        const actual = cola.shift();
        nodosExplorados++;

        if (esObjetivo(actual)) {
            return {
                ruta: reconstruirRuta(actual),
                nodosExplorados
            };
        }

        visitados.add(actual.getId());

        const sucesores = generarSucesores(actual);

        for (const hijo of sucesores) {

            if (!visitados.has(hijo.getId())) {
                cola.push(hijo);
                visitados.add(hijo.getId());
            }

        }

    }

    return null;
}


// ───────────────────────────────────────────────────────
// DFS — Depth First Search (Búsqueda en profundidad)
// Usa una PILA (LIFO)
// ───────────────────────────────────────────────────────

function dfs(inicio) {

    const pila = [inicio];
    const visitados = new Set();
    let nodosExplorados = 0;

    while (pila.length > 0) {

        const actual = pila.pop();
        nodosExplorados++;

        if (esObjetivo(actual)) {
            return {
                ruta: reconstruirRuta(actual),
                nodosExplorados
            };
        }

        if (!visitados.has(actual.getId())) {

            visitados.add(actual.getId());

            const sucesores = generarSucesores(actual);

            // DFS agrega al stack
            for (const hijo of sucesores.reverse()) {
                if (!visitados.has(hijo.getId())) {
                    pila.push(hijo);
                }
            }

        }

    }

    return null;
}

module.exports = { bfs, dfs };