/**
 * PMO-BOT SIGRED — GRUPO 9
 * ====================================
 * Archivo principal de funcionalidad.
 * Conserva el proyecto REAL creado en Voiceflow y lo muestra embebido.
 * No guardar claves API en este archivo, ni en HTML público.
 */
(() => {
  'use strict';

  // Modifica únicamente esta sección si cambias de proyecto o ambiente.
  const VOICEFLOW = Object.freeze({
    projectID: '6ad8ff67b70fcc45e0aa5ccb',
    runtimeURL: 'https://general-runtime.voiceflow.com',
    versionID: 'production',
    widgetURL: 'https://cdn.voiceflow.com/widget-next/bundle.mjs'
  });

  const $ = (selector) => document.querySelector(selector);
  const target = $('#sigred-chat');
  const loading = $('#chat-loading');
  const error = $('#chat-error');
  const connectionLabel = $('#connection-label');
  const connectionDot = $('#connection-dot');
  const toast = $('#toast');
  const announce = $('#live-notification');
  let chatReady = false;
  let isLoading = false;
  let renderObserver = null;
  let loadTimeout = null;
  let toastTimeout = null;

  function notify(message) {
    toast.textContent = message;
    announce.textContent = message;
    toast.classList.add('visible');
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => toast.classList.remove('visible'), 4500);
  }

  function displayState(state, message) {
    if (loading) loading.hidden = state !== 'loading';
    if (error) error.hidden = state !== 'error';
    connectionLabel.lastChild.textContent = ` ${message}`;
    connectionDot.classList.toggle('ready', state === 'ready');
    connectionDot.classList.toggle('failed', state === 'error');
    chatReady = state === 'ready';
  }

  function stopWatching() {
    if (renderObserver) { renderObserver.disconnect(); renderObserver = null; }
    if (loadTimeout) { window.clearTimeout(loadTimeout); loadTimeout = null; }
  }

  function showError() {
    stopWatching();
    isLoading = false;
    displayState('error', 'No se pudo cargar el chat');
  }

  function watchForWidget() {
    // El render de Voiceflow es asíncrono incluso después de cargar el script.
    const readyCheck = () => {
      if (target.childElementCount > 0) {
        stopWatching();
        isLoading = false;
        displayState('ready', 'Interfaz de chat cargada');
        return true;
      }
      return false;
    };
    if (readyCheck()) return;
    renderObserver = new MutationObserver(readyCheck);
    renderObserver.observe(target, { childList: true, subtree: false });
    loadTimeout = window.setTimeout(() => { if (!readyCheck()) showError(); }, 18000);
  }

  async function connectVoiceflow() {
    if (isLoading) return;
    isLoading = true;
    stopWatching();
    displayState('loading', 'Conectando con Voiceflow...');
    target.replaceChildren();

    function launchWidget() {
      try {
        if (!window.voiceflow || !window.voiceflow.chat || typeof window.voiceflow.chat.load !== 'function') {
          throw new Error('No existe la API de Voiceflow');
        }
        // Mantiene el chat grande dentro de la página, no una burbuja pequeña.
        const response = window.voiceflow.chat.load({
          verify: { projectID: VOICEFLOW.projectID },
          url: VOICEFLOW.runtimeURL,
          versionID: VOICEFLOW.versionID,
          render: { mode: 'embedded', target }
        });
        Promise.resolve(response)
          .then(() => { if (isLoading) watchForWidget(); })
          .catch((err) => { console.warn('Error de Voiceflow:', err); showError(); });
      } catch (err) {
        console.warn('No fue posible iniciar Voiceflow:', err);
        showError();
      }
    }

    if (window.voiceflow?.chat?.load) { launchWidget(); return; }

    const script = document.createElement('script');
    script.id = 'voiceflow-widget-script';
    script.src = VOICEFLOW.widgetURL;
    script.type = 'text/javascript';
    script.async = true;
    script.onload = launchWidget;
    script.onerror = showError;
    document.head.appendChild(script);
  }

  async function copyQuestion(message) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(message);
        return true;
      }
      // Alternativa para navegadores sin Clipboard API.
      const tmp = document.createElement('textarea');
      tmp.value = message;
      tmp.style.position = 'fixed';
      tmp.style.opacity = '0';
      document.body.appendChild(tmp);
      tmp.select();
      const ok = document.execCommand('copy');
      tmp.remove();
      return ok;
    } catch (_) { return false; }
  }

  // Los botones externos envían preguntas usando la API pública del widget.
  document.querySelectorAll('[data-question]').forEach((button) => {
    button.addEventListener('click', async () => {
      const message = button.dataset.question;
      $('#asistente').scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (chatReady && typeof window.voiceflow?.chat?.interact === 'function') {
        try {
          await Promise.resolve(window.voiceflow.chat.interact({ type: 'text', payload: message }));
          notify('Consulta enviada al bot.');
          return;
        } catch (err) {
          console.warn('No se pudo enviar la consulta:', err);
        }
      }
      const copied = await copyQuestion(message);
      notify(copied ? 'Pregunta copiada: pégala en el chat.' : 'Abre el chat y escribe tu pregunta.');
    });
  });

  $('#retry-chat').addEventListener('click', connectVoiceflow);

  // Ampliar el chat sin perder el historial de la conversación.
  const chatBox = $('#chat-workspace');
  const expandButton = $('#expand-chat');
  const setExpanded = (expanded) => {
    chatBox.classList.toggle('is-expanded', expanded);
    document.body.classList.toggle('chat-expanded', expanded);
    expandButton.setAttribute('aria-pressed', String(expanded));
    expandButton.setAttribute('aria-label', expanded ? 'Reducir el chat' : 'Ampliar el chat');
    expandButton.title = expanded ? 'Reducir el chat' : 'Ampliar el chat';
  };
  expandButton.addEventListener('click', () => setExpanded(!chatBox.classList.contains('is-expanded')));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && chatBox.classList.contains('is-expanded')) setExpanded(false);
  });

  // Tarjetas móviles desplazables con botones anterior/siguiente.
  const roster = $('#team-list');
  const cards = Array.from(roster.querySelectorAll('.member-card'));
  const previous = $('#team-prev');
  const next = $('#team-next');
  const position = $('#team-position');
  let activeCard = 0;
  const getCardPositions = () => cards.map((card) => card.offsetLeft - cards[0].offsetLeft);

  const updateCardPosition = () => {
    const places = getCardPositions();
    activeCard = places.reduce((closest, left, i) => Math.abs(left - roster.scrollLeft) < Math.abs(places[closest] - roster.scrollLeft) ? i : closest, 0);
    position.textContent = `${activeCard + 1} / ${cards.length}`;
    previous.disabled = activeCard === 0;
    next.disabled = activeCard === cards.length - 1;
  };
  function goToCard(index) {
    const safeIndex = Math.max(0, Math.min(cards.length - 1, index));
    const places = getCardPositions();
    roster.scrollTo({ left: places[safeIndex], behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    activeCard = safeIndex;
    position.textContent = `${safeIndex + 1} / ${cards.length}`;
    previous.disabled = safeIndex === 0;
    next.disabled = safeIndex === cards.length - 1;
  }
  previous.addEventListener('click', () => goToCard(activeCard - 1));
  next.addEventListener('click', () => goToCard(activeCard + 1));
  roster.addEventListener('scroll', updateCardPosition, { passive: true });
  window.addEventListener('resize', updateCardPosition, { passive: true });
  updateCardPosition();

  // A diferencia de una simulación, aquí el chat procede del agente real.
  connectVoiceflow();
})();
