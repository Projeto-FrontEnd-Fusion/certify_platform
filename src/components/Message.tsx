import { useState } from "react";
import SucessImage from "@/assets/SucessImage.svg";
import ErrorImage from "@/assets/ErrorImage.svg";
import { type IMessage } from "@/types/Message";
import { errors } from "@/config/ErrorsMessages";

export const Message = ({ messageError, status }: IMessage) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;
  
  return (
    <div className="absolute bg-[#00000099] h-full flex w-full left-0 z-99 top-0 backdrop-blur-xs items-center justify-center px-4 ">
      <div className="bg-white font-inter w-fit flex flex-col items-center px-8 py-11.5 text-center gap-8 rounded-2xl max-w-[30rem]">
        <img src={status === 'error' ? ErrorImage : SucessImage} alt={"aa"} />
        <div className="space-y-3.5">
          <h3 className="font-semibold text-xl">
            {status === "sucess"
              ? "Solicitação enviada com sucesso!"
              : "Não foi possível enviar sua solicitação"}
          </h3>
          <p className="text-center">
            {status === "error"
              ? errors[messageError]
              : "Recebemos seu pedido de certificado. Você será notificado, assim que ele estiver disponível."}
          </p>
        </div>
        <button
          className="bg-black text-white w-full text-xl font-semibold py-3 rounded-lg cursor-pointer hover:shadow-lg hover:shadow-[#20191f]
        focus:outline-none focus:ring-2 focus:ring-[#331b2e] 
        duration-300 transition active:scale-90"
          onClick={() => setVisible(false)}
        >
          Ok
        </button>
      </div>
    </div>
  );
};
