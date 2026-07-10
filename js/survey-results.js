(function () {
  const CHART_COLORS = ['#4285f4', '#ea4335', '#fbbc04', '#34a853', '#ff6d01', '#46bdc6', '#7b1fa2', '#007a65'];

  let chartInstances = [];

  function getConfig() {
    return window.SurveyConfig || { surveyTitle: 'Результаты опроса', questions: [] };
  }

  function answersCountLabel(count) {
    const n = Math.abs(count) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) return count + ' ответов';
    if (n1 > 1 && n1 < 5) return count + ' ответа';
    if (n1 === 1) return count + ' ответ';
    return count + ' ответов';
  }

  function formatPercent(value, total) {
    if (!total) return '0%';
    return ((value / total) * 100).toFixed(1).replace('.', ',') + '%';
  }

  function resolveChartType(question) {
    if (question.chartType) return question.chartType;
    if (question.type === 'multiple') return 'hbar';
    if (question.options && question.options.length <= 5) return 'pie';
    return 'bar';
  }

  function destroyCharts() {
    chartInstances.forEach(function (chart) {
      try {
        chart.destroy();
      } catch (_) {}
    });
    chartInstances = [];
  }

  function pieLabelsPlugin() {
    return {
      id: 'surveyPieLabels',
      afterDatasetsDraw: function (chart) {
        if (chart.config.type !== 'pie' && chart.config.type !== 'doughnut') return;
        const ctx = chart.ctx;
        const dataset = chart.data.datasets[0];
        const total = dataset.data.reduce(function (sum, value) {
          return sum + value;
        }, 0);
        if (!total) return;

        chart.getDatasetMeta(0).data.forEach(function (arc, index) {
          const value = dataset.data[index];
          if (!value) return;
          const share = value / total;
          if (share < 0.04) return;
          const pos = arc.tooltipPosition();
          ctx.save();
          ctx.fillStyle = '#fff';
          ctx.font = '600 12px "Open Sans", sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(formatPercent(value, total), pos.x, pos.y);
          ctx.restore();
        });
      },
    };
  }

  function buildChartOptions(chartType, labels, values, percentBase) {
    const total =
      percentBase ||
      values.reduce(function (sum, value) {
        return sum + value;
      }, 0);

    if (chartType === 'pie') {
      return {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              data: values,
              backgroundColor: CHART_COLORS.slice(0, labels.length),
              borderWidth: 2,
              borderColor: '#fff',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const value = context.raw;
                  return context.label + ': ' + value + ' (' + formatPercent(value, total) + ')';
                },
              },
            },
          },
        },
        plugins: [pieLabelsPlugin()],
      };
    }

    const isHorizontal = chartType === 'hbar';

    return {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: CHART_COLORS.slice(0, labels.length),
            borderRadius: 4,
            barThickness: isHorizontal ? 22 : undefined,
          },
        ],
      },
      options: {
        indexAxis: isHorizontal ? 'y' : 'x',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (context) {
                const value = context.raw;
                return 'Ответов: ' + value + ' (' + formatPercent(value, total) + ')';
              },
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: { color: '#f0f0f0' },
            ticks: {
              precision: 0,
              display: isHorizontal,
            },
          },
          y: {
            beginAtZero: true,
            grid: { display: !isHorizontal, color: '#f0f0f0' },
            ticks: {
              precision: 0,
              display: !isHorizontal,
            },
          },
        },
      },
    };
  }

  function aggregateChoiceQuestion(question, responses) {
    const counts = {};
    (question.options || []).forEach(function (option) {
      counts[option.value] = 0;
    });

    const otherTexts = [];

    responses.forEach(function (response) {
      const answer = response.answers[question.id];

      if (question.type === 'single') {
        if (answer && counts[answer] !== undefined) counts[answer] += 1;
        return;
      }

      if (question.type === 'multiple' && Array.isArray(answer)) {
        answer.forEach(function (value) {
          if (counts[value] !== undefined) counts[value] += 1;
        });
      }

      if (question.otherField) {
        const otherText = (response.answers[question.otherField] || '').trim();
        if (otherText) otherTexts.push(otherText);
      }
    });

    const labels = (question.options || []).map(function (option) {
      return option.label;
    });
    const values = (question.options || []).map(function (option) {
      return counts[option.value] || 0;
    });

    const responseCount = responses.length;
    const percentBase =
      question.type === 'multiple'
        ? responseCount
        : values.reduce(function (sum, value) {
            return sum + value;
          }, 0);

    return {
      kind: 'chart',
      responseCount: responseCount,
      percentBase: percentBase,
      labels: labels,
      values: values,
      chartType: resolveChartType(question),
      otherTexts: otherTexts,
    };
  }

  function aggregateTextQuestion(question, responses) {
    const texts = responses
      .map(function (response) {
        return (response.answers[question.id] || '').trim();
      })
      .filter(Boolean);

    return {
      kind: 'text',
      responseCount: texts.length,
      texts: texts,
    };
  }

  function createLegend(labels, values, percentBase) {
    const total =
      percentBase ||
      values.reduce(function (sum, value) {
        return sum + value;
      }, 0);

    const legend = document.createElement('ul');
    legend.className = 'survey-results__legend';

    labels.forEach(function (label, index) {
      const value = values[index] || 0;
      const item = document.createElement('li');
      item.className = 'survey-results__legend-item';
      item.innerHTML =
        '<span class="survey-results__legend-dot" style="background-color:' +
        CHART_COLORS[index % CHART_COLORS.length] +
        '"></span>' +
        '<span class="survey-results__legend-label">' +
        label +
        '</span>' +
        '<span class="survey-results__legend-value">' +
        formatPercent(value, total) +
        '</span>';
      legend.appendChild(item);
    });

    return legend;
  }

  function createOtherTextsBlock(texts) {
    if (!texts.length) return null;

    const wrap = document.createElement('div');
    wrap.className = 'survey-results__other-texts';

    const title = document.createElement('div');
    title.className = 'survey-results__other-texts-title';
    title.textContent = 'Уточнения к варианту «Другое»';
    wrap.appendChild(title);

    const list = document.createElement('div');
    list.className = 'survey-results__text-list survey-results__text-list_compact';
    texts.forEach(function (text) {
      const item = document.createElement('div');
      item.className = 'survey-results__text-item';
      item.textContent = text;
      list.appendChild(item);
    });
    wrap.appendChild(list);

    return wrap;
  }

  function renderQuestionCard(question, stats) {
    const card = document.createElement('article');
    card.className = 'survey-results__card';
    card.setAttribute('data-question-type', stats.kind === 'text' ? 'text' : 'chart');

    const header = document.createElement('div');
    header.className = 'survey-results__card-header';
    header.innerHTML =
      '<h2 class="survey-results__card-title">' +
      question.title +
      '</h2>' +
      '<p class="survey-results__card-meta">' +
      answersCountLabel(stats.responseCount) +
      '</p>';
    card.appendChild(header);

    if (stats.kind === 'text') {
      if (!stats.texts.length) {
        const empty = document.createElement('p');
        empty.className = 'survey-results__empty';
        empty.textContent = 'Пока нет ответов на этот вопрос.';
        card.appendChild(empty);
        return card;
      }

      const list = document.createElement('div');
      list.className = 'survey-results__text-list';
      stats.texts.forEach(function (text) {
        const item = document.createElement('div');
        item.className = 'survey-results__text-item';
        item.textContent = text;
        list.appendChild(item);
      });
      card.appendChild(list);
      return card;
    }

    const body = document.createElement('div');
    body.className = 'survey-results__chart-layout';

    const chartWrap = document.createElement('div');
    chartWrap.className = 'survey-results__chart-wrap';
    const canvas = document.createElement('canvas');
    chartWrap.appendChild(canvas);
    body.appendChild(chartWrap);

    body.appendChild(createLegend(stats.labels, stats.values, stats.percentBase));
    card.appendChild(body);

    const otherBlock = createOtherTextsBlock(stats.otherTexts);
    if (otherBlock) card.appendChild(otherBlock);

    requestAnimationFrame(function () {
      const config = buildChartOptions(stats.chartType, stats.labels, stats.values, stats.percentBase);
      const chart = new Chart(canvas.getContext('2d'), config);
      chartInstances.push(chart);
    });

    return card;
  }

  function filterResponsesByDate(responses, dateFrom, dateTo) {
    return responses.filter(function (response) {
      const date = response.submittedAt;
      if (!date) return true;
      if (dateFrom && date < dateFrom) return false;
      if (dateTo && date > dateTo) return false;
      return true;
    });
  }

  function buildMockResponses() {
    return [
      {
        submittedAt: '2026-03-01',
        answers: {
          user_category: 'individual',
          visit_purpose: ['taxes_info', 'news'],
          homepage_content: 'Налоговый калькулятор и ссылки на электронные сервисы',
          relevance: '4',
          navigation: '4',
          tech_issues: 'rarely',
          sections_feedback: 'Удобен раздел для физических лиц. Сложно искать архивные новости.',
        },
      },
      {
        submittedAt: '2026-03-02',
        answers: {
          user_category: 'entrepreneur',
          visit_purpose: ['e_services', 'regulations'],
          homepage_content: 'Быстрый доступ к личному кабинету',
          relevance: '5',
          navigation: '5',
          tech_issues: 'almost_never',
          sections_feedback: 'Всё понятно, хотелось бы больше подсказок для ИП.',
        },
      },
      {
        submittedAt: '2026-03-03',
        answers: {
          user_category: 'organization',
          visit_purpose: ['regulations', 'contacts'],
          homepage_content: '',
          relevance: '3',
          navigation: '3',
          tech_issues: 'sometimes',
          sections_feedback: 'Раздел нормативных документов требует более удобного поиска.',
        },
      },
      {
        submittedAt: '2026-03-04',
        answers: {
          user_category: 'accountant',
          visit_purpose: ['taxes_info', 'regulations', 'e_services'],
          homepage_content: 'Актуальные разъяснения и формы отчётности',
          relevance: '4',
          navigation: '4',
          tech_issues: 'rarely',
          sections_feedback: 'Нормативка удобная, сервисы — средне.',
        },
      },
      {
        submittedAt: '2026-03-05',
        answers: {
          user_category: 'individual',
          visit_purpose: ['taxes_info', 'other'],
          visit_purpose_other: 'Проверка задолженности',
          homepage_content: 'Информация об уплате налогов для физлиц',
          relevance: '2',
          navigation: '2',
          tech_issues: 'often',
          sections_feedback: 'Сайт перегружен, сложно найти нужный раздел с первого раза.',
        },
      },
      {
        submittedAt: '2026-03-06',
        answers: {
          user_category: 'entrepreneur',
          visit_purpose: ['e_services'],
          homepage_content: 'Кнопки популярных сервисов',
          relevance: '5',
          navigation: '5',
          tech_issues: 'almost_never',
          sections_feedback: '',
        },
      },
    ];
  }

  async function fetchResponses(dateFrom, dateTo) {
    // const params = new URLSearchParams();
    // if (dateFrom) params.set('dateFrom', dateFrom);
    // if (dateTo) params.set('dateTo', dateTo);
    // const response = await fetch('/api/survey/results?' + params.toString());
    // if (!response.ok) throw new Error('Failed to load survey results');
    // return response.json();

    await new Promise(function (resolve) {
      setTimeout(resolve, 300);
    });
    return filterResponsesByDate(buildMockResponses(), dateFrom, dateTo);
  }

  function setLoadingState(isLoading) {
    const loaderEl = document.getElementById('surveyResultsLoader');
    const emptyEl = document.getElementById('surveyResultsEmpty');
    const container = document.getElementById('surveyResultsCards');
    const resultsBlock = document.querySelector('.survey-results');

    if (loaderEl) loaderEl.hidden = !isLoading;
    if (emptyEl && isLoading) emptyEl.hidden = true;
    if (container && isLoading) container.innerHTML = '';
    if (isLoading) {
      destroyCharts();
      const actionsEl = document.getElementById('surveyResultsActions');
      if (actionsEl) actionsEl.hidden = true;
    }
    if (resultsBlock) resultsBlock.setAttribute('aria-busy', isLoading ? 'true' : 'false');
  }

  function formatDateDisplay(iso) {
    const parts = iso.split('-');
    if (parts.length !== 3) return iso;
    return parts[2] + '.' + parts[1] + '.' + parts[0];
  }

  function updatePeriodLabel() {
    const periodEl = document.getElementById('surveyResultsPeriod');
    const dateFromInput = document.getElementById('surveyResultsDateFrom');
    const dateToInput = document.getElementById('surveyResultsDateTo');
    if (!periodEl) return;

    const from = dateFromInput ? dateFromInput.value : '';
    const to = dateToInput ? dateToInput.value : '';

    if (!from && !to) {
      periodEl.hidden = true;
      periodEl.textContent = '';
      return;
    }

    let text = 'Период: ';
    if (from) text += formatDateDisplay(from);
    if (from && to) text += ' — ';
    else if (!from && to) text += 'до ';
    if (to) text += formatDateDisplay(to);

    periodEl.textContent = text;
    periodEl.hidden = false;
  }

  function hasExportableResults() {
    const container = document.getElementById('surveyResultsCards');
    return !!(container && container.children.length);
  }

  function updateExportActions() {
    const actionsEl = document.getElementById('surveyResultsActions');
    if (!actionsEl) return;
    actionsEl.hidden = !hasExportableResults();
  }

  function replaceChartsWithImages(root) {
    const replacements = [];

    root.querySelectorAll('canvas').forEach(function (canvas) {
      const img = document.createElement('img');
      img.src = canvas.toDataURL('image/png');
      img.alt = '';
      img.className = 'survey-results__chart-export-img';
      img.style.width = '100%';
      img.style.height = 'auto';
      canvas.parentNode.insertBefore(img, canvas);
      canvas.style.display = 'none';
      replacements.push({ canvas: canvas, img: img });
    });

    return replacements;
  }

  function restoreChartsFromImages(replacements) {
    replacements.forEach(function (item) {
      item.img.remove();
      item.canvas.style.display = '';
    });
  }

  function setPdfExportState(isExporting, progressText) {
    const pdfLoader = document.getElementById('surveyResultsPdfLoader');
    const pdfLoaderText = document.getElementById('surveyResultsPdfLoaderText');
    const pdfBtn = document.getElementById('surveyResultsPdfBtn');
    const printBtn = document.getElementById('surveyResultsPrintBtn');

    if (pdfLoader) pdfLoader.hidden = !isExporting;
    if (pdfLoaderText) pdfLoaderText.textContent = progressText || 'Формирование PDF…';
    document.body.classList.toggle('survey-results-pdf-exporting', isExporting);
    if (pdfBtn) pdfBtn.disabled = isExporting;
    if (printBtn) printBtn.disabled = isExporting;
  }

  function buildPdfFileName() {
    const config = getConfig();
    const fileName =
      (config.surveyTitle || 'survey-results')
        .replace(/[\\/:*?"<>|]+/g, '')
        .trim()
        .replace(/\s+/g, '-') + '.pdf';
    return fileName || 'survey-results.pdf';
  }

  const PDF_CAPTURE_WIDTH_PX = 900;
  const PDF_CAPTURE_SCALE = 2;
  const PDF_MARGIN_MM = 10;
  const PDF_PAGE_WIDTH_MM = 210;
  const PDF_PAGE_HEIGHT_MM = 297;

  function preparePdfCaptureNode(root) {
    root.querySelectorAll('.survey-results__text-list').forEach(function (list) {
      list.classList.add('survey-results__text-list_pdf');
      list.style.maxHeight = 'none';
      list.style.overflow = 'visible';
    });
  }

  function buildCardCloneForCapture(card) {
    const clone = card.cloneNode(true);
    preparePdfCaptureNode(clone);

    const liveCanvas = card.querySelector('canvas');
    const clonedCanvas = clone.querySelector('canvas');
    if (liveCanvas && clonedCanvas) {
      const img = document.createElement('img');
      img.src = liveCanvas.toDataURL('image/png');
      img.alt = '';
      img.className = 'survey-results__chart-export-img';
      img.style.width = '100%';
      img.style.height = 'auto';
      clonedCanvas.parentNode.replaceChild(img, clonedCanvas);
    }

    return clone;
  }

  async function captureBlock(blockElement, captureRoot) {
    captureRoot.innerHTML = '';
    captureRoot.appendChild(blockElement);
    preparePdfCaptureNode(captureRoot);

    return html2canvas(captureRoot, {
      scale: PDF_CAPTURE_SCALE,
      backgroundColor: '#ffffff',
      useCORS: true,
      logging: false,
    });
  }

  function getPdfMaxBlockHeightPx() {
    const contentWidth = PDF_PAGE_WIDTH_MM - PDF_MARGIN_MM * 2;
    const contentHeight = PDF_PAGE_HEIGHT_MM - PDF_MARGIN_MM * 2;
    return Math.floor((PDF_CAPTURE_WIDTH_PX * contentHeight) / contentWidth);
  }

  function measureBlockHeight(blockElement, captureRoot) {
    captureRoot.innerHTML = '';
    captureRoot.appendChild(blockElement);
    preparePdfCaptureNode(captureRoot);
    return captureRoot.scrollHeight;
  }

  function buildOtherAnswerBlocks(items, captureRoot, titleText) {
    const maxHeightPx = getPdfMaxBlockHeightPx();
    const blocks = [];
    let itemIndex = 0;
    let pageIndex = 0;

    while (itemIndex < items.length) {
      const block = document.createElement('div');
      const pageCard = document.createElement('article');
      pageCard.className = 'survey-results__card';

      const otherWrap = document.createElement('div');
      otherWrap.className = 'survey-results__other-texts';

      const title = document.createElement('div');
      title.className = 'survey-results__other-texts-title';
      title.textContent = pageIndex === 0 ? titleText : titleText + ' (продолжение)';
      otherWrap.appendChild(title);

      const list = document.createElement('div');
      list.className = 'survey-results__text-list survey-results__text-list_pdf';
      otherWrap.appendChild(list);
      pageCard.appendChild(otherWrap);
      block.appendChild(pageCard);

      let addedCount = 0;

      while (itemIndex < items.length) {
        list.appendChild(items[itemIndex].cloneNode(true));
        const height = measureBlockHeight(block, captureRoot);

        if (height > maxHeightPx) {
          if (addedCount === 0) {
            itemIndex += 1;
            addedCount += 1;
          } else {
            list.removeChild(list.lastChild);
          }
          break;
        }

        itemIndex += 1;
        addedCount += 1;
      }

      blocks.push(block);
      pageIndex += 1;
    }

    return blocks;
  }

  function buildChartCardBlocks(card, captureRoot, options) {
    const config = options || {};
    const sourceCard = buildCardCloneForCapture(card);
    const otherBlock = sourceCard.querySelector('.survey-results__other-texts');
    const otherItems = otherBlock
      ? Array.prototype.slice.call(otherBlock.querySelectorAll('.survey-results__text-item'))
      : [];
    const otherTitleEl = sourceCard.querySelector('.survey-results__other-texts-title');
    const titleText = otherTitleEl ? otherTitleEl.textContent : 'Уточнения к варианту «Другое»';

    const mainCard = buildCardCloneForCapture(card);
    const otherInClone = mainCard.querySelector('.survey-results__other-texts');
    if (otherInClone) otherInClone.remove();

    const mainBlock = document.createElement('div');
    if (config.includeTitleOnFirstPage) {
      if (config.titleEl) mainBlock.appendChild(config.titleEl.cloneNode(true));
      if (config.periodEl && !config.periodEl.hidden) mainBlock.appendChild(config.periodEl.cloneNode(true));
    }
    mainBlock.appendChild(mainCard);

    if (!otherItems.length) {
      return [mainBlock];
    }

    return [mainBlock].concat(buildOtherAnswerBlocks(otherItems, captureRoot, titleText));
  }

  function buildTextCardBlocks(card, captureRoot, options) {
    const config = options || {};
    const includeTitleOnFirstPage = !!config.includeTitleOnFirstPage;
    const titleEl = config.titleEl || null;
    const periodEl = config.periodEl || null;
    const maxHeightPx = getPdfMaxBlockHeightPx();
    const sourceCard = buildCardCloneForCapture(card);
    const sourceHeader = sourceCard.querySelector('.survey-results__card-header');
    const sourceItems = Array.prototype.slice.call(
      sourceCard.querySelectorAll(
        '.survey-results__text-list:not(.survey-results__text-list_compact) > .survey-results__text-item',
      ),
    );

    if (!sourceHeader || !sourceItems.length) {
      const fallback = document.createElement('div');
      if (includeTitleOnFirstPage && titleEl) fallback.appendChild(titleEl.cloneNode(true));
      if (includeTitleOnFirstPage && periodEl && !periodEl.hidden) fallback.appendChild(periodEl.cloneNode(true));
      fallback.appendChild(sourceCard);
      return [fallback];
    }

    const blocks = [];
    let itemIndex = 0;
    let pageIndex = 0;

    while (itemIndex < sourceItems.length) {
      const block = document.createElement('div');
      if (pageIndex === 0 && includeTitleOnFirstPage) {
        if (titleEl) block.appendChild(titleEl.cloneNode(true));
        if (periodEl && !periodEl.hidden) block.appendChild(periodEl.cloneNode(true));
      }

      const pageCard = document.createElement('article');
      pageCard.className = 'survey-results__card';
      const header = sourceHeader.cloneNode(true);
      if (pageIndex > 0) {
        const meta = header.querySelector('.survey-results__card-meta');
        if (meta) meta.textContent = 'Продолжение';
      }
      pageCard.appendChild(header);

      const list = document.createElement('div');
      list.className = 'survey-results__text-list survey-results__text-list_pdf';
      pageCard.appendChild(list);
      block.appendChild(pageCard);

      let addedCount = 0;

      while (itemIndex < sourceItems.length) {
        list.appendChild(sourceItems[itemIndex].cloneNode(true));
        const height = measureBlockHeight(block, captureRoot);

        if (height > maxHeightPx) {
          if (addedCount === 0) {
            itemIndex += 1;
            addedCount += 1;
          } else {
            list.removeChild(list.lastChild);
          }
          break;
        }

        itemIndex += 1;
        addedCount += 1;
      }

      blocks.push(block);
      pageIndex += 1;
    }

    return blocks;
  }

  function addCanvasPageFit(doc, canvas, pageState) {
    const contentWidth = PDF_PAGE_WIDTH_MM - PDF_MARGIN_MM * 2;
    const contentHeight = PDF_PAGE_HEIGHT_MM - PDF_MARGIN_MM * 2;
    const imgWidth = contentWidth;
    const fullImgHeight = (canvas.height * imgWidth) / canvas.width;

    if (fullImgHeight <= contentHeight) {
      if (pageState.pageCount > 0) doc.addPage();
      pageState.pageCount++;
      doc.addImage(canvas.toDataURL('image/jpeg', 0.92), 'JPEG', PDF_MARGIN_MM, PDF_MARGIN_MM, imgWidth, fullImgHeight);
      return;
    }

    const pixelsPerMm = canvas.width / imgWidth;
    const sliceHeightPx = contentHeight * pixelsPerMm;
    let sourceY = 0;

    while (sourceY < canvas.height) {
      const currentHeightPx = Math.min(sliceHeightPx, canvas.height - sourceY);
      const currentHeightMm = currentHeightPx / pixelsPerMm;

      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = currentHeightPx;
      const ctx = sliceCanvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
      ctx.drawImage(canvas, 0, sourceY, canvas.width, currentHeightPx, 0, 0, canvas.width, currentHeightPx);

      if (pageState.pageCount > 0) doc.addPage();
      pageState.pageCount++;
      doc.addImage(sliceCanvas.toDataURL('image/jpeg', 0.92), 'JPEG', PDF_MARGIN_MM, PDF_MARGIN_MM, imgWidth, currentHeightMm);

      sourceY += currentHeightPx;
    }
  }

  function addPdfPageNumbers(doc) {
    const totalPages = doc.internal.getNumberOfPages();

    for (let page = 1; page <= totalPages; page++) {
      doc.setPage(page);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(114, 114, 112);
      doc.text(String(page) + ' / ' + String(totalPages), PDF_PAGE_WIDTH_MM / 2, PDF_PAGE_HEIGHT_MM - 5, {
        align: 'center',
      });
    }
  }

  function printResults() {
    if (!hasExportableResults()) return;
    window.print();
  }

  async function exportResultsPdf() {
    if (!hasExportableResults()) return;
    if (typeof html2canvas === 'undefined' || !window.jspdf) {
      window.alert('Не удалось загрузить библиотеки для экспорта в PDF.');
      return;
    }

    const titleEl = document.getElementById('surveyResultsTitle');
    const periodEl = document.getElementById('surveyResultsPeriod');
    const cards = Array.prototype.slice.call(
      document.querySelectorAll('#surveyResultsCards .survey-results__card'),
    );
    const captureRoot = document.createElement('div');
    captureRoot.className = 'survey-results__pdf-capture';
    document.body.appendChild(captureRoot);

    const totalSteps = cards.length;
    let step = 0;

    setPdfExportState(true, 'Формирование PDF…');

    try {
      const jsPDF = window.jspdf.jsPDF;
      const doc = new jsPDF('p', 'mm', 'a4');
      const pageState = { pageCount: 0 };

      if (cards[0].getAttribute('data-question-type') === 'text') {
        const firstBlocks = buildTextCardBlocks(cards[0], captureRoot, {
          includeTitleOnFirstPage: true,
          titleEl: titleEl,
          periodEl: periodEl,
        });

        setPdfExportState(true, 'Формирование PDF… (' + ++step + ' из ' + totalSteps + ')');
        for (let i = 0; i < firstBlocks.length; i++) {
          addCanvasPageFit(doc, await captureBlock(firstBlocks[i], captureRoot), pageState);
        }
      } else {
        const chartBlocks = buildChartCardBlocks(cards[0], captureRoot, {
          includeTitleOnFirstPage: true,
          titleEl: titleEl,
          periodEl: periodEl,
        });

        setPdfExportState(true, 'Формирование PDF… (' + ++step + ' из ' + totalSteps + ')');
        for (let i = 0; i < chartBlocks.length; i++) {
          addCanvasPageFit(doc, await captureBlock(chartBlocks[i], captureRoot), pageState);
        }
      }

      for (let i = 1; i < cards.length; i++) {
        setPdfExportState(
          true,
          'Формирование PDF… (' + ++step + ' из ' + totalSteps + ')',
        );
        if (cards[i].getAttribute('data-question-type') === 'text') {
          const textBlocks = buildTextCardBlocks(cards[i], captureRoot);
          for (let j = 0; j < textBlocks.length; j++) {
            addCanvasPageFit(doc, await captureBlock(textBlocks[j], captureRoot), pageState);
          }
        } else {
          const chartBlocks = buildChartCardBlocks(cards[i], captureRoot);
          for (let j = 0; j < chartBlocks.length; j++) {
            addCanvasPageFit(doc, await captureBlock(chartBlocks[j], captureRoot), pageState);
          }
        }
      }

      addPdfPageNumbers(doc);
      doc.save(buildPdfFileName());
    } catch (err) {
      console.error(err);
      window.alert('Не удалось сформировать PDF. Попробуйте ещё раз или используйте печать.');
    } finally {
      if (captureRoot.parentNode) captureRoot.parentNode.removeChild(captureRoot);
      setPdfExportState(false);
    }
  }

  function renderResults(responses) {
    const container = document.getElementById('surveyResultsCards');
    const emptyEl = document.getElementById('surveyResultsEmpty');
    const config = getConfig();

    destroyCharts();
    if (!container) return;

    container.innerHTML = '';

    if (!responses.length) {
      if (emptyEl) emptyEl.hidden = false;
      updatePeriodLabel();
      updateExportActions();
      return;
    }

    if (emptyEl) emptyEl.hidden = true;

    config.questions.forEach(function (question) {
      const stats =
        question.type === 'text'
          ? aggregateTextQuestion(question, responses)
          : aggregateChoiceQuestion(question, responses);

      container.appendChild(renderQuestionCard(question, stats));
    });

    updatePeriodLabel();
    updateExportActions();
  }

  async function loadResults() {
    const dateFromInput = document.getElementById('surveyResultsDateFrom');
    const dateToInput = document.getElementById('surveyResultsDateTo');
    const showBtn = document.getElementById('surveyResultsShowBtn');

    if (showBtn) showBtn.disabled = true;
    setLoadingState(true);

    try {
      const responses = await fetchResponses(
        (dateFromInput && dateFromInput.value) || '',
        (dateToInput && dateToInput.value) || '',
      );
      renderResults(responses);
    } finally {
      setLoadingState(false);
      if (showBtn) showBtn.disabled = false;
    }
  }

  function initSurveyResultsPage() {
    const showBtn = document.getElementById('surveyResultsShowBtn');
    const printBtn = document.getElementById('surveyResultsPrintBtn');
    const pdfBtn = document.getElementById('surveyResultsPdfBtn');
    const config = getConfig();
    const titleEl = document.getElementById('surveyResultsTitle');

    if (titleEl && config.surveyTitle) {
      titleEl.textContent = config.surveyTitle;
    }

    if (typeof Chart !== 'undefined') {
      Chart.defaults.font.family = '"Open Sans", sans-serif';
      Chart.defaults.color = '#727270';
    }

    if (showBtn) showBtn.addEventListener('click', loadResults);
    if (printBtn) printBtn.addEventListener('click', printResults);
    if (pdfBtn) pdfBtn.addEventListener('click', exportResultsPdf);
    loadResults();
  }

  window.SurveyResults = {
    init: initSurveyResultsPage,
    load: loadResults,
    render: renderResults,
    fetchResponses: fetchResponses,
    print: printResults,
    exportPdf: exportResultsPdf,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSurveyResultsPage);
  } else {
    initSurveyResultsPage();
  }
})();
