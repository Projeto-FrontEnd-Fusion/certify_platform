import { useState } from "react";

import TermsModal from "./modals/Termsmodal";
import PrivacyPolicyModal from "./modals/PrivacyPolicyModal";

export const Footer = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const handleOpenTerms = () => {
    setIsTermsOpen(true);
  };

  const handleCloseTerms = () => {
    setIsTermsOpen(false);
  };

  const handleOpenPrivacy = () => {
    setIsPrivacyOpen(true);
  };

  const handleClosePrivacy = () => {
    setIsPrivacyOpen(false);
  };

  return (
    <>
      <footer className="flex w-full flex-col gap-1.5 bg-[#F2F2F9] py-5 text-center font-inter text-[0.625rem] text-gray-600 sm:text-xs min-[900px]:text-sm!">
        <p className="font-bold">
          CertiFy — Todos os direitos reservados © 2025
        </p>

        <p>
          Desenvolvido com
          <span role="img" aria-label="coração">
            {" "}
            🖤
          </span>{" "}
          pela Comunidade Frontend Fusion
        </p>

        <nav
          aria-label="Footer links"
          className="self-center"
        >
          <button
            type="button"
            onClick={handleOpenTerms}
            className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-[0.0625rem] after:w-full after:origin-left after:scale-x-0 after:bg-[#000000] after:transition-transform after:duration-300 hover:after:scale-x-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0069A8]/30"
          >
            🔗 Termos de Uso
          </button>

          <span className="px-1 font-black">|</span>

          <button
            type="button"
            onClick={handleOpenPrivacy}
            className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-[0.0625rem] after:w-full after:origin-left after:scale-x-0 after:bg-[#000000] after:transition-transform after:duration-300 hover:after:scale-x-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0069A8]/30"
          >
            🔗 Política de Privacidade
          </button>
        </nav>
      </footer>

      <TermsModal
        isOpen={isTermsOpen}
        onClose={handleCloseTerms}
      />

      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={handleClosePrivacy}
      />
    </>
  );
};
