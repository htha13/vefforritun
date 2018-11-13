// const API_URL = '/example.json?domain=';
const API_URL = 'https://apis.is/isnic?domain=';

/**
 * Leit að lénum á Íslandi gegnum apis.is
 */
const program = (() => {
  let domains;

  function displayError(error) {
    const container = domains.querySelector('.results');

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    container.appendChild(document.createTextNode(error));
  }
  let helpCounter = 0;
  function helper(titill, info) {
     //const `${'element'}${helpCounter}``;   
  }

  function displayDomain(domainsList) {
    if (domainsList.length === 0) {
      displayError('Lén ekki skráð');
      return;
    }

    const [{ domain, registrantname }] = domainsList;

    const dl = document.createElement('dl');

    const domainElement = document.createElement('dt');
    domainElement.appendChild(document.createTextNode('Lén'));
    dl.appendChild(domainElement);

    const domainValueElement = document.createElement('dd');
    domainValueElement.appendChild(document.createTextNode(domain));
    dl.appendChild(domainValueElement);

    const registrantnameElement = document.createElement('dt');
    registrantnameElement.appendChild(document.createTextNode('Skráð'));
    dl.appendChild(registrantnameElement);

    const registrantnameValueElement = document.createElement('dd');
    registrantnameValueElement.appendChild(document.createTextNode(registrantname));
    dl.appendChild(registrantnameValueElement);

    const container = domains.querySelector('.results');

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    container.appendChild(dl);
  }

  function fetchData(uri) {
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
      console.log(input.value);
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
