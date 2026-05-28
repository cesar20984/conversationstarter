const STORAGE_KEY = "cuestarter.thread.v3";
const PREFETCH_TIMEOUT_MS = 5000;
const LIVE_TIMEOUT_MS = 15000;
const MAX_BACKGROUND_JOBS = 3;
const PREFETCH_FAILED_TTL_MS = 12000;

const copy = {
  en: {
    brand: "CueStarter",
    setupTitle: ["Tone", "Style", "Situation"],
    setupPrompt: [
      "Pick the tone first. It will stay out of your way after this.",
      "Choose how you want the app to help.",
      "Where is this conversation happening?"
    ],
    back: "Back",
    start: "Start",
    newLine: "New",
    more: "More",
    startersTitle: "Pick one",
    reset: "Reset",
    sayThis: "Say this",
    coachThis: "Do this",
    toCoach: "Coach",
    toSay: "Example",
    wait: "Wait a second...",
    freshTitle: "Ready next",
    showFresh: "Ready next",
    topicTitle: "Change topic",
    randomTopic: "Random",
    configure: "Server key missing. Add it, restart, then generate a line.",
    error: "Could not generate. Try again.",
    actionLabels: {
      deepen: "Deeper",
      related: "Same thread",
      soften: "Softer",
      pivot: "Gentle pivot"
    },
    choices: {
      tones: ["Warm", "Playful", "Calm", "Bold", "Curious", "Soft", "Witty", "Deep"],
      modes: ["Say it", "Coach me"],
      contexts: ["First date", "Party", "Networking", "Coworker", "Old friend", "Family", "Online match", "Awkward silence"]
    },
    starterSeeds: {
      topics: ["small wins", "taste", "places", "memories", "opinions", "curiosity", "music", "style", "weekends", "habits", "food", "learning", "city", "comfort", "goals", "surprises"],
      direct: [
        "What tiny {topic} detail has been on your mind lately?",
        "What is your most underrated take about {topic}?",
        "What changed the way you think about {topic}?",
        "What is something about {topic} people usually miss?",
        "What is your easiest yes when it comes to {topic}?",
        "What is a {topic} thing you liked before everyone else did?",
        "What is your comfort version of {topic}?",
        "What is one {topic} choice that says a lot about someone?",
        "What is a recent {topic} moment that stuck with you?",
        "What is your low-key rule about {topic}?"
      ],
      guided: [
        "Ask them what small detail about {topic} has been on their mind lately.",
        "Invite them to share an underrated take about {topic}.",
        "Ask what changed how they think about {topic}.",
        "Have them describe something about {topic} people usually miss.",
        "Ask what feels like an easy yes in {topic}.",
        "Invite a story about liking something in {topic} before others did.",
        "Ask about their comfort version of {topic}.",
        "Ask what {topic} choice says a lot about a person.",
        "Invite them to share a recent {topic} moment that stuck.",
        "Ask for their low-key rule about {topic}."
      ],
      directAngles: [
        "Keep it quick.",
        "I am curious about the first thing that comes to mind.",
        "No perfect answer, just your honest one.",
        "The smaller the detail, the better.",
        "I feel like that says more than people expect.",
        "You can answer with a story if one comes up.",
        "I like oddly specific answers.",
        "Give me the version you would tell a friend.",
        "I promise not to judge the answer.",
        "The more random, the better."
      ],
      guidedAngles: [
        "Keep it quick and low pressure.",
        "Ask for their first instinct, not a perfect answer.",
        "Make it feel easy to answer.",
        "Encourage a small detail instead of a big explanation.",
        "Frame it as something that reveals personality.",
        "Invite a story only if one naturally comes up.",
        "Ask for an oddly specific answer.",
        "Make it sound like something they would tell a friend.",
        "Keep the tone nonjudgmental.",
        "Let it be a little random."
      ]
    }
  },
  es: {
    brand: "CueStarter",
    setupTitle: ["Tono", "Estilo", "Situacion"],
    setupPrompt: [
      "Elige el tono primero. Despues no molestara.",
      "Elige como quieres que la app te ayude.",
      "Donde ocurre esta conversacion?"
    ],
    back: "Atras",
    start: "Empezar",
    newLine: "Nueva",
    more: "Mas",
    startersTitle: "Elige una",
    reset: "Reiniciar",
    sayThis: "Di esto",
    coachThis: "Haz esto",
    toCoach: "Coach",
    toSay: "Ejemplo",
    wait: "Espera un segundo...",
    freshTitle: "Listas",
    showFresh: "Listas",
    topicTitle: "Cambiar tema",
    randomTopic: "Azar",
    configure: "Falta la clave del servidor. Agregala, reinicia y genera una frase.",
    error: "No se pudo generar. Intenta otra vez.",
    actionLabels: {
      deepen: "Profundizar",
      related: "Seguir ahi",
      soften: "Suavizar",
      pivot: "Giro suave"
    },
    choices: {
      tones: ["Calido", "Jugueton", "Tranquilo", "Atrevido", "Curioso", "Suave", "Ingenioso", "Profundo"],
      modes: ["Decirlo", "Guiame"],
      contexts: ["Primera cita", "Fiesta", "Networking", "Colega", "Vieja amistad", "Familia", "Match online", "Silencio incomodo"]
    },
    starterSeeds: {
      topics: ["mini logros", "gustos", "lugares", "recuerdos", "opiniones", "curiosidad", "musica", "estilo", "fines de semana", "habitos", "comida", "aprendizaje", "ciudad", "comodidad", "metas", "sorpresas"],
      direct: [
        "Que detalle pequeno sobre {topic} has tenido en mente ultimamente?",
        "Cual es tu opinion mas infravalorada sobre {topic}?",
        "Que cambio tu forma de pensar sobre {topic}?",
        "Que cosa sobre {topic} suele pasar desapercibida?",
        "Que es un si facil para ti cuando se trata de {topic}?",
        "Que cosa de {topic} te gusto antes que a los demas?",
        "Cual es tu version comoda de {topic}?",
        "Que eleccion de {topic} dice mucho de alguien?",
        "Que momento reciente de {topic} se te quedo grabado?",
        "Cual es tu regla secreta sobre {topic}?"
      ],
      guided: [
        "Preguntale que detalle pequeno sobre {topic} ha tenido en mente ultimamente.",
        "Invitale a compartir una opinion infravalorada sobre {topic}.",
        "Pregunta que cambio su forma de pensar sobre {topic}.",
        "Pidele que describa algo de {topic} que la gente suele pasar por alto.",
        "Pregunta que se siente como un si facil en {topic}.",
        "Invitale a contar una historia sobre algo de {topic} que le gusto antes que a otros.",
        "Pregunta por su version comoda de {topic}.",
        "Pregunta que eleccion de {topic} dice mucho de una persona.",
        "Invitale a contar un momento reciente de {topic} que se le quedo.",
        "Pregunta por su regla secreta sobre {topic}."
      ],
      directAngles: [
        "Que sea rapido.",
        "Me da curiosidad lo primero que se te venga a la mente.",
        "No tiene que ser perfecto, solo honesto.",
        "Mientras mas pequeno el detalle, mejor.",
        "Siento que eso dice mas de lo que parece.",
        "Puedes responder con una historia si aparece una.",
        "Me gustan las respuestas muy especificas.",
        "Dime la version que le contarias a una amistad.",
        "Prometo no juzgar la respuesta.",
        "Mientras mas random, mejor."
      ],
      guidedAngles: [
        "Mantenlo rapido y sin presion.",
        "Pide su primera reaccion, no una respuesta perfecta.",
        "Haz que se sienta facil de responder.",
        "Invita a un detalle pequeno, no a una explicacion grande.",
        "Plantealo como algo que revela personalidad.",
        "Invita una historia solo si aparece naturalmente.",
        "Pide una respuesta muy especifica.",
        "Haz que suene como algo que le contaria a una amistad.",
        "Mantiene un tono sin juicio.",
        "Deja que sea un poco random."
      ]
    }
  }
};

const freshState = () => ({
  language: "en",
  setupStep: 0,
  ready: false,
  tone: "",
  mode: "direct",
  conversationType: "",
  topic: "",
  panel: "",
  currentLine: "",
  intent: "",
  starters: [],
  freshStarters: [],
  microContext: "",
  actions: [],
  topicOptions: [],
  recent: []
});

const state = freshState();
const runtime = {
  canGenerate: false,
  busy: false,
  inFlight: new Set(),
  locked: new Set(),
  prefetched: new Map(),
  failedPrefetch: new Map(),
  error: ""
};

function syncBusy() {
  runtime.busy = runtime.inFlight.size > 0 && !state.currentLine && !state.starters.length;
}

const els = {
  screenTitle: document.querySelector("#screenTitle"),
  setupPanel: document.querySelector("#setupPanel"),
  setupTitle: document.querySelector("#setupTitle"),
  setupStep: document.querySelector("#setupStep"),
  progressBar: document.querySelector("#progressBar"),
  setupGrid: document.querySelector("#setupGrid"),
  setupBackBtn: document.querySelector("#setupBackBtn"),
  startBtn: document.querySelector("#startBtn"),
  cuePanel: document.querySelector("#cuePanel"),
  cueLabel: document.querySelector("#cueLabel"),
  newBtn: document.querySelector("#newBtn"),
  starterGrid: document.querySelector("#starterGrid"),
  moreStartersBtn: document.querySelector("#moreStartersBtn"),
  primaryCue: document.querySelector("#primaryCue"),
  flipBtn: document.querySelector("#flipBtn"),
  cueIntent: document.querySelector("#cueIntent"),
  freshGrid: document.querySelector("#freshGrid"),
  actionGrid: document.querySelector("#actionGrid"),
  topicTitle: document.querySelector("#topicTitle"),
  wildBtn: document.querySelector("#wildBtn"),
  topicGrid: document.querySelector("#topicGrid"),
  resetBtn: document.querySelector("#resetBtn")
};

els.topbar = document.querySelector("#topbar");
els.waitToast = document.querySelector("#waitToast");
els.showTopicsBtn = document.querySelector("#showTopicsBtn");
els.showFreshBtn = document.querySelector("#showFreshBtn");
els.topicPanel = document.querySelector("#topicPanel");

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  try {
    Object.assign(state, JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"));
  } catch {}
  state.setupStep = Number.isInteger(state.setupStep) ? Math.max(0, Math.min(2, state.setupStep)) : 0;
  state.language = state.language === "es" ? "es" : "en";
  state.mode = state.mode === "guided" ? "guided" : "direct";
  state.actions = Array.isArray(state.actions) ? state.actions : [];
  state.starters = Array.isArray(state.starters) ? state.starters : [];
  state.freshStarters = Array.isArray(state.freshStarters) ? state.freshStarters : [];
  state.topicOptions = Array.isArray(state.topicOptions) ? state.topicOptions : [];
  state.recent = Array.isArray(state.recent) ? state.recent : [];
  state.panel = typeof state.panel === "string" ? state.panel : "";
}

function resetAll(keepLanguage = true) {
  const lang = state.language;
  Object.assign(state, freshState());
  if (keepLanguage) state.language = lang;
  runtime.error = "";
  runtime.busy = false;
  runtime.inFlight.clear();
  runtime.locked.clear();
  runtime.prefetched.clear();
  runtime.failedPrefetch.clear();
  localStorage.removeItem(STORAGE_KEY);
  render();
  saveState();
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function instantStarters() {
  const seeds = copy[state.language].starterSeeds;
  const templates = state.mode === "guided" ? seeds.guided : seeds.direct;
  const angles = state.mode === "guided" ? seeds.guidedAngles : seeds.directAngles;
  const pool = [];
  seeds.topics.forEach(topic => {
    templates.forEach(template => {
      angles.forEach(angle => {
        pool.push({
          topic,
          line: `${template.replace("{topic}", topic)} ${angle}`,
          intent: topic
        });
      });
    });
  });
  return shuffle(pool).slice(0, 6);
}

function defaultActions() {
  return [
    { id: "deepen", label: "Deeper", hint: state.language === "es" ? "Ir mas especifico con esta frase." : "Get more specific from this line." },
    { id: "related", label: "Same thread", hint: state.language === "es" ? "Seguir cerca sin repetir." : "Stay close without repeating." },
    { id: "soften", label: "Softer", hint: state.language === "es" ? "Bajar la presion." : "Lower the pressure." },
    { id: "pivot", label: "Pivot", hint: state.language === "es" ? "Moverse con cuidado." : "Move gently." }
  ];
}

function defaultTopics() {
  return state.language === "es"
    ? ["planes", "gustos", "recuerdos", "curiosidad"]
    : ["plans", "taste", "memories", "curiosity"];
}

function shuffle(items) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function setLanguage(lang) {
  state.language = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-lang]").forEach(btn => btn.classList.toggle("active", btn.dataset.lang === lang));
  render();
  saveState();
}

function setupChoices() {
  const c = copy[state.language].choices;
  if (state.setupStep === 0) return c.tones.map(value => ({ value, key: "tone" }));
  if (state.setupStep === 1) return c.modes.map(value => ({ value, key: "mode", mode: value === c.modes[0] ? "direct" : "guided" }));
  return c.contexts.map(value => ({ value, key: "conversationType" }));
}

function selectedForStep() {
  if (state.setupStep === 0) return state.tone;
  if (state.setupStep === 1) return state.mode === "direct" ? copy[state.language].choices.modes[0] : copy[state.language].choices.modes[1];
  return state.conversationType;
}

function chooseSetup(choice) {
  if (choice.key === "mode") state.mode = choice.mode;
  else state[choice.key] = choice.value;
  if (state.setupStep < 2) {
    state.setupStep += 1;
    render();
  } else {
    startConversation();
  }
  saveState();
}

function renderSetup() {
  const c = copy[state.language];
  els.setupPanel.hidden = state.ready;
  els.setupTitle.textContent = c.setupPrompt[state.setupStep];
  els.setupStep.textContent = `${state.setupStep + 1}/3 ${c.setupTitle[state.setupStep]}`;
  els.progressBar.style.width = `${((state.setupStep + 1) / 3) * 100}%`;
  els.setupBackBtn.textContent = c.back;
  els.setupBackBtn.hidden = state.setupStep === 0;
  els.startBtn.textContent = c.start;
  els.setupGrid.innerHTML = "";
  const selected = selectedForStep();
  setupChoices().forEach(choice => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice-btn";
    btn.textContent = choice.value;
    btn.classList.toggle("selected", selected === choice.value);
    btn.addEventListener("click", () => chooseSetup(choice));
    els.setupGrid.appendChild(btn);
  });
}

function renderCue() {
  const c = copy[state.language];
  const choosingStarter = state.ready && !state.currentLine && !runtime.error;
  els.cuePanel.hidden = !state.ready;
  els.cueLabel.textContent = choosingStarter ? c.startersTitle : state.mode === "guided" ? c.coachThis : c.sayThis;
  els.newBtn.textContent = c.newLine;
  els.newBtn.disabled = runtime.locked.has("new");
  els.primaryCue.hidden = choosingStarter;
  els.moreStartersBtn.hidden = !choosingStarter;
  els.moreStartersBtn.textContent = c.more;
  els.flipBtn.hidden = choosingStarter || !state.currentLine;
  els.flipBtn.textContent = state.mode === "direct" ? c.toCoach : c.toSay;
  const flipKey = cacheKey("transform", "", { targetMode: state.mode === "direct" ? "guided" : "direct" });
  els.flipBtn.disabled = runtime.locked.has(`use:transform::${state.mode === "direct" ? "guided" : "direct"}`);
  els.flipBtn.classList.toggle("warming", Boolean(state.currentLine) && runtime.inFlight.has(flipKey));
  els.flipBtn.classList.toggle("ready", Boolean(state.currentLine) && runtime.prefetched.has(flipKey));
  els.primaryCue.textContent = runtime.error || state.currentLine || c.configure;
  els.primaryCue.classList.toggle("error", Boolean(runtime.error));
  els.cueIntent.hidden = choosingStarter || !state.intent;
  els.cueIntent.textContent = state.intent || "";
  els.waitToast.textContent = c.wait;
  els.topicTitle.textContent = c.topicTitle;
  els.wildBtn.textContent = c.randomTopic;
  els.wildBtn.disabled = runtime.locked.has("use:wild_pivot::");
  els.showTopicsBtn.textContent = c.topicTitle;
  els.showFreshBtn.textContent = c.showFresh;
  const wildKey = cacheKey("wild_pivot");
  els.wildBtn.classList.toggle("warming", Boolean(state.currentLine) && runtime.inFlight.has(wildKey));
  els.wildBtn.classList.toggle("ready", Boolean(state.currentLine) && runtime.prefetched.has(wildKey));
  els.resetBtn.textContent = c.reset;
  renderStarters();
  renderFresh();
  renderActions();
  renderTopics();
}

function setButtonsDisabled(root, disabled) {
  root.querySelectorAll("button").forEach(btn => {
    btn.disabled = disabled;
  });
}

function renderStarters() {
  const choosingStarter = state.ready && !state.currentLine;
  els.starterGrid.hidden = !choosingStarter;
  els.starterGrid.innerHTML = "";
  if (!choosingStarter) return;
  state.starters.forEach(starter => els.starterGrid.appendChild(starterButton(starter, "starter-btn")));
}

function renderFresh() {
  els.freshGrid.hidden = !state.currentLine || !state.freshStarters.length || state.panel === "fresh-hidden";
  els.freshGrid.innerHTML = "";
  if (els.freshGrid.hidden) return;
  state.freshStarters.slice(0, 3).forEach(starter => els.freshGrid.appendChild(starterButton(starter, "fresh-btn")));
}

function starterButton(starter, className) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = className;
    btn.disabled = runtime.locked.has("chooseStarter");
  btn.innerHTML = `<strong>${escapeHtml(starter.topic || "")}</strong><span>${escapeHtml(starter.line)}</span>`;
  btn.addEventListener("click", () => chooseStarter(starter));
  return btn;
}

function renderActions() {
  const labels = copy[state.language].actionLabels;
  els.actionGrid.innerHTML = "";
  els.actionGrid.hidden = state.ready && !state.currentLine;
  state.actions.forEach(action => {
    const key = cacheKey(action.id);
    const ready = runtime.prefetched.has(key);
    const loading = runtime.inFlight.has(key);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `action-btn ${ready ? "ready" : loading ? "warming" : ""}`;
    btn.disabled = runtime.locked.has(`use:${action.id}::`);
    btn.innerHTML = `<strong>${escapeHtml(labels[action.id] || action.label)}</strong><span>${escapeHtml(action.hint || "")}</span>`;
    btn.addEventListener("click", () => useMove(action.id));
    els.actionGrid.appendChild(btn);
  });
}

function renderTopics() {
  els.topicGrid.innerHTML = "";
  els.topicGrid.hidden = state.ready && !state.currentLine;
  els.topicPanel.hidden = state.panel !== "topics" || !state.currentLine;
  state.topicOptions.forEach(topic => {
    const key = cacheKey("topic", topic);
    const ready = runtime.prefetched.has(key);
    const loading = runtime.inFlight.has(key);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `topic-btn ${ready ? "ready" : loading ? "warming" : ""}`;
    btn.disabled = runtime.locked.has(`use:topic:${topic}:`);
    btn.textContent = topic;
    btn.addEventListener("click", () => {
      useMove("topic", topic);
    });
    els.topicGrid.appendChild(btn);
  });
}

function isPrefetchCoolingDown(key) {
  const failedAt = runtime.failedPrefetch.get(key);
  if (!failedAt) return false;
  if (Date.now() - failedAt > PREFETCH_FAILED_TTL_MS) {
    runtime.failedPrefetch.delete(key);
    return false;
  }
  return true;
}

async function loadStatus() {
  try {
    const response = await fetch("/api/status");
    const data = await response.json();
    runtime.canGenerate = Boolean(data.aiAvailable);
  } catch {
    runtime.canGenerate = false;
  }
}

async function apiNext(action, requestedTopic = "", extra = {}) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), extra.timeoutMs || LIVE_TIMEOUT_MS);
  try {
    const response = await fetch("/api/next", {
      method: "POST",
      headers: { "content-type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        language: state.language,
        mode: state.mode,
        targetMode: extra.targetMode || "",
        tone: state.tone,
        conversationType: state.conversationType,
        topic: state.topic,
        action,
        requestedTopic,
        currentLine: state.currentLine,
        microContext: state.microContext,
        recent: state.recent
      })
    });
    const data = await response.json();
    if (!response.ok || data.error) throw new Error(data.error || "Request failed");
    return data;
  } finally {
    window.clearTimeout(timeout);
  }
}

function cacheKey(action, requestedTopic = "", extra = {}) {
  return [
    state.language,
    state.mode,
    extra.targetMode || "",
    state.tone,
    state.conversationType,
    state.currentLine,
    action,
    requestedTopic
  ].join("|");
}

async function startConversation() {
  state.ready = true;
  state.currentLine = "";
  state.intent = "";
  state.actions = [];
  state.topicOptions = [];
  state.freshStarters = [];
  state.starters = instantStarters();
  runtime.error = "";
  render();
  saveState();
  prefetchStarters("initial", false);
}

async function prefetchStarters(key = "starters", replaceMain = false) {
  if (!runtime.canGenerate || runtime.inFlight.has(key) || runtime.inFlight.size >= MAX_BACKGROUND_JOBS) return;
  runtime.inFlight.add(key);
  syncBusy();
  render();
  try {
    const data = await apiNext("starter_pack", "", { timeoutMs: PREFETCH_TIMEOUT_MS });
    if (Array.isArray(data.starters) && data.starters.length) {
      if (replaceMain && !state.currentLine && !state.starters.length) state.starters = data.starters;
      else state.freshStarters = mergeStarters(state.freshStarters, data.starters);
      state.microContext = data.microContext || state.microContext;
      saveState();
    }
  } catch {
    if (!state.starters.length && !state.currentLine) runtime.error = copy[state.language].error;
  } finally {
    runtime.inFlight.delete(key);
    syncBusy();
    render();
  }
}

function mergeStarters(existing, incoming) {
  const seen = new Set(existing.map(item => item.line));
  const merged = [...existing];
  incoming.forEach(item => {
    if (item.line && !seen.has(item.line)) {
      seen.add(item.line);
      merged.push(item);
    }
  });
  return merged.slice(0, 12);
}

async function generate(action, requestedTopic = "", opts = {}) {
  const c = copy[state.language];
  if (!runtime.canGenerate) {
    runtime.error = c.configure;
    render();
    return;
  }
  const requestLine = state.currentLine;
  const liveKey = `live:${action}:${requestedTopic}:${opts.targetMode || ""}:${requestLine}`;
  if (runtime.inFlight.has(liveKey)) return;
  runtime.inFlight.add(liveKey);
  const showBusy = opts.showBusy !== false;
  if (showBusy) {
    runtime.busy = true;
    runtime.error = "";
    render();
  }
  try {
    const data = await apiNext(action, requestedTopic, { ...opts, timeoutMs: opts.timeoutMs || LIVE_TIMEOUT_MS });
    if (action === "controls" && requestLine !== state.currentLine) return;
    if (!data.primary) throw new Error("No line");
    applyMove(data, action, opts);
    if (action !== "controls") prefetchNextMoves();
  } catch {
    if (opts.showBusy !== false) runtime.error = c.error;
  } finally {
    runtime.inFlight.delete(liveKey);
    if (showBusy) runtime.busy = false;
    syncBusy();
    render();
    if (!runtime.error && action !== "controls") generate("controls", "", { showBusy: false, timeoutMs: PREFETCH_TIMEOUT_MS });
    if (!runtime.error && action === "controls" && !opts.skipPrefetch) prefetchNextMoves();
  }
}

function applyMove(data, action, opts = {}) {
  if (state.currentLine && action !== "controls") state.recent = [...state.recent.slice(-7), state.currentLine];
  state.currentLine = data.primary;
  if (action === "topic" && opts.requestedTopic) state.topic = opts.requestedTopic;
  state.intent = data.intent || "";
  if (action === "controls") {
    state.actions = Array.isArray(data.actions) ? data.actions : state.actions;
    state.topicOptions = Array.isArray(data.topicOptions) ? data.topicOptions : state.topicOptions;
  } else {
    state.actions = defaultActions();
    state.topicOptions = defaultTopics();
  }
  state.microContext = data.microContext || state.microContext;
  if (action === "transform" && opts.targetMode) state.mode = opts.targetMode;
  runtime.error = "";
  saveState();
}

async function prefetchMove(action, requestedTopic = "", opts = {}) {
  if (!runtime.canGenerate || !state.currentLine) return;
  const key = cacheKey(action, requestedTopic, opts);
  const force = Boolean(opts.force);
  if (runtime.prefetched.has(key) || runtime.inFlight.has(key) || (!force && isPrefetchCoolingDown(key))) return;
  const isPriority = action === "pivot" || action === "wild_pivot" || action === "transform";
  if (!force && !isPriority && runtime.inFlight.size >= MAX_BACKGROUND_JOBS) return;
  runtime.inFlight.add(key);
  runtime.failedPrefetch.delete(key);
  render();
  try {
    const data = await apiNext(action, requestedTopic, { ...opts, timeoutMs: PREFETCH_TIMEOUT_MS });
    if (data.primary) runtime.prefetched.set(key, { data, action, requestedTopic, opts });
  } catch {
    runtime.failedPrefetch.set(key, Date.now());
  } finally {
    runtime.inFlight.delete(key);
    syncBusy();
    render();
  }
}

function prefetchNextMoves() {
  if (!state.currentLine || !runtime.canGenerate) return;
  const priority = state.actions.find(action => action.id === "pivot");
  if (priority) prefetchMove(priority.id);
  state.actions.filter(action => action.id !== "pivot").forEach(action => prefetchMove(action.id));
  state.topicOptions.forEach(topic => prefetchMove("topic", topic));
  prefetchMove("wild_pivot");
  prefetchMove("transform", "", { targetMode: state.mode === "direct" ? "guided" : "direct" });
  prefetchStarters(`fresh-${Date.now()}`, false);
}

async function useMove(action, requestedTopic = "", opts = {}) {
  const finalOpts = action === "transform" && !opts.targetMode
    ? { ...opts, targetMode: state.mode === "direct" ? "guided" : "direct" }
    : opts;
  const lockKey = `use:${action}:${requestedTopic}:${finalOpts.targetMode || ""}`;
  if (runtime.locked.has(lockKey)) return;
  runtime.locked.add(lockKey);
  render();
  const key = cacheKey(action, requestedTopic, finalOpts);
  const cached = runtime.prefetched.get(key);
  if (cached) {
    runtime.prefetched.delete(key);
    applyMove(cached.data, action, { ...finalOpts, requestedTopic });
    render();
    prefetchNextMoves();
    generate("controls", "", { showBusy: false, skipPrefetch: true });
    runtime.locked.delete(lockKey);
    render();
    return;
  }
  await generate(action, requestedTopic, { ...finalOpts, requestedTopic, showBusy: true });
  runtime.locked.delete(lockKey);
  render();
}

function showWait() {
  const c = copy[state.language];
  els.waitToast.textContent = c.wait;
  els.waitToast.hidden = false;
  window.clearTimeout(showWait.timer);
  showWait.timer = window.setTimeout(() => {
    els.waitToast.hidden = true;
  }, 1400);
}

function chooseStarter(starter) {
  if (runtime.locked.has("chooseStarter")) return;
  runtime.locked.add("chooseStarter");
  if (state.currentLine) state.recent = [...state.recent.slice(-7), state.currentLine];
  state.currentLine = starter.line;
  state.topic = starter.topic || "";
  state.intent = starter.intent || "";
  state.starters = [];
  state.freshStarters = state.freshStarters.filter(item => item.line !== starter.line);
  state.actions = defaultActions();
  state.topicOptions = defaultTopics();
  state.panel = "";
  runtime.error = "";
  render();
  saveState();
  prefetchNextMoves();
  generate("controls", "", { showBusy: false, skipPrefetch: true }).finally(() => {
    runtime.locked.delete("chooseStarter");
    render();
  });
}

function render() {
  const c = copy[state.language];
  els.screenTitle.textContent = c.brand;
  renderSetup();
  renderCue();
}

document.querySelectorAll("[data-lang]").forEach(btn => btn.addEventListener("click", event => {
  event.stopPropagation();
  setLanguage(btn.dataset.lang);
}));
els.setupBackBtn.addEventListener("click", () => {
  state.setupStep = Math.max(0, state.setupStep - 1);
  render();
  saveState();
});
els.topbar.addEventListener("click", () => resetAll(true));
els.startBtn.addEventListener("click", startConversation);
els.newBtn.addEventListener("click", () => {
  if (runtime.locked.has("new")) return;
  runtime.locked.add("new");
  state.currentLine = "";
  state.intent = "";
  state.actions = [];
  state.topicOptions = [];
  state.starters = state.freshStarters.length ? state.freshStarters : instantStarters();
  state.freshStarters = [];
  render();
  saveState();
  prefetchStarters(`new-${Date.now()}`, false).finally(() => {
    runtime.locked.delete("new");
    render();
  });
});
els.flipBtn.addEventListener("click", () => useMove("transform"));
els.wildBtn.addEventListener("click", () => useMove("wild_pivot"));
els.showTopicsBtn.addEventListener("click", () => {
  if (!state.currentLine) {
    state.starters = instantStarters();
    state.panel = "";
    render();
    saveState();
    prefetchStarters(`topic-starters-${Date.now()}`, false);
    return;
  }
  state.panel = state.panel === "topics" ? "" : "topics";
  render();
  saveState();
});
els.showFreshBtn.addEventListener("click", () => {
  if (!state.currentLine) {
    if (state.freshStarters.length) {
      state.starters = state.freshStarters.splice(0, 6);
      render();
      saveState();
      prefetchStarters(`ready-starters-${Date.now()}`, false);
    } else {
      showWait();
    }
    return;
  }
  state.panel = state.panel === "fresh-hidden" ? "" : "fresh-hidden";
  render();
  saveState();
});
els.moreStartersBtn.addEventListener("click", () => {
  if (!state.ready || state.currentLine) return;
  if (state.freshStarters.length) {
    state.starters = state.freshStarters.splice(0, 6);
  } else {
    state.starters = instantStarters();
  }
  render();
  saveState();
  prefetchStarters(`more-starters-${Date.now()}`, false);
});
els.resetBtn.addEventListener("click", () => resetAll(true));
els.primaryCue.addEventListener("click", () => useMove("related"));

loadState();
setLanguage(state.language || "en");
loadStatus().then(() => {
  if (state.ready && !state.currentLine && !state.starters.length) {
    state.starters = instantStarters();
    render();
    prefetchStarters("resume", false);
  } else {
    render();
    if (state.ready && state.currentLine && !state.freshStarters.length) prefetchStarters("resume-fresh", false);
  }
});
