// ---------- Handle change tab ----------
const tabTitles = document.getElementsByClassName('tab-widget__title');
const tabContents = document.getElementsByClassName('tab-widget__content');

// Set first tab is active
for (let i = 0; i < tabTitles.length; i++) {
  tabTitles[i].classList.remove('active');
}
tabTitles[0].classList.add('active');

// Set first tab content is active
for (let i = 0; i < tabContents.length; i++) {
  tabContents[i].style.display = 'none';
}
tabContents[0].style.display = 'block';

const onChangeTab = (event, tabName) => {
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = 'none';
  }

  for (let i = 0; i < tabTitles.length; i++) {
    tabTitles[i].classList.remove('active');
  }

  document.getElementById(tabName).style.display = 'block';
  event.currentTarget.classList.add('active');
};

// ---------- Handle select at shipping tab ----------
const formatDate = (date) => {
  var day = date.getDate();
  var month = date.getMonth() + 1;
  return day + '/' + month;
};

const currentDate = new Date();
document.getElementById('order-date').textContent = formatDate(currentDate);

const shippingMethodsSelect = document.getElementById('shipping-methods-select');
shippingMethodsSelect.addEventListener('change', () => {
  const selectedOption = shippingMethodsSelect.value;
  const deliveryDates = calculateDeliveryDates(currentDate, selectedOption);
  document.getElementById('start-date').textContent = formatDate(deliveryDates.start);
  document.getElementById('end-date').textContent = formatDate(deliveryDates.end);
});

const calculateDeliveryDates = (orderDate, shippingMethod) => {
  const startDate = new Date(orderDate);
  const endDate = new Date(orderDate);

  if (shippingMethod === 'standard') {
    startDate.setDate(startDate.getDate() + 5);
    endDate.setDate(endDate.getDate() + 7);
  } else if (shippingMethod === 'fast') {
    startDate.setDate(startDate.getDate() + 2);
    endDate.setDate(endDate.getDate() + 4);
  }
  return { start: startDate, end: endDate };
};

const defaultShippingMethod = shippingMethodsSelect.value;
const defaultDeliveryDates = calculateDeliveryDates(currentDate, defaultShippingMethod);
document.getElementById('start-date').textContent = formatDate(defaultDeliveryDates.start);
document.getElementById('end-date').textContent = formatDate(defaultDeliveryDates.end);
