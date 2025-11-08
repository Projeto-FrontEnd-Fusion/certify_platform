import { BiMailSend, BiPhone } from "react-icons/bi"
import { LiaLinkedin } from "react-icons/lia"

export const ContactPage = () =>{
  return(
    <section className="w-full bg-white text-gray-800 py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Entre em Contato</h2>
        <p className="text-gray-600 mb-10">
          Ficaremos felizes em conversar com você! Caso tenha dúvidas, sugestões ou queira colaborar com a Comunidade Frontend Fusion, entre em contato pelos canais abaixo.
        </p>
      </div>

      <div className="max-w-3xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {/* Email */}
        <div className="flex flex-col items-center text-center bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <BiMailSend className="w-8 h-8 text-indigo-600 mb-3" />
          <h3 className="font-semibold mb-1">Email</h3>
          <a
            href="mailto:claudiosilva.one@gmail.com"
            className="text-indigo-600 hover:underline break-all"
          >
            claudiosilva.one@gmail.com
          </a>
        </div>

        {/* WhatsApp */}
        <div className="flex flex-col items-center text-center bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <BiPhone className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="font-semibold mb-1">WhatsApp</h3>
          <a
            href="https://wa.me/5585991248874"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline"
          >
            +55 (85) 99124-8874
          </a>
        </div>

        {/* LinkedIn */}
        <div className="flex flex-col items-center text-center bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <LiaLinkedin className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-semibold mb-1">LinkedIn</h3>
          <div className="flex flex-col gap-1">
            <a
              href="https://www.linkedin.com/company/comunidade-frontend-fusion"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Comunidade Frontend Fusion
            </a>
            <a
              href="https://www.linkedin.com/in/claudiosilva-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Cláudio Silva
            </a>
          </div>
        </div>
      </div>


    </section>
  )
}
