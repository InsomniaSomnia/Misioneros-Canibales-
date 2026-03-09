const { generarSucesores, esObjetivo } = require('./Problema');

function reconstruirRuta(nodo) {
    const ruta = [];
    while (nodo) {
        ruta.unshift(nodo);
        nodo = nodo.padre;
    }
    return ruta;
}

function bfs(inicio) {
    const cola = [inicio];
    const visitados = new Set();
    let nodosExplorados = 0;

    visitados.add(inicio.getId());

    while (cola.length > 0) {
        const actual = cola.shift();
        nodosExplorados++;

        if (esObjetivo(actual)) {
            return { ruta: reconstruirRuta(actual), nodosExplorados };
        }

        for (const hijo of generarSucesores(actual)) {
            if (!visitados.has(hijo.getId())) {
                visitados.add(hijo.getId());
                cola.push(hijo);
            }
        }
    }
    return null;
}

function dfs(inicio) {
    const pila = [inicio];
    const visitados = new Set();
    let nodosExplorados = 0;

    while (pila.length > 0) {
        const actual = pila.pop();
        nodosExplorados++;

        if (visitados.has(actual.getId())) continue;
        visitados.add(actual.getId());

        if (esObjetivo(actual)) {
            return { ruta: reconstruirRuta(actual), nodosExplorados };
        }

        for (const hijo of generarSucesores(actual).reverse()) {
            if (!visitados.has(hijo.getId())) {
                pila.push(hijo);
            }
        }
    }
    return null;
}
module.exports = { bfs, dfs };
