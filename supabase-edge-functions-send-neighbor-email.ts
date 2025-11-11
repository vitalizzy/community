import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

interface SendNeighborEmailRequest {
  recipient_email: string;
  sender_name: string;
  sender_email: string;
  sender_phone?: string;
}

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { recipient_email, sender_name, sender_email, sender_phone } =
      (await req.json()) as SendNeighborEmailRequest;

    // Validate inputs
    if (!recipient_email || !sender_name || !sender_email) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required fields: recipient_email, sender_name, sender_email",
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recipient_email) || !emailRegex.test(sender_email)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid email format" }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Prepare email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4a5568;">¡Un vecino quiere contactarte!</h2>
        <p style="color: #718096; font-size: 16px;">
          ${sender_name} de tu comunidad te ha contactado a través de L2H Community.
        </p>
        
        <div style="background: #f7fafc; border-left: 4px solid #667eea; padding: 16px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${sender_email}</p>
          ${
            sender_phone
              ? `<p style="margin: 0;"><strong>Teléfono:</strong> ${sender_phone}</p>`
              : ""
          }
        </div>
        
        <p style="color: #4a5568; font-size: 14px; margin-top: 20px;">
          Responde directamente a este email para ponerte en contacto con ${sender_name}.
        </p>
        
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
        
        <p style="color: #718096; font-size: 12px; text-align: center;">
          Este email se envió desde L2H Community - Plataforma de Comunidades de Propietarios
        </p>
      </div>
    `;

    const emailText = `
Un vecino quiere contactarte!

${sender_name} de tu comunidad te ha contactado a través de L2H Community.

Email: ${sender_email}
${sender_phone ? `Teléfono: ${sender_phone}` : ""}

Responde directamente a este email para ponerte en contacto con ${sender_name}.
    `;

    // Send email via Resend
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "L2H Community <noreply@l2h-community.com>",
        to: recipient_email,
        subject: `${sender_name} quiere contactarte - L2H Community`,
        html: emailHtml,
        text: emailText,
        reply_to: sender_email,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Resend API error:", error);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to send email via Resend",
          details: error,
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    const result = await response.json();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email sent successfully",
        email_id: result.id,
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error in send-neighbor-email function:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }),
      { status: 500, headers: corsHeaders }
    );
  }
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
