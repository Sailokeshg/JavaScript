var tables = {
  table1: {
    cost: 0,
    items: 0,
    orders: {},
  },
  table2: {
    cost: 0,
    items: 0,
    orders: {},
  },
  table3: {
    cost: 0,
    items: 0,
    orders: {},
  },
  table4: {
    cost: 0,
    items: 0,
    orders: {},
  },
  table5: {
    cost: 0,
    items: 0,
    orders: {},
  },
  table6: {
    cost: 0,
    items: 0,
    orders: {},
  },
  table7: {
    cost: 0,
    items: 0,
    orders: {},
  },
};

const menu = {
  item1: {
    name: "Manchuria",
    cost: 180,
    category: "starter",
  },
  item2: {
    name: "Gobi-65",
    cost: 140,
    category: "starter",
  },
  item3: {
    name: "Tomato Soup",
    cost: 50,
    category: "starter",
  },
  item4: {
    name: "Paneer Butter Masala",
    cost: 240,
    category: "main course",
  },
  item5: {
    name: "Chicken Curry",
    cost: 300,
    category: "main course",
  },
  item6: {
    name: "Chicken Biryani",
    cost: 250,
    category: "main course",
  },
  item7: {
    name: "Roti",
    cost: 25,
    category: "indian bread",
  },
  item8: {
    name: "Gulab Jamun",
    cost: 50,
    category: "desserts",
  },
  item9: {
    name: "Apricot Delight",
    cost: 150,
    category: "desserts",
  },
  item10: {
    name: "Thumbs Up",
    cost: 30,
    category: "beverages",
  },
  item11: {
    name: "Lassi",
    cost: 50,
    category: "beverages",
  },
};

var tableId = document.getElementById("tables");
var menuId = document.getElementById("menu-items");
var modal = document.getElementById("modal");

function setup() {
  if (localStorage.getItem("tables") == null) {
    localStorage.setItem("tables", JSON.stringify(tables));
  }
  refreshTables();
  showMenu();
}


function createTableItem(i, cost, items) {
  let tableItem = `<div id="table-box" ondrop="drop(event,'table${i}')" ondragover="allowDrop(event)" onclick="openModal('table${i}')" >
    <h2>Table-${i}</h2>
    <p>
        Rs. <span id="cost">${cost}</span>
        |
        Total items
        <span id="items">${items}</span>
    </p>    
    </div>`;
  return tableItem;
}
// This function creates a menu Element as HTML Element and returns it as string

function createMenuItem(i, name, cost, category) {
  let menuItemEle = `<div id="item${i}"  class="menu-item" draggable="true" ondragstart="drag(event)">
          <h2> ${name} </h2>
          <p>
              Rs
              <span id="price">${cost}</span>  
              <span id="category">${category}</span>
          </p>
          </div>`;
  return menuItemEle;
}

function refreshTables() {
  let i = 1;
  tableId.innerHTML = "";
  tables = JSON.parse(localStorage.getItem("tables"));
  console.log(tables);
  while (tables["table" + i] != undefined) {
    let { cost, items } = tables["table" + i];
    let tableEle = createTableItem(i, cost, items);
    tableId.innerHTML += tableEle;
    i = i + 1;
  }
}

function showMenu() {
  menuId.innerHTML = "";
  let i = 1;
  while (menu["item" + i] != undefined) {
    let { name, cost, category } = menu["item" + i];
    let menuItemEle = createMenuItem(i, name, cost, category);
    menuId.innerHTML += menuItemEle;
    i = i + 1;
  }
}

function searchTable() {
  let searchKey = table_name.value;
  if (searchKey == "") {
    refreshTables();
    return;
  }
  let num = searchKey.split("-");
  if (num[1] != undefined && num[1] != "") {
    let tableNo = parseInt(num[1]);
    tables = JSON.parse(localStorage.getItem("tables"));

    if (tables["table" + tableNo] == undefined) return;

    let { cost, items } = tables["table" + tableNo];

    let tableEle = createTableItem(tableNo, cost, items);
    tableId.innerHTML = tableEle;
  }
}

function searchMenu() {
  let searchKey = menu_search.value;
  searchKey = searchKey.toLowerCase();
  if (searchKey == "") {
    showMenu();
  }
  if (searchKey.length <=1) return;
  let menuId = document.getElementById("menu-items");
  menuId.innerHTML = " ";
  let i = 1;
  while (menu["item" + i] != undefined) {
    let { name, cost, category } = menu["item" + i];
    let lowerCaseName = name.toLowerCase();
    if (lowerCaseName.includes(searchKey)) {
      let menuEle = createMenuItem(i, name, cost, category);
      menuId.innerHTML += menuEle;
    } else if (category.includes(searchKey)) {
      let menuEle = createMenuItem(i, name, cost, category);
      menuId.innerHTML += menuEle;
    }
    i = i + 1;
  }
}

function drag(event) {
  event.dataTransfer.setData("id", event.target.id);
  
}
function allowDrop(ev) {
  ev.preventDefault();
}
function drop(event, tableName) {
  event.preventDefault();
  addItemToTable(tableName, event.dataTransfer.getData("id"));
}

function addItemToTable(tableName, menuItemName) {
  console.log(tableName);
  console.log(menuItemName);
  let tables = JSON.parse(localStorage.getItem("tables"));
  console.log(tables);
  let currentOrder = menu[menuItemName];
  if (tables[tableName]["orders"][menuItemName] == undefined) {
    tables[tableName]["orders"][menuItemName] = 1;
  } else {
    tables[tableName]["orders"][menuItemName] += 1;
  }
  tables[tableName].cost += parseInt(currentOrder.cost);
  tables[tableName]["items"] += 1;
  localStorage.setItem("tables", JSON.stringify(tables));
  refreshTables();
  searchTable();
}

var tableInfoId = document.getElementById("table-info-items");

function openModal(tableName) {
  modal.style.display = "block";
  document.getElementById(
    "modal-table-name"
  ).innerHTML = `<h2> ${tableName.toUpperCase()}
   <\h2>`;
  tableInfoId.innerHTML = `<tr>
    <td>S.No</td>
    <td>Item Name</td>
    <td>Quantity</td>
    <td>Delete</td>
</tr>`;
  
}

function closeModal() {
  modal.style.display = "none";
}

