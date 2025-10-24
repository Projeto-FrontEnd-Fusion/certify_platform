import { useRef, useEffect } from "react";

export const AcessKey = () => {
  console.log("componente renderizou");
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const valuesRef = useRef<string[]>(["", "", "", "", ""]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index: number, inputValue: string) => {
    const sanitizedValue = inputValue.toUpperCase().replace(/[^A-Z0-9]/g, "");

    valuesRef.current[index] = sanitizedValue;
    inputRefs.current[index]!.value = sanitizedValue;

    if (sanitizedValue && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !valuesRef.current[index] && index > 0) {
      const prevIndex = index - 1;
      inputRefs.current[prevIndex]?.focus();
    }
  };

  return (
    <div className="absolute bg-[#00000099] h-full flex w-full left-0 z-99 top-0 backdrop-blur-xs items-center justify-center px-4 font-inter">
      <div className="bg-white px-7 py-10.5 flex flex-col gap-6 rounded-2xl w-full max-w-88 sm:max-w-[30rem]">
        <p className="max-w-62 font-semibold text-center mx-auto text-black/60 text-xl sm:max-w-80">
          Insira a palavra-passe que foi fornecida durante o evento
        </p>
        <div className="space-x-2 mx-auto flex max-[370px]:flex-wrap   max-[370px]:justify-center max-[370px]:space-y-2 ">
          {valuesRef.current.map((_, index) => (
            <input
              name={`accessKey-${index}`}
              aria-label={`Digite o ${index + 1}º dígito da chave`}
              key={index}
              maxLength={1}
              ref={(elementIndex) => {
                inputRefs.current[index] = elementIndex;
              }}
              defaultValue={valuesRef.current[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="border w-12.5 h-14.5 border-[#3925DD] rounded-lg text-semibold text-[#3925DD] text-center sm:w-17.5 sm:h-20 sm:text-lg  max-[370px]:w-9.5 max-[370px]:h-11.5 max-[370px]:text-sm "
            />
          ))}
        </div>
        <button
          onClick={() => console.log(valuesRef.current.join(""))}
          className="w-full text-center py-2.5 sm:py-4 bg-[#3925DD] rounded-lg text-[#D9D9D9] font-semibold sm:text-xl cursor-pointer"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};
