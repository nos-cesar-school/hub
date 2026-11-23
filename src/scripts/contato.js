// Formulário de contato (NocoDB) e e-mail institucional, trazidos de main.js para o layout novo.
// Mesma lógica e mesmos ids; o endereço do formulário vem de VITE_NOCODB_FORM_ENDPOINT (.env).

/* E-mail institucional: vira link quando VITE_CONTACT_EMAIL estiver preenchido */
const contactEmail = String(import.meta.env.VITE_CONTACT_EMAIL || '').trim();
if (contactEmail) {
  document.querySelectorAll('[data-social-card="email"]').forEach((card) => {
    const address = contactEmail.replace(/^mailto:/, '');
    card.innerHTML = `E-mail <a href="mailto:${address}">${address}</a>`;
  });
}

/* Normaliza URL do Form View do NocoDB */
const resolveNocodbEndpoint = (rawValue) => {
  const raw = String(rawValue || '').trim();
  if (!raw || raw.includes('SEU-DOMINIO') || raw.includes('SEU-UUID')) {
    return '';
  }

  try {
    const parsed = new URL(raw);
    const shareMatch = raw.match(/\/nc\/form\/([0-9a-fA-F-]{20,})/);
    if (shareMatch) {
      return `${parsed.origin}/api/v2/public/shared-view/${shareMatch[1]}/rows`;
    }
    return parsed.toString();
  } catch {
    return '';
  }
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SUBMIT_COOLDOWN_MS = 15_000;

const contactForm = document.querySelector('#contact-form');
const contactFeedback = document.querySelector('#contact-feedback');
const contactBadge = document.querySelector('#contact-status-badge');
const contactNote = document.querySelector('#contact-integration-note');
const nocodbEndpoint = resolveNocodbEndpoint(import.meta.env.VITE_NOCODB_FORM_ENDPOINT);

if (nocodbEndpoint && contactNote) {
  if (contactBadge) contactBadge.hidden = true;
  contactNote.innerHTML =
    '<strong>Privacidade (LGPD):</strong> os dados informados serão utilizados exclusivamente para retorno institucional do Núcleo Open Source.';
}

if (contactForm instanceof HTMLFormElement && contactFeedback instanceof HTMLElement) {
  const fields = Array.from(contactForm.querySelectorAll('input[required], select[required], textarea[required]'));
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const defaultButtonHtml = submitButton ? submitButton.innerHTML : '';
  const honeypot = contactForm.querySelector('input[name="website"]');
  let lastSuccessAt = 0;

  const clearFieldError = (control) => {
    control.removeAttribute('aria-invalid');
    const errorId = control.getAttribute('data-error-id');
    const errorEl = errorId ? document.getElementById(errorId) : null;
    if (errorEl) {
      errorEl.hidden = true;
      errorEl.textContent = '';
    }
  };

  const validateControl = (control) => {
    const value = String(control.value || '').trim();
    if (!value) {
      return 'Preencha este campo obrigatório.';
    }
    if (control instanceof HTMLInputElement && control.type === 'email' && !EMAIL_PATTERN.test(value)) {
      return 'Informe um endereço de e-mail válido.';
    }
    if (!control.checkValidity()) {
      return 'Verifique o preenchimento deste campo.';
    }
    return '';
  };

  const renderFeedback = (state, title, body) => {
    contactFeedback.classList.remove('is-success', 'is-error');
    if (state === 'success') contactFeedback.classList.add('is-success');
    if (state === 'error') contactFeedback.classList.add('is-error');
    contactFeedback.innerHTML = '';
    const strong = document.createElement('strong');
    strong.textContent = title;
    contactFeedback.append(strong, document.createTextNode(body));
    contactFeedback.hidden = false;
  };

  fields.forEach((control) => {
    control.addEventListener('input', () => clearFieldError(control));
    control.addEventListener('change', () => clearFieldError(control));
  });

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    contactFeedback.hidden = true;

    if (honeypot instanceof HTMLInputElement && honeypot.value.trim() !== '') {
      return;
    }

    if (lastSuccessAt && Date.now() - lastSuccessAt < SUBMIT_COOLDOWN_MS) {
      renderFeedback(
        'info',
        'Aguarde alguns segundos',
        'Sua mensagem anterior acabou de ser enviada. Aguarde alguns instantes antes de realizar um novo envio.',
      );
      return;
    }

    let firstInvalid = null;

    fields.forEach((control) => {
      clearFieldError(control);
      const errorMessage = validateControl(control);
      if (errorMessage) {
        control.setAttribute('aria-invalid', 'true');
        const errorId = control.getAttribute('data-error-id');
        const errorEl = errorId ? document.getElementById(errorId) : null;
        if (errorEl) {
          errorEl.hidden = false;
          errorEl.textContent = errorMessage;
        }
        if (!firstInvalid) firstInvalid = control;
      }
    });

    if (firstInvalid instanceof HTMLElement) {
      firstInvalid.focus();
      return;
    }

    if (!nocodbEndpoint) {
      renderFeedback(
        'info',
        'Integração em homologação institucional',
        'A interface do formulário já está pronta, mas o endereço final do servidor de mensagens ainda não foi configurado. Nenhum dado foi enviado. Enquanto isso, acompanhe o Núcleo pelo GitHub oficial.',
      );
      return;
    }

    const formData = new FormData(contactForm);
    const payload = {
      nome: String(formData.get('nome') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      assunto: String(formData.get('assunto') || '').trim(),
      mensagem: String(formData.get('mensagem') || '').trim(),
      origem: 'hub-institucional',
    };

    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = true;
      submitButton.textContent = 'Enviando mensagem...';
    }

    try {
      const response = await fetch(nocodbEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: payload }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      lastSuccessAt = Date.now();
      contactForm.reset();
      renderFeedback(
        'success',
        'Mensagem enviada com sucesso',
        'Recebemos seu contato na base institucional do Núcleo Open Source. Nossa equipe retornará pelo e-mail informado.',
      );
    } catch {
      renderFeedback(
        'error',
        'Não foi possível enviar no momento',
        'Houve uma falha de comunicação com o serviço de mensagens. Tente novamente em instantes ou acesse nossa organização no GitHub.',
      );
    } finally {
      if (submitButton instanceof HTMLButtonElement) {
        submitButton.disabled = false;
        submitButton.innerHTML = defaultButtonHtml;
      }
    }
  });
}
