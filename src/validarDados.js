const validarDados = async (req, res, next) => {
    const { titulo, autor, paginas, genero, tipo } = req.body

    if (!titulo) {
        return res.status(400).json({ mensagem: 'O campo título é obrigatório' })
    }
    if (!autor) {
        return res.status(400).json({ mensagem: 'O campo autor é obrigatório' })
    }
    if (!genero) {
        return res.status(400).json({ mensagem: 'O campo genero é obrigatório' })
    }
    if (!tipo) {
        return res.status(400).json({ mensagem: 'O campo tipo é obrigatório' })
    }
    next()

}

module.exports = validarDados