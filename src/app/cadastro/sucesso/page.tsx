export default function CadastroSucesso() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-100">
        <div className="bg-white p-8 shadow-md rounded-lg max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4 text-green-800">Cadastro enviado!</h1>
          <p className="mb-6 text-gray-700">
            Seu cadastro foi enviado para aprovação. Em breve entraremos em contacto pelo seu email.
          </p>
          <a href="/login" className="text-sm text-blue-600 hover:underline">
            Voltar para o login
          </a>
        </div>
      </div>
    )
  }
  