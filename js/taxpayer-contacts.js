(function () {
  var DATA_URL = 'data/taxpayer-contacts.json';
  var regions = [];

  function toTelHref(phone) {
    return 'tel:' + String(phone).replace(/[^\d+]/g, '');
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getRegionById(id) {
    for (var i = 0; i < regions.length; i++) {
      if (regions[i].id === id) return regions[i];
    }
    return null;
  }

  function renderPhones(phones) {
    if (!phones || !phones.length) return '—';

    return phones
      .map(function (phone) {
        return (
          '<div class="taxpayer-contacts__phone">' +
          '<a href="' +
          toTelHref(phone) +
          '">' +
          '<i class="bi bi-phone"></i>' +
          escapeHtml(phone) +
          '</a>' +
          '</div>'
        );
      })
      .join('');
  }

  function renderTable(region) {
    var tbody = document.getElementById('taxpayerContactsTableBody');
    var emptyEl = document.getElementById('taxpayerContactsEmpty');
    var tableWrap = document.getElementById('taxpayerContactsTable');

    if (!tbody) return;

    tbody.innerHTML = '';

    if (!region || !region.contacts || !region.contacts.length) {
      if (emptyEl) emptyEl.hidden = false;
      if (tableWrap) tableWrap.hidden = true;
      return;
    }

    if (emptyEl) emptyEl.hidden = true;
    if (tableWrap) tableWrap.hidden = false;

    region.contacts.forEach(function (contact) {
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td>' + escapeHtml(contact.name || '') + '</td>' + '<td>' + renderPhones(contact.phones) + '</td>';
      tbody.appendChild(tr);
    });
  }

  function fillSelect() {
    var select = document.getElementById('taxpayerContactsRegion');
    if (!select) return;

    select.innerHTML = '';

    regions.forEach(function (region, index) {
      var option = document.createElement('option');
      option.value = region.id;
      option.textContent = region.title;
      if (index === 0) option.selected = true;
      select.appendChild(option);
    });

    if (regions.length) {
      renderTable(regions[0]);
    }
  }

  function onRegionChange(event) {
    renderTable(getRegionById(event.target.value));
  }

  function init() {
    var select = document.getElementById('taxpayerContactsRegion');
    if (!select) return;

    fetch(DATA_URL)
      .then(function (response) {
        if (!response.ok) throw new Error('Failed to load contacts JSON');
        return response.json();
      })
      .then(function (data) {
        regions = (data && data.regions) || [];
        fillSelect();
        select.addEventListener('change', onRegionChange);
      })
      .catch(function (err) {
        console.error(err);
        var emptyEl = document.getElementById('taxpayerContactsEmpty');
        var tableWrap = document.getElementById('taxpayerContactsTable');
        if (tableWrap) tableWrap.hidden = true;
        if (emptyEl) {
          emptyEl.hidden = false;
          emptyEl.textContent = 'Не удалось загрузить данные контактов.';
        }
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
