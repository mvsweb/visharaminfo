export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || 'https://vtechiee.com',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return json({ ok: false, message: 'Method not allowed' }, 405, corsHeaders);
    }

    try {
      const origin = request.headers.get('Origin') || '';
      if (env.ALLOWED_ORIGIN && origin && origin !== env.ALLOWED_ORIGIN) {
        return json({ ok: false, message: 'Origin not allowed' }, 403, corsHeaders);
      }

      const data = await request.json();
      const name = sanitize(data.name);
      const mobile = sanitize(data.mobile);
      const email = sanitize(data.email);
      const message = sanitize(data.message);
      const honey = sanitize(data.website || data._honey || '');

      if (honey) return json({ ok: true, message: 'Message sent.' }, 200, corsHeaders);
      if (!name || name.length < 2) return json({ ok: false, message: 'Valid name is required.' }, 400, corsHeaders);
      if (!mobile || !/^[0-9+\-\s()]{7,20}$/.test(mobile)) return json({ ok: false, message: 'Valid phone number is required.' }, 400, corsHeaders);
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ ok: false, message: 'Valid email is required.' }, 400, corsHeaders);
      if (!message || message.length < 10 || message.length > 3000) return json({ ok: false, message: 'Message must be 10 to 3000 characters.' }, 400, corsHeaders);

      const adminHtml = `
        <h2>New Vtechiee Website Enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(mobile)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `;

      const userHtml = `
        <h2>Thank you for contacting Vtechiee</h2>
        <p>Hi ${escapeHtml(name)},</p>
        <p>We received your enquiry and our team will contact you shortly.</p>
        <p><strong>Your message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
        <p>Regards,<br>Vtechiee Team</p>
      `;

      const adminResponse = await sendEmail(env, {
        to: env.CONTACT_TO || 'support@vtechiee.com',
        subject: `New website enquiry from ${name}`,
        html: adminHtml,
        reply_to: email
      });

      if (!adminResponse.ok) {
        const errorText = await adminResponse.text();
        console.error('Resend admin email error:', errorText);
        return json({ ok: false, message: 'Email delivery failed. Please try again later.' }, 502, corsHeaders);
      }

      await sendEmail(env, {
        to: email,
        subject: 'We received your enquiry - Vtechiee',
        html: userHtml,
        reply_to: env.CONTACT_TO || 'support@vtechiee.com'
      });

      return json({ ok: true, message: 'Thank you. Your enquiry has been sent successfully.' }, 200, corsHeaders);
    } catch (error) {
      console.error(error);
      return json({ ok: false, message: 'Unexpected error. Please try again later.' }, 500, corsHeaders);
    }
  }
};

async function sendEmail(env, payload) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: env.MAIL_FROM || 'Vtechiee <noreply@vtechiee.com>',
      to: [payload.to],
      subject: payload.subject,
      html: payload.html,
      reply_to: payload.reply_to
    })
  });
}

function sanitize(value) {
  return String(value || '').trim().slice(0, 3000);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[char]));
}

function json(body, status, corsHeaders) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}
