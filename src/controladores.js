const { poolQuery, pool } = require('./conexao');

const boasvindas = (req, res) => {
    return res.send('Welcome to your library!')
}

const listarTodos = async (req, res) => {
    try {
        const select = 'select * from livros'
        const resultado = await pool.query(select)
        return res.json(resultado.rows)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const filtro = async (req, res) => {
    const { titulo, autor, genero, tipo, paginas } = req.query

    try {
        const select = 'select * from livros where titulo = $1 or autor = $2 or genero = $3 or tipo=$4 or paginas = $5'
        const resultado = await pool.query(select, [titulo, autor, genero, tipo, paginas])

        if (resultado.rowCount == 0) {
            return res.json('Não há livro cadastrado nessa categoria')
        }

        return res.json(resultado.rows)

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const cadastrarLivro = async (req, res) => {
    const { titulo, autor, genero, tipo, paginas } = req.body

    try {
        if (!paginas) {
            const insert = 'insert into livros (titulo, autor, genero, tipo) values ($1,$2,$3,$4)'
            const resultado = await poolQuery(insert, [titulo, autor, genero, tipo])
            return res.status(200).json({ mensagem: 'livro cadastrado' })
        }

        const insert = 'insert into livros (titulo, autor, genero, tipo, paginas) values ($1,$2,$3,$4,$5)'
        const resultado = await poolQuery(insert, [titulo, autor, genero, tipo, paginas])
        return res.status(200).json({ mensagem: 'livro cadastrado' })
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })

    }

}

const deletarLivro = async (req, res) => {
    const { titulo, autor, genero, tipo, paginas } = req.query

    try {
        const deletar = 'delete from livros where titulo = $1 or autor = $2 or genero = $3 or tipo=$4 or paginas = $5'
        const resultado = await pool.query(deletar, [titulo, autor, genero, tipo, paginas])

        if (resultado.rowCount == 0) {
            return res.json('Não há livro cadastrado nessa categoria')
        }

        return res.status(204).send()

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}


module.exports = {
    listarTodos,
    filtro,
    cadastrarLivro,
    deletarLivro,
    boasvindas
}