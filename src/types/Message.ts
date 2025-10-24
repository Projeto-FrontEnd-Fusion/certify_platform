import { errors } from "@/config/ErrorsMessages";

interface SuccessMessage {
  status: "sucess";
  messageError?: never;
}

interface ErrorMessage {
  status: "error";
  messageError: keyof typeof errors;
}

export type IMessage = SuccessMessage | ErrorMessage;