(function ($) {
  $(function () {
    var CONTACT_API_ENDPOINT = 'PASTE_CLOUDFLARE_WORKER_URL_HERE';
    var $form = $('.contact-form').first();
    if (!$form.length) return;

    var $clean = $form.clone(false);
    $form.replaceWith($clean);
    $form = $clean;

    if (!$form.find('input[name="website"]').length) {
      $form.append('<input type="text" name="website" tabindex="-1" autocomplete="off" style="display:none!important">');
    }
    if (!$form.find('.contact-status').length) {
      $form.append('<div class="contact-status" aria-live="polite" style="margin-top:12px;font-weight:700;color:#003379"></div>');
    }

    $form.on('submit', async function (event) {
      event.preventDefault();

      var name = $.trim($('#name').val() || '');
      var mobile = $.trim($('#mobile').val() || '');
      var email = $.trim($('#email').val() || '');
      var message = $.trim($('#message').val() || '');
      var website = $.trim($form.find('input[name="website"]').val() || '');
      var $button = $form.find('button[type="submit"]').first();
      var $status = $form.find('.contact-status').first();

      if (CONTACT_API_ENDPOINT === 'PASTE_CLOUDFLARE_WORKER_URL_HERE') {
        $status.text('Contact backend is not configured yet. Please email support@vtechiee.com.');
        return;
      }
      if (name.length < 2 || !/^[0-9+\-\s()]{7,20}$/.test(mobile) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
        $status.text('Please enter valid name, phone, email and message.');
        return;
      }

      $button.prop('disabled', true).text('Sending...');
      $status.text('Sending securely...');

      try {
        var response = await fetch(CONTACT_API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name, mobile: mobile, email: email, message: message, website: website })
        });
        var result = await response.json();
        if (!response.ok || !result.ok) throw new Error(result.message || 'Unable to send message.');
        $status.text(result.message || 'Thank you. Your enquiry has been sent successfully.');
        this.reset();
      } catch (error) {
        $status.text(error.message || 'Unable to send message. Please email support@vtechiee.com.');
      } finally {
        $button.prop('disabled', false).text('Submit');
      }
    });
  });
})(jQuery);
