const form = document.getElementById('form-contato');
const toast = document.getElementById('toast-mensagem');

form.addEventListener('submit', async (evento) => {
    evento.preventDefault(); 

    const formData = new FormData(form);
    const dados = Object.fromEntries(formData);

    try {
        const resposta = await fetch('/enviar-contato', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (resposta.ok) {
            form.reset();

            toast.classList.remove('toast-escondido');
            toast.classList.add('toast-visivel');

            setTimeout(() => {
                toast.classList.remove('toast-visivel');
                toast.classList.add('toast-escondido');
            }, 3000);
        }
    } catch (erro) {
        console.error(erro);
    }
});