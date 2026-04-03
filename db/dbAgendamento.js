import mysql from "mysql2/promise";



export class dbAgendamento {

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
        // console.log("Conectado!");
    }

    async agendar(servicos, dia, horario, observacoes, clienteId ) {
        try {
            const sql = "INSERT INTO agendamentos (servicos, dia, horario, observacoes, auid) VALUES (?, ?, ?, ?, ?)";
            console.log("aaaaaaaaaaaaaaaaquiiiiiiiii")
            console.log(observacoes)
            const [result] = await this.con.execute(sql, [servicos, dia, horario, observacoes, clienteId]);

            console.log("AGENDADO", result);
            return true
        } catch (err) {
            console.error("Erro ao agendar:", err);
        }
    }

    async getAgendamentos(clienteId){
        let sql = "";
        let parametro = [];

        console.log("aui agendamentos")
        console.log(clienteId)

        try {
            if (clienteId === 1) {
                sql = "SELECT aaid, usuarios.nome, dia, horario FROM agendamentos LEFT JOIN usuarios ON agendamentos.auid = usuarios.uid ORDER BY dia";
            } else{
                sql = "SELECT aaid, usuarios.nome, dia, horario FROM agendamentos LEFT JOIN usuarios ON agendamentos.auid = usuarios.uid WHERE uid = ? ORDER BY dia";
                parametro = [clienteId]
            }

            const [result] = await this.con.execute(sql, parametro);

            // for (let i = 0; i < result.length; i ++){
            //     console.log(result[i].nome + " | " + ((result[i].dia).toLocaleDateString('pt-BR')) + " | " + result[i].horario)
            // }

            return result;

        } catch (err) {
            console.error("Erro de consulta:", err);
        }
    }

    async getAgendamentoByAaid(agendamentoId){
        let result
        try {
            let sql = "SELECT usuarios.nome, servicos, dia, horario, observacoes FROM agendamentos LEFT JOIN usuarios ON auid = usuarios.uid WHERE aaid = ?";
            result = await this.con.execute(sql, [agendamentoId]);

       } catch (err) {
            console.error("Erro de consulta:", err);
        }

        return result;
    }

    async agendamentoUpdate(agendamentoId, servicos, dia, horario, observacoes){
        let result
        try {
            let sql = "UPDATE agendamentos SET servicos = ?, dia = ?, horario = ?, observacoes = ? WHERE auid = ?";
            result = await this.con.execute(sql, [servicos, dia, horario, observacoes, agendamentoId]);

        } catch (err) {
            console.error("Erro de consulta:", err);
        }

        return result;
    }

}

const teste = new dbAgendamento();

await teste.conectar();
await teste.getAgendamentos(2);