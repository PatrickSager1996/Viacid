 //Suchfunktion
 function searchProducts() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const productList = document.querySelectorAll('#productList data');
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = ''; // Vorherige Ergebnisse leeren

  productList.forEach(product => {
      const productName = product.textContent.toLowerCase();
      if (productName.includes(searchInput)) {
          const li = document.createElement('li');
          const productPrice = product.getAttribute('data-price');
          const productExpiry = product.getAttribute('data-expiry');
          const productLink = product.parentElement.href; // Link des Produkts
          const productImage = product.parentElement.querySelector('img').src; // Bild des Produkts
          
          li.innerHTML = `
              <img src="${productImage}" alt="${productName}" width="${productName}">
              Produkt: ${product.textContent} (Artikelnummer: ${product.getAttribute('value')}). <a href="${productLink}">Mehr erfahren</a>`;
          resultsContainer.appendChild(li);
      }
  });

  if (resultsContainer.innerHTML === '') {
      resultsContainer.innerHTML = '<li>Keine Ergebnisse gefunden</li>';
  }

  document.addEventListener('click', function(event) {
      const searchInput = document.getElementById('searchInput');
      const resultsContainer = document.getElementById('searchResults');
      
      // Überprüfen, ob der Klick außerhalb des Suchfeldes und der Ergebnisliste war
      if (!searchInput.contains(event.target) && !resultsContainer.contains(event.target)) {
          resultsContainer.innerHTML = ''; // Suchergebnisse löschen
      }
  });
}

//Kachel eins Scrollen
let isDragging = false;
let startX;
let scrollLeft;
let touchMoved = false; // Erkennung von Bewegungen

const containers = [
  { main: '.kachcontainer-one', scroll: '.grid-container-one' },
  { main: '.kachcontainer-two', scroll: '.grid-container-two' }
];

// Start des Draggings
function startDrag(e, mainContainer, scrollContainer) {
  isDragging = true;
  touchMoved = false; // Zurücksetzen
  startX = (e.pageX || e.touches[0].pageX) - mainContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
  mainContainer.style.cursor = 'grabbing';
}

// Ende des Draggings
function endDrag(mainContainer) {
  isDragging = false;
  mainContainer.style.cursor = 'grab';
}

// Bewegung während des Draggings
function dragMove(e, mainContainer, scrollContainer) {
  if (!isDragging) return;

  const x = (e.pageX || e.touches[0].pageX) - mainContainer.offsetLeft;
  const walk = x - startX; // Bewegung im Dragging
  scrollContainer.scrollLeft = scrollLeft - walk;

  if (Math.abs(walk) > 5) {
    touchMoved = true; // Wenn Bewegung erkannt wird, ist es kein einfacher Klick
  }
}

// Links innerhalb von Kacheln umwandeln
function makeLink(element) {
  const linkValue = element.getAttribute('data-link');
  if (!linkValue) return;

  const link = document.createElement('a');
  link.href = linkValue;
  link.className = element.className;
  link.innerHTML = element.innerHTML;
  element.replaceWith(link);
}

// Ereignisse hinzufügen
containers.forEach(({ main, scroll }) => {
  const mainContainer = document.querySelector(main);
  const scrollContainer = document.querySelector(scroll);

  // Maus-Events
  mainContainer.addEventListener('mousedown', (e) => {
    startDrag(e, mainContainer, scrollContainer);
  });

  mainContainer.addEventListener('mouseup', () => {
    endDrag(mainContainer);
  });

  mainContainer.addEventListener('mouseleave', () => {
    endDrag(mainContainer);
  });

  mainContainer.addEventListener('mousemove', (e) => {
    dragMove(e, mainContainer, scrollContainer);
  });

  // Touch-Events
  mainContainer.addEventListener('touchstart', (e) => {
    startDrag(e, mainContainer, scrollContainer);
  });

  mainContainer.addEventListener('touchend', (e) => {
    if (!touchMoved) {
      // Klick auslösen, wenn keine Bewegung
      const target = e.target.closest('a');
      if (target) {
        target.click();
      }
    }
    endDrag(mainContainer);
  });

  mainContainer.addEventListener('touchmove', (e) => {
    dragMove(e, mainContainer, scrollContainer);
    e.preventDefault(); // Touch-Scrollen verhindern
  });

  // Links erstellen
  mainContainer.querySelectorAll('.kacheln-one').forEach(makeLink);
});