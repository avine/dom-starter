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
    log(
      'nodeName = ' + node.nodeName,
      'nodeType = ' + node.nodeType,
      'nodeType === ELEMENT_NODE ? ' + (node.ELEMENT_NODE === node.nodeType),
    );
  },

  EventTarget(eventTarget: EventTarget) {
    log('It\'s time to click on the link above!');

    const onClick = function(event) {
      // Change the Anchor text
      (this as HTMLAnchorElement).innerText = 'You clicked!';

      // Remove click listener
      eventTarget.removeEventListener('click', onClick);

      // Dispatch an event
      const wow = new Event('wow');
      eventTarget.dispatchEvent(wow);
    };

    // Listen to "click"
    eventTarget.addEventListener('click', onClick);

    // Listen to "wow"
    eventTarget.addEventListener('wow', function(event) {
      (this as HTMLAnchorElement).innerText += ' Wow!';
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

function log(...args) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = '<div>' + args.join('</div><div>') + '</div>';
  document.getElementById('console').appendChild(wrapper);
}
