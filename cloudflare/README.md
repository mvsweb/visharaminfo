# Vtechiee Contact Form Backend

This folder contains a secure open-source contact form backend using Cloudflare Workers and Resend.

## Why this setup

- No SMTP password in the browser
- No EmailJS public config exposed
- No FormSubmit verification issue
- CORS restricted to your website
- Honeypot spam protection
- Admin notification + customer auto-reply

## Cloudflare Worker setup

1. Create a Cloudflare Worker.
2. Copy `contact-worker.js` into the Worker editor.
3. Set these Worker environment variables:

```text
RESEND_API_KEY=your_resend_api_key
ALLOWED_ORIGIN=https://vtechiee.com
CONTACT_TO=support@vtechiee.com
MAIL_FROM=Vtechiee <noreply@vtechiee.com>
```

4. In Resend, verify your sending domain `vtechiee.com`.
5. Add the DNS records Resend gives you.
6. Deploy the Worker.
7. Copy the Worker URL, for example:

```text
https://vtechiee-contact.yourname.workers.dev
```

8. In `js/contact-worker-client.js`, replace this line:

```js
var CONTACT_API_ENDPOINT = 'PASTE_CLOUDFLARE_WORKER_URL_HERE';
```

with your Worker URL.

## Test

Submit the contact form from the website. You should receive:

- Admin email at `support@vtechiee.com`
- Auto-reply to the customer email

## Recommended production route

After testing, create a Cloudflare route like:

```text
https://api.vtechiee.com/contact
```

Then use that URL in the website client script.
