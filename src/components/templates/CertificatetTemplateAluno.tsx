export interface CertificateEmailProps {
  firstname: string;
  event_type: string;
  event_name: string;
  certificate_url?: string;
  auth_link?: string;
  hasAccount?: boolean;
}

export function CertificateEmail({
  firstname,
  event_type,
  event_name,
  certificate_url,
  auth_link,
  hasAccount = true,
}: CertificateEmailProps) {
  return (
    <html>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Bem-vindo(a) ao Certify!</title>
      </head>

      <body
        style={{
          margin: 0,
          padding: 0,
          width: "100%",
          backgroundColor: "#f5f7fa",
          fontFamily: "Arial, Helvetica, sans-serif",
          color: "#1f2937",
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
                            color: "#374151",
                          }}
                        >
                          Oi, {firstname}!
                        </p>

                        <p
                          style={{
                            margin: "0 0 24px",
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#374151",
                          }}
                        >
                          Seu cadastro foi concluído com sucesso. A partir de
                          agora, seus certificados de cursos, palestras e
                          workshops ficam salvos e organizados em um só lugar.
                        </p>

                        <p
                          style={{
                            margin: "0 0 24px",
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#374151",
                          }}
                        >
                          Seu certificado do {event_type}{" "}
                          <strong>{event_name}</strong> foi emitido com sucesso
                          e já está disponível para você.
                        </p>

                        {certificate_url && (
                          <table
                            role="presentation"
                            cellPadding="0"
                            cellSpacing="0"
                            border={0}
                            width="100%"
                            style={{ margin: "32px 0" }}
                          >
                            <tbody>
                              <tr>
                                <td align="center">
                                  <table
                                    role="presentation"
                                    cellPadding="0"
                                    cellSpacing="0"
                                    border={0}
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          align="center"
                                          color="#0069A8"
                                          style={{ borderRadius: "8px" }}
                                        >
                                          <a
                                            href={certificate_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                              display: "inline-block",
                                              padding: "14px 28px",
                                              fontSize: "16px",
                                              lineHeight: "20px",
                                              fontWeight: 700,
                                              color: "#ffffff",
                                              textDecoration: "none",
                                              borderRadius: "8px",
                                            }}
                                          >
                                            Acessar meu certificado
                                          </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        )}

                        {!hasAccount && (
                          <p
                            style={{
                              margin: "0 0 24px",
                              fontSize: "14px",
                              lineHeight: "22px",
                              color: "#D1D5DB",
                            }}
                          >
                            Se você ainda não possui uma conta, não se
                            preocupe. Ao acessar seu certificado, siga as
                            instruções para criar seu acesso.
                          </p>
                        )}

                        {auth_link && (
                          <p
                            style={{
                              margin: "32px 0 0",
                              paddingTop: "24px",
                              borderTop: "1px solid #e5e7eb",
                              fontSize: "14px",
                              lineHeight: "22px",
                              color: "#4b5563",
                            }}
                          >
                            Link para verificação de autenticidade:{" "}
                            <a
                              href={auth_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "#0069A8",
                                textDecoration: "underline",
                              }}
                            >
                              verificar certificado
                            </a>
                          </p>
                        )}

                        <p
                          style={{
                            margin: "32px 0 0",
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#374151",
                          }}
                        >
                          Estamos muito felizes em fazer parte da sua jornada
                          e celebrar essa conquista com você!
                        </p>

                        <p
                          style={{
                            margin: "24px 0 0",
                            fontSize: "14px",
                            lineHeight: "22px",
                            color: "#D1D5DB",
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
                            color: "#D1D5DB",
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

export default CertificateEmail;
