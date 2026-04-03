import mysql from "mysql2/promise";

export class dbUsuario {

    constructor() {
        this.config = {
            host: "localhost",
            user: "root",
            password: "1234",
            database: "testePraticoDsin"
        };
    }

    async conectar() {
        this.con = await mysql.createConnection(this.config);
        console.log("Conectado!");
    }

    async cadastrar(nome, email, senha) {
        try {
            const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";

            const [result] = await this.con.execute(sql, [nome, email, senha]);

            return true
        } catch (err) {
            console.error("Erro ao cadastrar:", err);
        }
    }

    async getOneByCredentials(email, senha) {
        try {
            const sql = `SELECT uid, nome, email, senha FROM usuarios WHERE email = ? AND senha = ? LIMIT 1`

            const [result] = await this.con.execute(sql, [email, senha])
            if (result.length === 1){
                return result[0];
            } else {return null}
        } catch (err) {
            console.error("ERRO AO TENTAR LOGAR: ", err);
        }
    }

}

// const teste = new dbUsuario();

// await teste.conectar();
// await teste.cadastrar("joao", "joao@joao", "MinhaSenha123@");