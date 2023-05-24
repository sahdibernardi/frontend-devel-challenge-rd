# Função customerSuccessBalancing em JavaScript
A função customerSuccessBalancing retorna o ID do CustomerSuccess com a maior quantidade de clientes.

## Parâmetros
- customerSuccess (array): Array contendo os objetos CustomerSuccess, com as propriedades id e score.
- customers (array): Array contendo os objetos de clientes, com as propriedades id e score.
- customerSuccessAway (array): Array contendo os IDs dos CustomerSuccess que estão ausentes.

## Lógica Utilizada
Ao cogitar qual seria a opção de algoritmo, dei preferência pela compreensão e interpretação, confrome orientado no README.md geral do desafio. A função customerSuccessBalancing foi desenvolvida com o objetivo de ser simples de entender e de utilizar, sem a necessidade de conhecimentos avançados de programação.

A lógica utilizada por esta função foi a busca linear.
Apesar de que, no presente caso uma busca binária teria o efeito desejado e com uma pequena melhora na performance, a busca linear foi escolhida por seguir o princípio de ser mais simples de entender, uma vez que o volume de dados trabalhado, ainda que nada pequeno, não tratava-se de dados gigantescos capazes de prejudicar em muito a performance.

Seguindo este mesmo ponto, optei por realizar o salvamento do id de cada cliente dentro do array customerSuccessAvailable. Isso porque, ainda que para a resolução do exercício não seja imprescindível, isso permitiria uma integração facilitada para os gestores, caso queiram, por exemplo, saber quem encontra-se alocado com qual CS, realizando apenas pequenas modificações e sem necessitar de uma nova lógica do zero.

### Observações de algoritmo VS princípios da empresa
1. Dá forma como este algoritmo foi desenvolvido, ele não é capaz de lidar com a situação de um CS ter um score maior que o score de todos os clientes. Neste caso, o CS não será alocado a nenhum cliente e o retorno será 0.

Uma vez que o objetivo final desta função tratava-se de direcionar a contratação de mais CSs de um nível aproximado, e que CSs de nível elevado muito provavelmente possuem um maior custo para a empresa, recomendaria em uma segunda versão do algoritmo, que o mesmo fosse modificado para que, caso um CS tenha um score maior que o score de todos os clientes e existam CSs de score menor, ele seja alocado ao cliente de maior score.

2. A presente forma do algoritmo permite que clientes fiquem sem atendimento, o que viola o princípio de customer first. Para resolver este problema, recomendaria que, em uma segunda versão, o algoritmo fosse modificado para que, caso existam clientes sem atendimento, o CS com o maior score seja alocado a eles.

## Funcionamento
A função customerSuccessBalancing realiza as seguintes etapas:

1. Filtra os CustomerSuccess disponíveis, removendo aqueles que estão ausentes.
2. Ordena os CustomerSuccess disponíveis por pontuação (score), do menor para o maior.
3. Inicializa a propriedade customers de cada CustomerSuccess como um array vazio.
4. Percorre a lista de clientes e associa cada cliente ao CustomerSuccess correto, com base na pontuação.
5. Determina o CustomerSuccess com o maior número de clientes.
6. Retorna o ID do CustomerSuccess com o maior número de clientes, ou 0 se houver empate ou nenhum CustomerSuccess com clientes.

### Exemplo de utilização

```
const css = [
  { id: 1, score: 60 },
  { id: 2, score: 20 },
  { id: 3, score: 95 },
  { id: 4, score: 75 },
];

const customers = [
  { id: 1, score: 90 },
  { id: 2, score: 20 },
  { id: 3, score: 70 },
  { id: 4, score: 40 },
  { id: 5, score: 60 },
  { id: 6, score: 10 },
];

const csAway = [2, 4];

customerSuccessBalancing(css, customers, csAway); // Retorna 1
```
## Versões Utilizadas
A função customerSuccessBalancing foi testada e desenvolvida nas seguintes versões:
- Node.js v16.19.1
- Jest
- JavaScript ES6

Você pode utilizar essa função para calcular o CustomerSuccess com o maior número de clientes em diferentes cenários.

Fique à vontade para explorar os exemplos e adaptar a função conforme suas necessidades. Divirta-se!

## Como rodar este projeto
No terminal, execute os comandos:

```bash
cd javascript
npm install
```

## Como rodar os testes

No terminal, execute os comandos:

```bash
cd javascript
yarn
yarn test
```

Ou usando o NPM:

```bash
cd javascript
npm install
npm test
```

## Dúvidas
Em caso de dúvidas, entre em contato comigo pelo e-mail: [sahra.developer@gmail.com](mailto:sahra.developer@gmail.com)
