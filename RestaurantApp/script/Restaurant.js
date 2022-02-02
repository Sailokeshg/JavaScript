

$('#table-cards .card-one').click(function () {

   document.getElementsByTagName('h4')[0].innerHTML = "Table 1 | order details";

   $('#myModal').modal('show');
})

$('#table-cards .card-two').click(function () {
   document.getElementsByTagName('h4')[0].innerHTML = "Table 2 | order details";
   $('#myModal').modal('show');
})
$('#table-cards .card-three').click(function () {
   document.getElementsByTagName('h4')[0].innerHTML = 'Table 3 | order details';
   $('#myModal').modal('show');
})


function searchTable() {
   const searchBox = document.getElementById("search-table").value.toUpperCase();
   const items = document.getElementById("table-cards")
   const item = items.getElementsByClassName('card')

   for (var i = 0; i < item.length; i++) {

      const match = item[i].getElementsByTagName('h5')[0];


      if (match) {
         let textValue = match.textContent || match.innertHTML

         if (textValue.toUpperCase().indexOf(searchBox) > -1) {
            item[i].style.display = "";
         }
         else {
            item[i].style.display = "none";
         }
      }
   }
}

function searchMenu(){

   const searchBox = document.getElementById("search-menu").value.toUpperCase();
   const items = document.getElementById("menu-cards")
   const item = items.getElementsByClassName('card')
   console.log(item)

   for (var i = 0; i < item.length; i++) {

      const match = item[i].getElementsByTagName('h5')[0];


      if (match) {
         let textValue = match.textContent || match.innertHTML

         if (textValue.toUpperCase().indexOf(searchBox) > -1) {
            item[i].style.display = "";
         }
         else {
            item[i].style.display = "none";
         }
      }
   }
}