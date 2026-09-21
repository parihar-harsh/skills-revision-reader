(() => {
  // Study order is editorial and role-specific, not an occurrence statistic.
  const priorities = {
    all: [1, 14, 11, 10, 15, 16, 2, 3, 4, 9, 7, 8, 12, 17, 5, 6, 13],
    'sde-1': [14, 11, 15, 16, 1, 10, 2, 17],
    'frontend-react': [1, 4, 3, 2, 9, 5, 6],
    'backend-node': [1, 7, 9, 11, 10, 12, 8, 2],
    'full-stack-js': [1, 4, 7, 9, 11, 10, 3, 2, 12, 8, 5, 6],
    'mern-stack': [1, 4, 7, 9, 12, 8, 2, 3],
    'genai-app': [13, 9, 7, 1, 12, 2, 8, 4, 3],
  };
  window.READER_CATEGORY_PRIORITY = priorities;

  window.createReaderExamples = (questions, onChange) => {
    const examples = window.READER_QUESTION_EXAMPLES || {};
    const sources = window.READER_EXAMPLE_SOURCES || {};
    const list = document.getElementById('question-list');
    const panels = new Map();
    const expanded = new Set();
    const make = (tag, className, text) => {
      const node = document.createElement(tag);
      node.className = className;
      if (text !== undefined) node.textContent = text;
      return node;
    };

    for (const question of questions) {
      const number = Number(question.dataset.number);
      const example = examples[number];
      if (!example || typeof example.code !== 'string' || !example.code.trim()) continue;
      const diagram = example.language === 'Diagram';
      const toggle = make('button', 'example-toggle', diagram ? 'Quick diagram' : 'Code example');
      toggle.type = 'button';
      toggle.dataset.exampleToggle = String(number);
      toggle.id = `q-${number}-example-toggle`;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-controls', `q-${number}-example`);
      const panel = make('div', 'question-example');
      panel.id = `q-${number}-example`;
      panel.hidden = true;
      const wrapper = make('div', 'example-disclosure');
      wrapper.append(toggle, panel);
      question.querySelector('.answer-content').append(wrapper);
      panels.set(number, { panel, toggle, example });
      question.dataset.search += ` ${example.code} ${example.explanation}`.toLocaleLowerCase();
    }

    if (panels.size !== questions.length) {
      const warning = make('p', 'example-warning', 'Some revision examples could not load. Your questions and progress are still available. Reload to retry.');
      warning.setAttribute('role', 'status');
      list.before(warning);
    }

    function setOpen(number, open) {
      const entry = panels.get(number);
      if (!entry) return;
      const { panel, toggle, example } = entry;
      if (open && !panel.childElementCount) {
        const toolbar = make('div', 'example-toolbar');
        const label = make('span', 'example-language', example.language);
        const copy = make('button', 'example-copy', 'Copy');
        copy.type = 'button';
        copy.dataset.exampleCopy = String(number);
        copy.setAttribute('aria-label', `Copy ${example.language === 'Diagram' ? 'diagram' : 'code'} for Q${number}`);
        const status = make('span', 'example-copy-status');
        status.setAttribute('role', 'status');
        toolbar.append(label, status, copy);
        const pre = make('pre', 'example-code');
        pre.tabIndex = 0;
        pre.setAttribute('aria-label', `Q${number} ${example.language === 'Diagram' ? 'revision diagram' : example.language + ' example'}`);
        pre.append(make('code', '', example.code));
        const explanation = make('p', 'example-explanation', example.explanation);
        panel.append(toolbar, pre, explanation);
        const href = sources[example.source];
        if (typeof href === 'string' && href.startsWith('https://')) {
          const source = make('a', 'example-reference', 'Reference');
          source.href = href;
          source.target = '_blank';
          source.rel = 'noopener noreferrer';
          source.setAttribute('aria-label', `Technical reference for Q${number}`);
          panel.append(source);
        }
      }
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      if (open) expanded.add(number);
      else expanded.delete(number);
    }

    list.addEventListener('click', async (event) => {
      const toggle = event.target.closest('[data-example-toggle]');
      if (toggle) {
        const number = Number(toggle.dataset.exampleToggle);
        setOpen(number, !expanded.has(number));
        onChange();
        return;
      }
      const copy = event.target.closest('[data-example-copy]');
      if (!copy || copy.disabled) return;
      const { panel, example } = panels.get(Number(copy.dataset.exampleCopy));
      const status = panel.querySelector('.example-copy-status');
      copy.disabled = true;
      try {
        await navigator.clipboard.writeText(example.code);
        status.textContent = 'Copied';
      } catch {
        const pre = panel.querySelector('pre');
        const range = document.createRange();
        range.selectNodeContents(pre);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        pre.focus({ preventScroll: true });
        status.textContent = 'Selected. Use your browser Copy command.';
      } finally {
        copy.disabled = false;
      }
    });

    let orderedRole;
    const originalOrder = new Map(questions.map((question, index) => [question, index]));
    return {
      expanded: () => [...expanded],
      restore: (numbers) => numbers.forEach((number) => {
        // Preserve saved disclosures even if their optional data asset failed to load.
        expanded.add(number);
        setOpen(number, true);
      }),
      order: (role) => {
        const key = role || 'all';
        if (orderedRole === key) return;
        orderedRole = key;
        const order = [...new Set([...(priorities[key] || []), ...priorities.all])];
        const ranks = new Map(order.map((number, index) => [`section-${number}`, index]));
        questions.sort((a, b) => (ranks.get(a.dataset.section) - ranks.get(b.dataset.section))
          || originalOrder.get(a) - originalOrder.get(b));
        const nav = document.querySelector('.section-nav');
        for (const number of order) {
          const id = `section-${number}`;
          const group = list.querySelector(`[data-section-group='${id}']`);
          const button = nav.querySelector(`[data-section-button='${id}']`);
          if (group) list.append(group);
          if (button) nav.append(button);
        }
      },
    };
  };
})();
