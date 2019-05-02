let table = document.querySelector('table');
let trElement, tdElemenet;
let getOrders = () => {
     fetch('./order.json')
        .then(response => response.json())
         .then(orders => {
             myOrders = orders;
         });
};
let myOrders = getOrders();
myOrders.forEach(order => {
    trElement = document.createElement('tr');
    trElement.setAttribute('id', order['order_id']);
    trElement.addEventListener('click', handleEvent.bind(trElement));
    tdElemenet = document.createElement('td');
    tdElemenet.innerHTML = order['order_id'];
    trElement.appendChild(tdElemenet);
    tdElemenet = document.createElement('td');
    tdElemenet.innerHTML = order.customer['name'] + ' ' + order.customer['surname'];
    trElement.appendChild(tdElemenet);
    tdElemenet = document.createElement('td');
    tdElemenet.innerHTML = order.order_date;
    trElement.appendChild(tdElemenet);
    trElement.appendChild(tdElemenet);
    tdElemenet = document.createElement('td');
    tdElemenet.innerHTML = order.total_items;
    trElement.appendChild(tdElemenet);
    table.appendChild(trElement);
});
function handleEvent(e) {
    const id = this.getAttribute('id');
    let allDivs = document.querySelectorAll('tr div');
    for (let div of allDivs) {
        div.remove();
    }
    let order = myOrders.find(order => order['order_id'] === id);
    let divElem = document.createElement('div');
    let h4 = document.createElement('h4');
    h4.textContent = 'List of Items';
    divElem.appendChild(h4);
    let total = 0;
    let table = createItemTable();
    order.items.forEach(item => {
        total += item.price;
        appendItemRow(table, item);
    });
    divElem.appendChild(table);
    let h5 = document.createElement('h5');
    h5.textContent = 'Total: ' + total;
    divElem.appendChild(h5);
    this.appendChild(divElem);
}

function createItemTable() {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-striped');
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.textContent = 'Variety';
    tr.appendChild(th);
    th = document.createElement('th');
    th.textContent = 'Winery';
    tr.appendChild(th);
    th = document.createElement('th');
    th.textContent = 'Quantity';
    tr.appendChild(th);
    th = document.createElement('th');
    th.textContent = 'Price';
    tr.appendChild(th);
    thead.appendChild(tr);
    table.appendChild(thead);
    return table;
}

function appendItemRow(table, item) {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.textContent = item.variety;
    tr.appendChild(td);
    td = document.createElement('td');
    td.textContent = item.winery;
    tr.appendChild(td);
    td = document.createElement('td');
    td.textContent = item.quantity;
    tr.appendChild(td);
    td = document.createElement('td');
    td.textContent = item.price;
    tr.appendChild(td);
    table.appendChild(tr);
}

document.addEventListener('click', event => {
    let allDivs = document.querySelectorAll('tr div');
    for (let div of allDivs) {
        div.remove();
    }
}, true);

