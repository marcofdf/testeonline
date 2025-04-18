export default function AguardandoAprovacao() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-100">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4 text-yellow-700">Cadastro em análise</h1>
          <p className="text-gray-700 mb-6">
            Seu cadastro foi enviado e está a ser analisado pela nossa equipa.
            Em breve receberá uma confirmação por email.
          </p>
          <a href="/login" className="text-blue-600 hover:underline text-sm">
            Voltar para o login
          </a>
        </div>
      </div>
    )
  }
  