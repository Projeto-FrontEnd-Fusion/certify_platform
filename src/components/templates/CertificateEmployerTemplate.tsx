export interface CompanyWelcomeEmailProps {
  firstname: string;
}

export function CompanyWelcomeEmail({
  firstname,
}: CompanyWelcomeEmailProps) {
  return (
    <html>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Bem-vind o(a) ao Certify!</title>
      </head>

      <body
        style={{
          margin: 0,
          padding: 0,
          width: "100%",
          backgroundColor: "#f5f7fa",
          fontFamily: "Arial, Helvetica, sans-serif",
          color: "#0069A8",
        }}
      >
        <table
          role="presentation"
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          border={0}
          style={{
            width: "100%",
            margin: 0,
            padding: 0,
            backgroundColor: "#f5f7fa",
          }}
        >
          <tbody>
            <tr>
              <td align="center" style={{ padding: "32px 16px" }}>
                <table
                  role="presentation"
                  width="600"
                  cellPadding="0"
                  cellSpacing="0"
                  border={0}
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <tbody>
                    <tr>
                      <td style={{ padding: "40px 32px" }}>
                        <h1
                          style={{
                            margin: "0 0 12px",
                            fontSize: "28px",
                            lineHeight: "36px",
                            fontWeight: 700,
                            color: "#0069A8",
                          }}
                        >
                          Bem-vindo(a) ao Certify!
                        </h1>

                        <p
                          style={{
                            margin: "0 0 28px",
                            fontSize: "18px",
                            lineHeight: "28px",
                            fontWeight: 600,
                            color: "#0069A8",
                          }}
                        >
                          Vamos emitir seus certificados?
                        </p>

                        <p
                          style={{
                            margin: "0 0 16px",
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#0069A8",
                          }}
                        >
                          Olá, {firstname}!
                        </p>

                        <p
                          style={{
                            margin: "0 0 24px",
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#0069A8",
                          }}
                        >
                          O cadastro da sua empresa foi concluído com sucesso.
                          Agora você tem acesso à plataforma completa para
                          criar, gerenciar e distribuir certificados de forma
                          automatizada.
                        </p>

                        <p
                          style={{
                            margin: "0 0 16px",
                            fontSize: "16px",
                            lineHeight: "24px",
                            fontWeight: 700,
                            color: "#111827",
                          }}
                        >
                          Primeiros passos:
                        </p>

                        <p
                          style={{
                            margin: "0 0 12px",
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#374151",
                          }}
                        >
                          1. Acesse o painel com o e-mail e senha cadastrados.
                        </p>

                        <p
                          style={{
                            margin: "0 0 12px",
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#374151",
                          }}
                        >
                          2. Crie seu primeiro modelo de certificado.
                        </p>

                        <p
                          style={{
                            margin: "0 0 24px",
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#ffffff",
                          }}
                        >
                          3. Importe a lista de participantes e faça o envio
                          em poucos cliques!
                        </p>

                        <p
                          style={{
                            margin: "0 0 24px",
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#ffffff",
                          }}
                        >
                          Precisa de ajuda para configurar sua conta? Nossa
                          equipe está à disposição.
                        </p>

                        <p
                          style={{
                            margin: "32px 0 0",
                            fontSize: "14px",
                            lineHeight: "22px",
                            color: "#ffffff",
                          }}
                        >
                          Atenciosamente,
                          <br />
                          <strong>Equipe Certify</strong>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table
                  role="presentation"
                  width="600"
                  cellPadding="0"
                  cellSpacing="0"
                  border={0}
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td align="center" style={{ padding: "20px 16px" }}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "12px",
                            lineHeight: "18px",
                            color: "#0069A8",
                          }}
                        >
                          Este é um e-mail automático. Por favor, não responda a
                          esta mensagem.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}

export default CompanyWelcomeEmail;
