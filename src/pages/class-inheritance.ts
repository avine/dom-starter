// Class inheritance of Anchor element
type Prototype = HTMLAnchorElement | HTMLElement | Element| Node | EventTarget | object;

const inspect: { [constructorName: string]: (prototype: Prototype) => void; } = {
  HTMLAnchorElement(htmlAnchorElement: HTMLAnchorElement) {
    // TODO...
  },

  HTMLElement(htmlElement: HTMLElement) {
    // TODO...
  },

  Element(element: Element) {
    // TODO...
  },

  Node(node: Node) {
    /*
    parentNode (parentElement)
    previousSibling
    nextSibling
    childNodes
    firstChild
    lastChild

    isConnected
    hasChildNodes
    contains

    appendChild
    inserBefore
    removeChild
    replaceChild
    cloneNode

    textContent
    getRootNode
    normalize
    */
    log(
      'nodeName = ' + node.nodeName,
      'nodeType = ' + node.nodeType,
      'nodeType === ELEMENT_NODE ? ' + (node.ELEMENT_NODE === node.nodeType),
    );
  },

  EventTarget(eventTarget: EventTarget) {
    log('It\'s time to click on the link above!');

    const onClick = function(event: Event) {
      // Change the inner text
      (this as HTMLElement).innerText = `A "${event.type}" event occured!`;

      // Remove click listener
      eventTarget.removeEventListener('click', onClick);

      // Dispatch an event (See also `CustomEvent`)
      const wow = new Event('wow');
      eventTarget.dispatchEvent(wow);
    };

    // Listen to "click"
    eventTarget.addEventListener('click', onClick);

    // Listen to "wow"
    eventTarget.addEventListener('wow', function(event: Event) {
      (this as HTMLElement).innerText += ' Wow!';
    });
  },

  Object(object: any) {
    // Attach any property!
    object.helloWorld = 'Hello World!';

    log(`object.helloWorld = "${object.helloWorld}"`);
  },
};

// ============================================================================

// Create an Anchor element
const anchor = document.createElement('a');
anchor.innerText = 'Hello World!';
anchor.setAttribute('href', '#clicked');

// Insert the Anchor in the "sandbox" element
document.getElementById('sandbox').appendChild(anchor);

// Get the "actions" container
const actions = document.getElementById('actions');

// Walk to the Anchor class prototypes with `Object.getPrototypeOf`
let proto: Prototype = anchor;
while (proto = Object.getPrototypeOf(proto)) { // tslint:disable-line:no-conditional-assignment
  const constructorName = proto.constructor.name;

  // Create an "action"
  const action = document.createElement('li');
  action.innerHTML = `<a href="#${constructorName}">${constructorName}</a>`;
  actions.appendChild(action);

  action.addEventListener('click', (event) => {
    // Once clicked, remove the "action" from the DOM
    actions.removeChild(action);

    // Inspect the prototype features!
    inspect[constructorName](anchor);
  });
}

// ============================================================================

const output = document.getElementById('output');
function log(...messages) {
  messages.forEach((message) => {
    const div = document.createElement('div');
    div.innerHTML = message;
    output.appendChild(div);
  });
}

// Empty the output on click
output.addEventListener('click', () => output.innerHTML = '');
