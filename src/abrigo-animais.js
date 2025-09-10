class AbrigoAnimais {
  constructor() {
    this.animais = {
      Rex: { tipo: "cão", brinquedos: ["RATO", "BOLA"] },
      Mimi: { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
      Fofo: { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
      Zero: { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
      Bola: { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
      Bebe: { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
      Loco: { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] },
    };

    this.todosBrinquedos = new Set(
      Object.values(this.animais).flatMap((a) => a.brinquedos)
    );
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    try {
      const p1 = this.parseBrinquedos(brinquedosPessoa1, "Brinquedo inválido");
      const p2 = this.parseBrinquedos(brinquedosPessoa2, "Brinquedo inválido");

      const ordem = this.parseAnimais(ordemAnimais);

      const resultado = this.adotarAnimais(ordem, p1, p2);

      return { lista: resultado.sort(), erro: null };
    } catch (e) {
      return { erro: e.message };
    }
  }

  parseBrinquedos(str, erroMsg) {
    if (!str) return [];
    const lista = str.split(",").map((b) => b.trim());
    const set = new Set(lista);

    if (set.size !== lista.length) throw new Error(erroMsg);
    for (const b of lista) {
      if (!this.todosBrinquedos.has(b)) throw new Error(erroMsg);
    }
    return lista;
  }

  parseAnimais(str) {
    if (!str) return [];
    const lista = str.split(",").map((a) => a.trim());
    const set = new Set(lista);

    if (set.size !== lista.length) throw new Error("Animal inválido");
    for (const a of lista) {
      if (!this.animais[a]) throw new Error("Animal inválido");
    }
    return lista;
  }

  atendeRequisitos(brinquedosPessoa, animal, nome) {
    const favoritos = animal.brinquedos;

    // Regra especial do Loco
    if (nome === "Loco") {
      return favoritos.some((b) => brinquedosPessoa.includes(b));
    }

    // Para os demais, checar subsequência
    let i = 0;
    for (const brinquedo of brinquedosPessoa) {
      if (brinquedo === favoritos[i]) i++;
      if (i === favoritos.length) return true;
    }
    return false;
  }

  adotarAnimais(ordem, p1, p2) {
    const adotados1 = [];
    const adotados2 = [];
    const resultado = [];

    for (const nome of ordem) {
      const animal = this.animais[nome];
      let destino = "abrigo";

      const cond1 =
        this.atendeRequisitos(p1, animal, nome) && adotados1.length < 3;
      const cond2 =
        this.atendeRequisitos(p2, animal, nome) && adotados2.length < 3;

      if (nome === "Loco") {
        if (cond1 && adotados1.length > 0) destino = "pessoa 1";
        else if (cond2 && adotados2.length > 0) destino = "pessoa 2";
      } else if (animal.tipo === "gato") {
        if (cond1 && !cond2) destino = "pessoa 1";
        else if (cond2 && !cond1) destino = "pessoa 2";
      } else {
        if (cond1 && !cond2) destino = "pessoa 1";
        else if (cond2 && !cond1) destino = "pessoa 2";
      }

      if (destino === "pessoa 1") adotados1.push(nome);
      if (destino === "pessoa 2") adotados2.push(nome);

      resultado.push(`${nome} - ${destino}`);
    }
    return resultado;
  }
}

export { AbrigoAnimais as AbrigoAnimais };
