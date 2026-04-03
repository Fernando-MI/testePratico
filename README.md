# Avaliação Técnica - DSIN

## Sistema Web desenvolvido para processo seletivo da DSIN


### 🧑‍💻 Tecnologias utilizadas
* Node.JS
* NPM (Node packet Manager)
* Express
* EJS
* MySQL 9.6
* Docker

**Node.js** é um ambiente de tempo de execução de JavaScript, que utiliza um modelo assíncrono e não bloqueador, oferecendo um ambiente de execução de back-end, permitindo o desenvolvimento tanto do back-end quanto do front-end na mesma linguagem.
<br/>
<br/>
**NPM** é o gerenciador para pacotes do Node, assim permitindo instalação rápida e facil de pacotes, assim permitindo o projeto ser facilmente replicado
<br/>
<br/>
Em conjunto com o Node.JS, foi utilizado o framework **Express.JS** para auxiliar na criação do sistema web, pois oferece ferramentas para tratar solicitações e requisições HTTP, roteamento e middleware.
<br/>
<br/>
As páginas do sistema foram montadas utilizando **EJS** (Embedded JavaScript templating) que permite a inserção de código JavaScript em arquivos HTML, facilitando a criação de páginas dinâmicas através da renderização dos dados no lado do servidor.
<br/>
<br/>
Para o banco de dados, foi utilizado o MySQL em um ambiente docker, pelo seu desempenho, ser bastante utilizado e facilidade de uso e replica.


### 💻 Executando o projeto
Clone o projeto e acesse a pasta. Modifique o arquivo `.env` com as informações
para conectar ao seu banco. Em seguida, instale as dependências para o projeto utilizando:
```bash
npm install
```

Agora vamos criar o banco de dados utilizando docker, para isso basta ter o docker instalado e rodar o seguinte codigo no terminal, substituindo o caminho "caminho/do/projeto/" Pelo caminho no seu sistema até a pasta do projeto.

```bash
docker run --name dbTestePraticoInit \
  -e MYSQL_ROOT_PASSWORD=1234 \
  -e MYSQL_DATABASE=testePraticoDsin \
  -v caminho/do/projeto/testePratico-main/db/inicializar:/docker-entrypoint-initdb.d:ro \
  -p 3306:3306 \
  -d mysql:9.6
```


Com isso feito, basta rodar o projeto, utilizando:
```bash
npm run dev
```
E o projeto estará disponível em `http://127.0.0.1:3000`. Para fins de teste, você já
pode logar no sistema utilizando o e-mail e senha abaixo.

E-mail: leila@email.com
Senha: !Trocar123 

### Imagens do projeto
![Landing Page](/prints_do_projeto/landing2.png)
![Dashboard](/prints_do_projeto/leilaDash.png)

Encontre outras imagens e vídeo passando pelo sistema na pasta `projeto-imagens-video`

Creditos:<br/> 
Demo Images:
Unsplash (unsplash.com)

Icons:
Font Awesome (fontawesome.io)

Other:
jQuery (jquery.com)
Scrollex (github.com/ajlkn/jquery.scrollex)
Responsive Tools (github.com/ajlkn/responsive-tools)