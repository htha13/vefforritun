// const API_URL = '/example.json?domain=';
const API_URL = 'https://apis.is/isnic?domain=';

/**
 * Leit að lénum á Íslandi gegnum apis.is
 */
const program = (() => {
  let domains;

  function empty(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  function displayError(error) {
    const container = domains.querySelector('.results');

    empty(container);

    container.appendChild(document.createTextNode(error));
  }
  function helper(titill, info, descList) {
    const element = document.createElement('dt');
    element.appendChild(document.createTextNode(titill));
    descList.appendChild(element);

    const elementValue = document.createElement('dd');
    elementValue.appendChild(document.createTextNode(info));
    descList.appendChild(elementValue);
  }

  function displayDomain(domainsList) {
    if (domainsList.length === 0) {
      displayError('Lén er ekki skráð');
      return;
    }

    const container = domains.querySelector('.results');

    container.classList.toggle('loading');

    const [{
      domain, registrantname, address,
      country, email, registered, expires, lastChange,
    }] = domainsList;

    const dl = document.createElement('dl');
    function isoDate(date) {
      return new Date(date).toISOString().split('T')[0];
    }

    helper('Lén', domain, dl);
    helper('Skráð', isoDate(registered), dl);
    helper('Seinast breytt', isoDate(lastChange), dl);
    helper('Rennur út', isoDate(expires), dl);
    if (registrantname) helper('Skráningaraðili', registrantname, dl);
    if (email) helper('Netfang', email, dl);
    if (address) helper('Heimilisfang', address, dl);
    if (country) helper('Land', country, dl);

    empty(container);

    container.appendChild(dl);
  }

  function loading() {
    const container = domains.querySelector('.results');

    empty(container);

    const gif = document.createElement('IMG');
    gif.src = 'loading.gif';
    container.appendChild(gif);
    container.classList.toggle('loading');

    container.appendChild(document.createTextNode('Leita að léni...'));
  }

  function fetchData(uri) {
    loading();
    fetch(`${API_URL}${uri}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error('Villa kom upp');
      })
      .then((data) => {
        displayDomain(data.results);
      })
      .catch((error) => {
        displayError('Villa við að sækja gögn');
        console.error(error);
      });
  }

  function onSubmit(e) {
    e.preventDefault();
    const input = e.target.querySelector('input');

    if (input.value === '') {
      displayError('Lén verður að vera strengur');
    } else {
      fetchData(input.value);
    }
  }

  function init(_domains) {
    domains = _domains;

    const form = domains.querySelector('form');
    form.addEventListener('submit', onSubmit);
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const domains = document.querySelector('.domains');
  program.init(domains);
});
