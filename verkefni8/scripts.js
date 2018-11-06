const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items.getElementsByClassName('item');
    _form.addEventListener('submit', formHandler);
    
    // remove
    const eyda = document.querySelectorAll('.item__button');
    for (let item of eyda) {
      item.addEventListener('click', deleteItem);
    }

    // add
    document.querySelector('.form__button').addEventListener('click',add);   
    

    //items.addEventListener('click', edit);
    // TODO láta hluti í _items virka

    //document.body.append(el('p', 'wtf', edit));
  }

  function formHandler(e) {
    e.preventDefault();

    console.log('halló heimur');
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    console.log("thetta er hlutur..");
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const newEle1 = el('li','item','');

    const newEle2 = el('input','item__checkbox','')
    newEle2.setAttribute('type','checkbox');

    const newEle3 = el('span','item__text','');
    const inputText = document.querySelector('.form__input');
    const txtValue = inputText.value;
    inputText.value ="";
    let txt = document.createTextNode(txtValue);
    console.log(txt);
    newEle3.appendChild(txt);

    const newEle4 = el('button', 'item__button', '');
    newEle4.appendChild(document.createTextNode('Eyða'));

    newEle1.appendChild(newEle2);
    newEle1.appendChild(newEle3);
    newEle1.appendChild(newEle4);
    document.querySelector('.items').appendChild(newEle1);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    let x = e.target.parentNode;
    x.parentNode.removeChild(x);
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const element = document.createElement(type);
    element.className = className;
    //element.addEventListener('click', clickHandler);

    return element;
  }

  return {
    init: init
  }
})();
