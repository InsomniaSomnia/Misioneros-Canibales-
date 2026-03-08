// Nodo.js — Representa un estado en el espacio de búsqueda 
class Nodo {
    constructor(misioneros, canibales, barco, padre = null, accion = ""){
        this.misioneros = misioneros; // Número de misioneros en la orilla izquierda
        this.canibales = canibales; // Número de caníbales en la orilla izquierda
        this.barco = barco; // Posición del barco: 'izquierda' o 'derecha'
        this.padre = padre; // Nodo padre para reconstruir el camino
        this.accion = accion; // Acción que llevó a este estado 

    } 
    //Genera un identificador único para detectar estados repetidos
    getId(){
        return `${this.misioneros},${this.canibales},${this.barco}`;
    }
}

module.exports = Nodo;