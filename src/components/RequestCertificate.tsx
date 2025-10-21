import { Images } from "@/config/RequestCertificadeImages";
import { useFormValidation } from "@/hooks/useForm";
import { RequestCertificadeSchema } from "@/schemas/requestCertificade";


export const RequestCertificate = () => {
  const { errors, handleSubmit, register } = useFormValidation(
    RequestCertificadeSchema
  );

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <section className="px-2 py-8 space-y-10  max-w-[30rem] mx-auto">
      <figure>
        <div className="flex gap-1 justify-center">
          {Images.map(({ alt, src, id }) => (
            <img
              className="w-[32%] aspect-square rounded-2xl object-cover "
              key={id}
              src={src}
              alt={alt}
            />
          ))}
        </div>
        <figcaption className="sr-only">
          Pessoas recebendo certificados
        </figcaption>
      </figure>
      <div className="space-y-4 font-inter">
        <h2 className="text-xl font-semibold text-center">
          Escolha uma das opções abaixo para continuar com a CertiFy.
        </h2>
        <p className="text-center">
          Utilize o e-mail cadastrado na inscrição para registrar sua
          solicitação de certificado junto à CertiFy.
        </p>
      </div>

      <form className="font-inter space-y-4" onSubmit={onSubmit}>
        <fieldset className="space-y-4">
          <div>
            <input
              {...register("name")}
              type="text"
              placeholder="Nome completo"
              className="px-2.5 py-4 border w-full rounded-xl font-semibold border-[#000000be]"
            />
            {errors.name && (
              <span className="text-red-400 text-xs animate-pulse ml-2">
                {errors.name.message as string}
              </span>
            )}
          </div>
          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Ex: seuemail@email.com"
              className="px-2.5 py-4 border w-full rounded-xl font-semibold border-[#000000be]"
            />
            {errors.email && (
              <span className="text-red-400 text-xs animate-pulse ml-2">
                {errors.email.message as string}
              </span>
            )}
          </div>
        </fieldset>
        <button
          className="py-4 bg-black text-white font-semibold cursor-pointer w-full rounded-xl
        hover:shadow-lg hover:shadow-[#20191f]
        focus:outline-none focus:ring-2 focus:ring-[#331b2e] 
        duration-300 transition active:scale-90"
          type="submit"
        >
          Enviar solicitação
        </button>
      </form>
    </section>
  );
};
