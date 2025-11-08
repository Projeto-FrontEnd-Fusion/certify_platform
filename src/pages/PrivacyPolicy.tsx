import { FaShieldAlt, FaLightbulb, FaEnvelope, FaWhatsapp, FaLinkedin, FaCalendarAlt, FaCopyright } from 'react-icons/fa';

export const PrivacyPolicy = () => {
  return (
    <section className="w-full min-h-screen bg-gray-50 text-gray-800 px-6 py-12 md:px-16 lg:px-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-blue-700 flex items-center gap-2">
          <FaShieldAlt className="text-blue-600" />
          Política de Privacidade
        </h1>

        <p className="mb-6 leading-relaxed">
          A <strong>Comunidade Frontend Fusion</strong> valoriza a privacidade e a proteção
          dos dados de todos os usuários, instituições e parceiros que utilizam
          nossa plataforma. Esta Política de Privacidade descreve como
          coletamos, utilizamos, armazenamos e protegemos as informações pessoais
          fornecidas durante o uso de nossos serviços.
        </p>

        <p className="mb-10 leading-relaxed">
          Ao acessar e utilizar nossa plataforma, você concorda com as práticas
          descritas neste documento.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-blue-600">
          1. Desenvolvedor e Responsável Técnico
        </h2>
        <ul className="space-y-2 mb-10">
          <li><strong>Desenvolvedor:</strong> Comunidade Frontend Fusion</li>
          <li><strong>Líder Técnico:</strong> Cláudio Silva</li>
          <li><strong>E-mail:</strong> <a href="mailto:claudiosilva.one@gmail.com" className="text-blue-500 underline">claudiosilva.one@gmail.com</a></li>
          <li><strong>WhatsApp:</strong> <a href="https://wa.me/5585991248874" target="_blank" className="text-blue-500 underline">+55 85 99124-8874</a></li>
          <li><strong>LinkedIn (Comunidade):</strong> <a href="https://www.linkedin.com/company/comunidade-frontend-fusion" target="_blank" className="text-blue-500 underline">Comunidade Frontend Fusion</a></li>
          <li><strong>LinkedIn (Líder Técnico):</strong> <a href="https://www.linkedin.com/in/claudiosilva-dev" target="_blank" className="text-blue-500 underline">Cláudio Silva</a></li>
        </ul>

        <h2 className="text-2xl font-semibold mb-3 text-blue-600">2. Sobre a Plataforma</h2>
        <p className="mb-6 leading-relaxed flex items-start gap-2">
          <FaLightbulb className="text-yellow-500 mt-1 flex-shrink-0" />
          <strong>100% Gratuita para Instituições Educacionais e Sociais</strong>
        </p>
        <p className="mb-6 leading-relaxed">
          A plataforma é totalmente gratuita para <strong>ONGs, escolas públicas, projetos sociais e empresas que investem no terceiro setor</strong>. Nosso objetivo é democratizar o acesso à tecnologia e reduzir barreiras financeiras para instituições que promovem a educação e o desenvolvimento humano.
        </p>
        <p className="mb-10 leading-relaxed">
          Essa iniciativa busca fortalecer o impacto social da educação, permitindo que mais alunos e profissionais tenham acesso a <strong>certificados confiáveis</strong>, valorizando seus aprendizados e conquistas.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-blue-600">3. Coleta de Dados</h2>
        <p className="mb-4 leading-relaxed">
          Podemos coletar os seguintes tipos de informações:
        </p>
        <ul className="list-disc pl-6 mb-10 space-y-2">
          <li>Dados pessoais básicos: nome, e-mail, telefone e instituição vinculada.</li>
          <li>Dados técnicos: endereço IP, tipo de navegador e sistema operacional.</li>
          <li>Dados de uso: informações sobre interações e emissão de certificados.</li>
          <li>Dados de autenticação: informações para validar o acesso de administradores.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-3 text-blue-600">4. Finalidade do Uso dos Dados</h2>
        <ul className="list-disc pl-6 mb-10 space-y-2">
          <li>Gerar e validar certificados digitais.</li>
          <li>Autenticar usuários e instituições parceiras.</li>
          <li>Melhorar a experiência e desempenho da plataforma.</li>
          <li>Fornecer suporte técnico e comunicações institucionais (sem spam).</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-3 text-blue-600">5. Compartilhamento de Dados</h2>
        <p className="mb-10 leading-relaxed">
          A <strong>Comunidade Frontend Fusion</strong> não vende, aluga ou compartilha informações pessoais com terceiros para fins comerciais. Os dados poderão ser compartilhados apenas quando houver exigência legal, necessidade de segurança ou consentimento explícito do usuário.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-blue-600">6. Armazenamento e Segurança</h2>
        <p className="mb-10 leading-relaxed">
          Todos os dados são armazenados em ambientes seguros e criptografados. Apenas profissionais autorizados têm acesso às informações e seu uso é restrito às finalidades aqui descritas.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-blue-600">7. Direitos do Usuário (LGPD)</h2>
        <p className="mb-4 leading-relaxed">
          Conforme a <strong>Lei nº 13.709/2018 (LGPD)</strong>, o usuário pode:
        </p>
        <ul className="list-disc pl-6 mb-10 space-y-2">
          <li>Confirmar o tratamento dos seus dados;</li>
          <li>Acessar, corrigir ou excluir informações;</li>
          <li>Revogar consentimento;</li>
          <li>Solicitar portabilidade ou anonimização de dados.</li>
        </ul>
        <p className="mb-10 leading-relaxed">
          Solicitações podem ser feitas pelo e-mail:{" "}
          <a href="mailto:claudiosilva.one@gmail.com" className="text-blue-500 underline">
            claudiosilva.one@gmail.com
          </a>
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-blue-600">8. Retenção e Exclusão de Dados</h2>
        <p className="mb-10 leading-relaxed">
          Os dados são mantidos apenas pelo tempo necessário para o funcionamento da plataforma e cumprimento de obrigações legais. Após esse período, são anonimizados ou excluídos permanentemente.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-blue-600">9. Cookies e Tecnologias de Rastreamento</h2>
        <p className="mb-10 leading-relaxed">
          Utilizamos cookies apenas para melhorar a experiência do usuário. É possível desativá-los no navegador sem comprometer o uso principal da plataforma.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-blue-600">10. Alterações nesta Política</h2>
        <p className="mb-10 leading-relaxed">
          Esta Política de Privacidade pode ser atualizada periodicamente. A versão mais recente estará sempre disponível nesta página.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-blue-600">11. Contato</h2>
        <p className="leading-relaxed mb-4">Entre em contato conosco:</p>
        <ul className="space-y-2 mb-10">
          <li className="flex items-center gap-2">
            <FaEnvelope className="text-blue-500" />
            <a href="mailto:claudiosilva.one@gmail.com" className="text-blue-500 underline">claudiosilva.one@gmail.com</a>
          </li>
          <li className="flex items-center gap-2">
            <FaWhatsapp className="text-green-500" />
            <a href="https://wa.me/5585991248874" className="text-blue-500 underline">+55 85 99124-8874</a>
          </li>
          <li className="flex items-center gap-2">
            <FaLinkedin className="text-blue-600" />
            <a href="https://www.linkedin.com/company/comunidade-frontend-fusion" className="text-blue-500 underline">Comunidade Frontend Fusion</a>
          </li>
        </ul>

        <p className="text-sm text-gray-500 flex flex-col gap-1">
          <span className="flex items-center gap-2">
            <FaCalendarAlt />
            Última atualização: 08 de novembro de 2025
          </span>
          <span className="flex items-center gap-2">
            <FaCopyright />
            2025 Comunidade Frontend Fusion — Todos os direitos reservados.
          </span>
        </p>
      </div>
    </section>
  );
};