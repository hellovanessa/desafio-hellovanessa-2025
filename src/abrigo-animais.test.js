import { AbrigoAnimais } from "./abrigo-animais";

describe("Abrigo de Animais - Regras", () => {
  let abrigo;

  const mockPessoa1 = (brinquedos) => brinquedos.join(",");
  const mockPessoa2 = (brinquedos) => brinquedos.join(",");
  const mockOrdem = (animais) => animais.join(",");

  beforeEach(() => {
    abrigo = new AbrigoAnimais();
  });

  test("Deve adotar quando pessoa 1 tem a sequência correta", () => {
    // Arrange
    const pessoa1 = mockPessoa1(["RATO", "BOLA"]);
    const pessoa2 = mockPessoa2(["BOLA", "RATO"]);
    const ordem = mockOrdem(["Rex"]);

    // Act
    const resultado = abrigo.encontraPessoas(pessoa1, pessoa2, ordem);

    // Assert
    expect(resultado.lista).toContain("Rex - pessoa 1");
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve ficar no abrigo quando ninguém tem a sequência correta", () => {
    // Arrange
    const pessoa1 = mockPessoa1(["NOVELO", "CAIXA"]);
    const pessoa2 = mockPessoa2(["LASER"]);
    const ordem = mockOrdem(["Rex"]);

    // Act
    const resultado = abrigo.encontraPessoas(pessoa1, pessoa2, ordem);

    // Assert
    expect(resultado.lista).toContain("Rex - abrigo");
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve permitir intercalar brinquedos na ordem correta", () => {
    // Arrange
    const pessoa1 = mockPessoa1(["RATO", "NOVELO", "BOLA"]);
    const pessoa2 = mockPessoa2(["CAIXA"]);
    const ordem = mockOrdem(["Rex"]);

    // Act
    const resultado = abrigo.encontraPessoas(pessoa1, pessoa2, ordem);

    // Assert
    expect(resultado.lista).toContain("Rex - pessoa 1");
  });

  test("Deve mandar gato para abrigo se ambos tiverem a ordem correta", () => {
    // Arrange
    const pessoa1 = mockPessoa1(["BOLA", "LASER"]);
    const pessoa2 = mockPessoa2(["BOLA", "LASER"]);
    const ordem = mockOrdem(["Mimi"]);

    // Act
    const resultado = abrigo.encontraPessoas(pessoa1, pessoa2, ordem);

    // Assert
    expect(resultado.lista).toContain("Mimi - abrigo");
  });

  // 4) Se ambos têm condições, ninguém fica com o animal
  test("Deve mandar cão para abrigo se ambos têm os brinquedos na ordem", () => {
    // Arrange
    const pessoa1 = mockPessoa1(["RATO", "BOLA"]);
    const pessoa2 = mockPessoa2(["RATO", "BOLA"]);
    const ordem = mockOrdem(["Rex"]);

    // Act
    const resultado = abrigo.encontraPessoas(pessoa1, pessoa2, ordem);

    // Assert
    expect(resultado.lista).toContain("Rex - abrigo");
  });

  test("Deve respeitar limite de 3 animais por pessoa", () => {
    // Arrange
    const pessoa1 = mockPessoa1(["RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"]);
    const pessoa2 = mockPessoa2(["RATO", "BOLA"]);
    const ordem = mockOrdem(["Rex", "Mimi", "Fofo", "Bola", "Bebe"]);

    // Act
    const resultado = abrigo.encontraPessoas(pessoa1, pessoa2, ordem);

    // Assert
    const adotadosPessoa1 = resultado.lista.filter((l) => l.includes("pessoa 1"));
    expect(adotadosPessoa1.length).toBeLessThanOrEqual(3);
  });

  test("Loco deve ir para pessoa que já tem outro animal, mesmo sem ordem correta", () => {
    // Arrange
    const pessoa1 = mockPessoa1(["RATO", "BOLA", "SKATE"]);
    const pessoa2 = mockPessoa2(["CAIXA"]);
    const ordem = mockOrdem(["Rex", "Loco"]);

    // Act
    const resultado = abrigo.encontraPessoas(pessoa1, pessoa2, ordem);

    // Assert
    expect(resultado.lista).toContain("Rex - pessoa 1");
    expect(resultado.lista).toContain("Loco - pessoa 1");
  });

});
