/**
 * Схема опроса. При изменении вопросов или вариантов ответов
 * достаточно обновить только этот файл — страница результатов подстроится автоматически.
 *
 * type:
 *   - single   — один вариант ответа (radio)
 *   - multiple — несколько вариантов (checkbox)
 *   - text     — открытый ответ
 *
 * chartType (только для single / multiple):
 *   - pie  — круговая диаграмма
 *   - bar  — столбчатая диаграмма
 *   - hbar — горизонтальная столбчатая диаграмма
 *
 * otherField — id поля с уточнением для варианта «другое» (type: multiple)
 */
window.SurveyConfig = {
  surveyTitle: 'Оцените удобство использования сайта МНС',

  questions: [
    {
      id: 'user_category',
      type: 'single',
      title: '1. К какой категории пользователей вы относитесь?',
      chartType: 'pie',
      options: [
        { value: 'individual', label: 'Физическое лицо' },
        { value: 'entrepreneur', label: 'Индивидуальный предприниматель' },
        { value: 'organization', label: 'Представитель организации' },
        { value: 'accountant', label: 'Бухгалтер / налоговый консультант' },
      ],
    },
    {
      id: 'visit_purpose',
      type: 'multiple',
      title: '2. С какой целью вы чаще всего посещаете сайт?',
      chartType: 'hbar',
      otherField: 'visit_purpose_other',
      options: [
        { value: 'taxes_info', label: 'Поиск информации о налогах' },
        { value: 'regulations', label: 'Поиск нормативных документов' },
        { value: 'e_services', label: 'Использование электронных сервисов' },
        { value: 'contacts', label: 'Поиск контактной информации' },
        { value: 'news', label: 'Получение новостей' },
        { value: 'other', label: 'Другое (укажите)' },
      ],
    },
    {
      id: 'homepage_content',
      type: 'text',
      title: '3. Какая информация, разделы или сервисы должны быть доступны с главной страницы сайта?',
    },
    {
      id: 'relevance',
      type: 'single',
      title: '4. Насколько актуальной и своевременно обновляемой вы считаете информацию на сайте?',
      chartType: 'bar',
      options: [
        { value: '1', label: '1 — совершенно не актуальна' },
        { value: '2', label: '2 — скорее не актуальна' },
        { value: '3', label: '3 — затрудняюсь оценить' },
        { value: '4', label: '4 — скорее актуальна' },
        { value: '5', label: '5 — полностью актуальна' },
      ],
    },
    {
      id: 'navigation',
      type: 'single',
      title: '5. Легко ли вам ориентироваться в структуре сайта (меню, разделы) и находить необходимую информацию?',
      chartType: 'bar',
      options: [
        { value: '1', label: '1 — очень сложно' },
        { value: '2', label: '2 — сложно' },
        { value: '3', label: '3 — средне' },
        { value: '4', label: '4 — легко' },
        { value: '5', label: '5 — очень легко' },
      ],
    },
    {
      id: 'tech_issues',
      type: 'single',
      title: '6. Часто ли вы сталкиваетесь с техническими проблемами при работе с сайтом?',
      chartType: 'pie',
      options: [
        { value: 'often', label: 'Часто' },
        { value: 'sometimes', label: 'Иногда' },
        { value: 'rarely', label: 'Редко' },
        { value: 'almost_never', label: 'Практически никогда' },
      ],
    },
    {
      id: 'sections_feedback',
      type: 'text',
      title: '7. Какие разделы сайта вы считаете наиболее удобными, а какие, по вашему мнению, требуют доработки?',
    },
  ],
};
