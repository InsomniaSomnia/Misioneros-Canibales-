// ───────────────────────────────────────────────────────
// Problema.js — Reglas y lógica del problema
// Equivalente a Grafo.java (la parte de validación y movimientos)
// ───────────────────────────────────────────────────────

const Nodo = require('./Nodo');

// Los 5 movimientos posibles: [misioneros que cruzan, caníbales que cruzan]
// Equivalente al array de movimientos en Grafo.java
const MOVIMIENTOS = [
  { m: 1, c: 0, desc: "1 misionero cruza"        },
  { m: 2, c: 0, desc: "2 misioneros cruzan"      },
  { m: 0, c: 1, desc: "1 caníbal cruza"          },
  { m: 0, c: 2, desc: "2 caníbales cruzan"       },
  { m: 1, c: 1, desc: "1 misionero + 1 caníbal"  },
];

// Verifica si un estado es válido (no viola restricciones)
// Equivalente al if (laberinto[x][y] != 1) en Grafo.java
function esValido(m, c) {
  // R1: Valores dentro del rango [0, 3]
  if (m < 0 || m > 3 || c < 0 || c > 3) return false;

  // R2: En orilla izquierda, M no puede ser superado por C (si hay M)
  if (m > 0 && m < c) return false;

  // R3: En orilla derecha (3-m y 3-c), mismo principio
  const mDer = 3 - m;
  const cDer = 3 - c;
  if (mDer > 0 && mDer < cDer) return false;

  return true;
}

// Verifica si el nodo es el estado objetivo
function esObjetivo(nodo) {
  return nodo.misioneros === 0 && nodo.canibales === 0 && nodo.barca === 0;
}

// Genera los nodos sucesores (hijos) de un nodo dado
// Equivalente al bloque de "Agregar vecinos" en Grafo.java
function generarSucesores(nodo) {
  const sucesores = [];
  const { misioneros: m, canibales: c, barca: b } = nodo;

  for (const mov of MOVIMIENTOS) {
    let nuevoM, nuevoC;

    if (b === 1) {
      // Barca en izquierda → personas van hacia la derecha (se restan)
      nuevoM = m - mov.m;
      nuevoC = c - mov.c;
    } else {
      // Barca en derecha → personas regresan a izquierda (se suman)
      nuevoM = m + mov.m;
      nuevoC = c + mov.c;
    }

    if (esValido(nuevoM, nuevoC)) {
      sucesores.push(new Nodo(nuevoM, nuevoC, 1 - b, nodo, mov.desc));
    }
  }

  return sucesores;
}

module.exports = { esValido, esObjetivo, generarSucesores };