const PRODUCTS_API_URL = 'https://fakestoreapi.com/products';
const STORAGE_KEY = 'storeflow-cart';
const HISTORY_STORAGE_KEY = 'storeflow-purchase-history';

const state = {
  products: [],
  filteredProducts: [],
  cart: {},
};

const elements = {};

const TRANSLATIONS_BY_ID = {
  1: {
    title: 'Mochila Foldsack No. 1',
    description: 'Tu mochila perfecta para uso diario y paseos. Guarda tu laptop de hasta 15 pulgadas en la funda acolchada y todo lo demás en los bolsillos extra.',
  },
  2: {
    title: 'Camiseta casual premium de hombre',
    description: 'Diseño ajustado con manga larga raglán de contraste, tela suave y transpirable para usar todo el día.',
  },
  3: {
    title: 'Chaqueta de algodón para hombre',
    description: 'Chaqueta ligera de algodón con cierre frontal, ideal para capas y días más frescos.',
  },
  4: {
    title: 'Camiseta casual slim fit para hombre',
    description: 'Corte ajustado y suave, perfecta para un look moderno y cómodo.',
  },
  5: {
    title: 'Pulsera Legend Naga Oro y Plata',
    description: 'Pulsera de cadena con diseño de dragón y detalles en oro y plata, inspirada en la artesanía tradicional.',
  },
  6: {
    title: 'Collar pequeño de oro macizo',
    description: 'Collar de estilo clásico con micropavé, ideal para un look elegante y sofisticado.',
  },
  7: {
    title: 'Anillo princesa chapado en oro blanco',
    description: 'Anillo con piedra brillante y acabado brillante, perfecto para ocasiones especiales.',
  },
  8: {
    title: 'Aretes de búho doble en acero inoxidable',
    description: 'Aretes chapados en oro rosa con diseño de búho y doble pendiente para un toque único.',
  },
  9: {
    title: 'Disco duro portátil WD 2TB',
    description: 'Almacenamiento externo rápido con conexión USB 3.0 para llevar tus archivos a todas partes.',
  },
  10: {
    title: 'SSD interno SanDisk PLUS 1TB',
    description: 'Unidad interna SATA III con gran capacidad y velocidades mejoradas para tu PC o portátil.',
  },
  11: {
    title: 'SSD Silicon Power 256GB',
    description: 'SSD de alto rendimiento con caché SLC para acelerar el arranque y la carga de aplicaciones.',
  },
  12: {
    title: 'Disco duro para juegos WD 4TB',
    description: 'Unidad portátil compatible con PlayStation 4, diseñada para guardar juegos y contenido multimedia.',
  },
  13: {
    title: 'Monitor Acer SB220Q 21.5" Full HD',
    description: 'Pantalla Full HD ultradelgada con excelente claridad para el trabajo diario y entretenimiento.',
  },
  14: {
    title: 'Monitor curvo Samsung 49" CHG90',
    description: 'Pantalla ultra ancha de 144Hz para una experiencia inmersiva en juegos y multitarea.',
  },
  15: {
    title: 'Chaqueta 3 en 1 para mujer',
    description: 'Abrigo para nieve con forro removible, ideal para clima frío y actividades al aire libre.',
  },
  16: {
    title: 'Chaqueta de moto de cuero sintético para mujer',
    description: 'Chaqueta con capucha desmontable, estilo biker y acabado moderno.',
  },
  17: {
    title: 'Impermeable a rayas para mujer',
    description: 'Cortaviento ligero con capucha, perfecto para lluvia y aventuras al aire libre.',
  },
  18: {
    title: 'Camiseta de mujer de manga corta',
    description: 'Camiseta ligera con escote de barco, fácil de combinar y muy cómoda.',
  },
  19: {
    title: 'Camiseta deportiva de mujer',
    description: 'Camiseta de manga corta que absorbe la humedad para mantenerte fresca durante el ejercicio.',
  },
  20: {
    title: 'Camiseta casual DANVOUY para mujer',
    description: 'Camiseta de algodón suave con corte relajado, perfecta para el día a día.',
  },
};

document.addEventListener('DOMContentLoaded', init);

function init() {
  elements.productsGrid = document.getElementById('productsGrid');
  elements.emptyState = document.getElementById('emptyState');
  elements.searchInput = document.getElementById('searchInput');
  elements.categoryFilter = document.getElementById('categoryFilter');
  elements.sortSelect = document.getElementById('sortSelect');
  elements.cartItems = document.getElementById('cartItems');
  elements.cartCount = document.getElementById('cartCount');
  elements.cartCountBadge = document.getElementById('cartCountBadge');
  elements.subtotal = document.getElementById('subtotal');
  elements.shipping = document.getElementById('shipping');
  elements.total = document.getElementById('total');
  elements.checkoutBtn = document.getElementById('checkoutBtn');
  elements.viewHistoryBtn = document.getElementById('viewHistoryBtn');
  elements.cartDrawer = document.getElementById('cartDrawer');
  elements.cartToggleBtn = document.getElementById('cartToggleBtn');
  elements.drawerCloseBtn = document.getElementById('drawerCloseBtn');
  elements.continueShoppingBtn = document.getElementById('continueShoppingBtn');
  elements.clearCartBtn = document.getElementById('clearCartBtn');
  elements.checkoutModal = document.getElementById('checkoutModal');
  elements.historyModal = document.getElementById('historyModal');
  elements.historyCloseBtn = document.getElementById('historyCloseBtn');
  elements.historyList = document.getElementById('historyList');
  elements.closeModalBtn = document.getElementById('closeModalBtn');
  elements.checkoutForm = document.getElementById('checkoutForm');
  elements.checkoutSuccess = document.getElementById('checkoutSuccess');
  elements.orderSummary = document.getElementById('orderSummary');
  elements.paymentMethodInputs = document.querySelectorAll('input[name="paymentMethod"]');
  elements.cardNumberField = document.getElementById('cardNumberField');
  elements.cardNumberInput = document.getElementById('cardNumberInput');

  loadCartFromStorage();
  setupEvents();
  renderCart();
  loadProducts();
}

function setupEvents() {
  elements.searchInput.addEventListener('input', applyFilters);
  elements.categoryFilter.addEventListener('change', applyFilters);
  elements.sortSelect.addEventListener('change', applyFilters);
  elements.cartItems.addEventListener('click', handleCartActions);
  elements.cartToggleBtn.addEventListener('click', toggleCart);
  elements.drawerCloseBtn.addEventListener('click', closeCart);
  elements.continueShoppingBtn.addEventListener('click', closeCart);
  elements.clearCartBtn.addEventListener('click', clearCart);
  elements.cartDrawer.addEventListener('click', handleCartDrawerClick);
  elements.checkoutBtn.addEventListener('click', openCheckout);
  elements.viewHistoryBtn.addEventListener('click', openHistory);
  elements.checkoutModal.addEventListener('click', handleModalClick);
  elements.historyModal.addEventListener('click', handleModalClick);
  elements.closeModalBtn.addEventListener('click', closeCheckout);
  elements.historyCloseBtn.addEventListener('click', closeHistory);
  elements.checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  elements.paymentMethodInputs.forEach((input) => input.addEventListener('change', togglePaymentFields));
  elements.cardNumberInput.addEventListener('input', formatCardNumber);
  document.addEventListener('keydown', handleKeydown);
  togglePaymentFields();
}

async function loadProducts() {
  try {
    const response = await fetch(PRODUCTS_API_URL);
    if (!response.ok) {
      throw new Error(`No se pudieron cargar los productos. Código: ${response.status}`);
    }

    const data = await response.json();
    state.products = data;
    state.filteredProducts = data;
    translateProductTexts(state.products);
    translateCartProducts();
    populateCategories(data);
    renderProducts();
  } catch (error) {
    console.error(error);
    elements.productsGrid.innerHTML = '';
    elements.emptyState.classList.remove('hidden');
    elements.emptyState.textContent = 'No se pudieron cargar los productos en este momento.';
  }
}

function populateCategories(products) {
  const categories = [...new Set(products.map((product) => product.category))].sort();
  elements.categoryFilter.innerHTML = '<option value="all">Todas</option>';

  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = formatCategory(category);
    elements.categoryFilter.appendChild(option);
  });
}

function applyFilters() {
  const searchValue = elements.searchInput.value.toLowerCase().trim();
  const categoryValue = elements.categoryFilter.value;
  const sortValue = elements.sortSelect.value;

  let filtered = [...state.products];

  if (searchValue) {
    filtered = filtered.filter((product) => {
      const haystack = `${product.title} ${product.description} ${product.category}`.toLowerCase();
      return haystack.includes(searchValue);
    });
  }

  if (categoryValue !== 'all') {
    filtered = filtered.filter((product) => product.category === categoryValue);
  }

  switch (sortValue) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      break;
  }

  state.filteredProducts = filtered;
  renderProducts();
}

function renderProducts() {
  elements.productsGrid.innerHTML = '';

  if (!state.filteredProducts.length) {
    elements.emptyState.classList.remove('hidden');
    elements.emptyState.textContent = 'No se encontraron productos con esos criterios.';
    return;
  }

  elements.emptyState.classList.add('hidden');

  const fragment = document.createDocumentFragment();
  state.filteredProducts.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <div>
        <img class="product-card__image" src="${product.image}" alt="${product.title}" />
        <p class="product-card__category">${formatCategory(product.category)}</p>
        <h3>${product.title}</h3>
        <p class="product-card__description">${product.description}</p>
      </div>
      <div class="product-card__footer">
        <span class="product-card__price">$${product.price.toFixed(2)}</span>
        <button class="add-btn" type="button" data-action="add" data-id="${product.id}">Agregar</button>
      </div>
    `;

    card.querySelector('.add-btn').addEventListener('click', () => addToCart(product));
    fragment.appendChild(card);
  });

  elements.productsGrid.appendChild(fragment);
}

function addToCart(product) {
  const current = state.cart[product.id];

  if (current) {
    current.quantity += 1;
  } else {
    state.cart[product.id] = { product, quantity: 1 };
  }

  saveCart();
  renderCart();
}

function handleCartActions(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const { action, id } = button.dataset;

  if (action === 'increase') {
    updateQuantity(Number(id), 1);
  }

  if (action === 'decrease') {
    updateQuantity(Number(id), -1);
  }

  if (action === 'remove') {
    removeFromCart(Number(id));
  }
}

function updateQuantity(productId, delta) {
  const item = state.cart[productId];
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    delete state.cart[productId];
  }

  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  delete state.cart[productId];
  saveCart();
  renderCart();
}

function clearCart() {
  state.cart = {};
  saveCart();
  renderCart();
  closeCart();
}

function renderCart() {
  const items = Object.values(state.cart);

  if (!items.length) {
    elements.cartItems.innerHTML = '<p class="empty-state">Tu carrito está vacío. Agrega productos para empezar tu compra.</p>';
    elements.cartCount.textContent = '0 productos';
    elements.cartCountBadge.textContent = '0';
    elements.subtotal.textContent = '$0.00';
    elements.shipping.textContent = '$0.00';
    elements.total.textContent = '$0.00';
    elements.checkoutBtn.disabled = true;
    elements.checkoutBtn.classList.add('is-disabled');
    elements.checkoutBtn.textContent = 'Agrega productos';
    return;
  }

  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div class="cart-item__preview">
        <img class="cart-item__image" src="${item.product.image}" alt="${item.product.title}" />
      </div>
      <div class="cart-item__info">
        <span class="cart-item__title">${item.product.title}</span>
        <span>$${(item.product.price * item.quantity).toFixed(2)}</span>
      </div>
      <div class="cart-item__controls">
        <button class="qty-btn" type="button" data-action="decrease" data-id="${item.product.id}">−</button>
        <span>${item.quantity}</span>
        <button class="qty-btn" type="button" data-action="increase" data-id="${item.product.id}">+</button>
        <button class="remove-btn" type="button" data-action="remove" data-id="${item.product.id}">Eliminar</button>
      </div>
    `;
    fragment.appendChild(cartItem);
  });

  elements.cartItems.innerHTML = '';
  elements.cartItems.appendChild(fragment);

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 0 && subtotal < 100 ? 4.99 : 0;
  const total = subtotal + shipping;

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  elements.cartCount.textContent = `${itemCount} productos`;
  elements.cartCountBadge.textContent = `${itemCount}`;
  elements.subtotal.textContent = `$${subtotal.toFixed(2)}`;
  elements.shipping.textContent = `$${shipping.toFixed(2)}`;
  elements.total.textContent = `$${total.toFixed(2)}`;
  elements.checkoutBtn.disabled = false;
  elements.checkoutBtn.classList.remove('is-disabled');
  elements.checkoutBtn.textContent = 'Finalizar compra';
}

function toggleCart() {
  if (elements.cartDrawer.classList.contains('is-open')) {
    closeCart();
  } else {
    openCart();
  }
}

function openCart() {
  elements.cartDrawer.classList.add('is-open');
  elements.cartDrawer.setAttribute('aria-hidden', 'false');
  elements.cartToggleBtn.setAttribute('aria-expanded', 'true');
  document.body.classList.add('modal-open');
}

function closeCart() {
  elements.cartDrawer.classList.remove('is-open');
  elements.cartDrawer.setAttribute('aria-hidden', 'true');
  elements.cartToggleBtn.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('modal-open');
}

function handleCartDrawerClick(event) {
  if (event.target.matches('[data-action="close-cart"]')) {
    closeCart();
  }
}

function togglePaymentFields() {
  const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'tarjeta';
  const showCardField = selectedMethod === 'tarjeta';

  elements.cardNumberField.classList.toggle('hidden', !showCardField);
  elements.cardNumberInput.required = showCardField;

  if (!showCardField) {
    elements.cardNumberInput.value = '';
  }
}

function formatCardNumber(event) {
  const digits = event.target.value.replace(/\D/g, '').slice(0, 16);
  event.target.value = digits.replace(/(.{4})/g, '$1 ').trim();
}

function openCheckout() {
  if (!Object.keys(state.cart).length) return;
  elements.checkoutModal.classList.remove('hidden');
  elements.checkoutModal.classList.add('is-open');
  document.body.classList.add('modal-open');
  elements.checkoutSuccess.classList.add('hidden');
  elements.checkoutForm.classList.remove('hidden');
  elements.checkoutForm.reset();
  togglePaymentFields();
}

function closeCheckout() {
  elements.checkoutModal.classList.add('hidden');
  elements.checkoutModal.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  elements.checkoutSuccess.classList.add('hidden');
  elements.checkoutForm.classList.remove('hidden');
  elements.checkoutForm.reset();
}

function handleModalClick(event) {
  if (event.target.matches('[data-action="close-modal"]')) {
    closeCheckout();
  }
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    if (elements.checkoutModal.classList.contains('is-open')) {
      closeCheckout();
    }
    if (elements.cartDrawer.classList.contains('is-open')) {
      closeCart();
    }
  }
}

function handleCheckoutSubmit(event) {
  event.preventDefault();

  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;

  if (!paymentMethod) {
    window.alert('Selecciona un método de pago para continuar.');
    return;
  }

  if (paymentMethod === 'tarjeta') {
    const cardNumber = elements.cardNumberInput.value.replace(/\D/g, '');
    if (!cardNumber) {
      window.alert('Ingresa el número de tarjeta para completar la compra.');
      return;
    }

    if (!isValidCardNumber(cardNumber)) {
      window.alert('Ingresa un número de tarjeta válido de 13 a 16 dígitos.');
      return;
    }
  }

  if (!elements.checkoutForm.checkValidity()) {
    elements.checkoutForm.reportValidity();
    return;
  }

  const items = Object.values(state.cart);
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 0 && subtotal < 100 ? 4.99 : 0;
  const total = subtotal + shipping;
  const paymentLabel = paymentMethod === 'tarjeta' ? 'Tarjeta' : 'Contraentrega';
  const cardNumberDisplay = paymentMethod === 'tarjeta'
    ? `Número de tarjeta: ${maskCardNumber(elements.cardNumberInput.value)}`
    : 'Pago contra entrega';

  const summaryList = items
    .map((item) => `<li><span>${item.quantity} × ${item.product.title}</span><strong>$${(item.product.price * item.quantity).toFixed(2)}</strong></li>`)
    .join('');

  elements.orderSummary.innerHTML = `
    <h5>Recibo de compra</h5>
    <p class="order-summary__meta">${cardNumberDisplay}</p>
    <ul>${summaryList}</ul>
    <div class="order-summary__footer">
      <span>Método de pago</span>
      <span>${paymentLabel}</span>
    </div>
    <div class="order-summary__footer">
      <span>Subtotal</span>
      <span>$${subtotal.toFixed(2)}</span>
    </div>
    <div class="order-summary__footer">
      <span>Envío</span>
      <span>$${shipping.toFixed(2)}</span>
    </div>
    <div class="order-summary__footer order-summary__footer--total">
      <span>Total</span>
      <span>$${total.toFixed(2)}</span>
    </div>
  `;

  const historyEntry = createHistoryEntry(items, subtotal, shipping, total, paymentLabel);
  addCheckoutToHistory(historyEntry);

  state.cart = {};
  saveCart();
  renderCart();
  elements.checkoutForm.classList.add('hidden');
  elements.checkoutSuccess.classList.remove('hidden');
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
}

function loadCartFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    const parsed = JSON.parse(stored);
    if (parsed && typeof parsed === 'object') {
      state.cart = parsed;
    }
  } catch (error) {
    console.error('No fue posible recuperar el carrito guardado.', error);
  }
}

function getPurchaseHistory() {
  try {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('No fue posible leer el historial de compras.', error);
    return [];
  }
}

function addCheckoutToHistory(entry) {
  const history = getPurchaseHistory();
  history.unshift(entry);
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
}

function createHistoryEntry(items, subtotal, shipping, total, paymentLabel) {
  return {
    date: new Date().toISOString(),
    items: items.map((item) => ({
      id: item.product.id,
      title: item.product.title,
      unitPrice: item.product.price,
      quantity: item.quantity,
      totalPrice: item.product.price * item.quantity,
    })),
    subtotal,
    shipping,
    total,
    paymentMethod: paymentLabel,
  };
}

function openHistory() {
  renderHistory();
  elements.historyModal.classList.remove('hidden');
  elements.historyModal.classList.add('is-open');
  document.body.classList.add('modal-open');
}

function closeHistory() {
  elements.historyModal.classList.add('hidden');
  elements.historyModal.classList.remove('is-open');
  document.body.classList.remove('modal-open');
}

function renderHistory() {
  const history = getPurchaseHistory();

  if (!history.length) {
    elements.historyList.innerHTML = '<p class="empty-state">Aún no tienes compras guardadas. Finaliza al menos una compra para ver tu historial.</p>';
    return;
  }

  const fragment = document.createDocumentFragment();

  history.forEach((entry) => {
    const card = document.createElement('article');
    card.className = 'history-card';
    const date = new Date(entry.date).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const itemsMarkup = entry.items
      .map(
        (item) => `
          <li>
            <span>${item.quantity} × ${item.title}</span>
            <strong>$${item.totalPrice.toFixed(2)}</strong>
          </li>`
      )
      .join('');

    card.innerHTML = `
      <div class="history-card__header">
        <span>${date}</span>
        <strong>${entry.paymentMethod}</strong>
      </div>
      <ul class="history-card__items">${itemsMarkup}</ul>
      <div class="history-card__summary">
        <span>Subtotal</span><strong>$${entry.subtotal.toFixed(2)}</strong>
      </div>
      <div class="history-card__summary">
        <span>Envío</span><strong>$${entry.shipping.toFixed(2)}</strong>
      </div>
      <div class="history-card__summary history-card__summary--total">
        <span>Total</span><strong>$${entry.total.toFixed(2)}</strong>
      </div>
    `;

    fragment.appendChild(card);
  });

  elements.historyList.innerHTML = '';
  elements.historyList.appendChild(fragment);
}

function translateProductText(product) {
  const translation = TRANSLATIONS_BY_ID[product.id];
  if (translation) {
    product.title = translation.title;
    product.description = translation.description;
  }
}

function translateProductTexts(products) {
  products.forEach((product) => translateProductText(product));
}

function translateCartProducts() {
  Object.values(state.cart).forEach((item) => translateProductText(item.product));
}

function maskCardNumber(value) {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 4
    ? `**** **** **** ${digits.slice(-4)}`
    : '**** **** **** ****';
}

function isValidCardNumber(value) {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 13 && digits.length <= 16;
}

function formatCategory(category) {
  const categoryMap = {
    electronics: 'Electrónica',
    jewelery: 'Joyería',
    "men's clothing": 'Ropa de hombre',
    "women's clothing": 'Ropa de mujer',
  };

  if (categoryMap[category]) {
    return categoryMap[category];
  }

  return category.charAt(0).toUpperCase() + category.slice(1);
}
