// change to check mark once functionality is done to show symptoms have been checked at doc if they wanted to track that.

let trash = document.getElementsByClassName("fa fa-trash");

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const msg = this.parentNode.parentNode.childNodes[1].innerText
    const author = this.parentNode.parentNode.childNodes[3].innerText
    fetch('bookNotesMsg', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'msg': msg,
        'author': author
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});


// ********** BOOK API GOOD READS (had to find another way they don't give out keys anymore) ***********

// let settings = {
//   "url": "https://v1.nocodeapi.com/kaid2324/gr/wytzIAAXVUTVRzLD/search?q=<q>",
//   "method": "get",
//   "timeout": 0,
//   "headers": {
//       "Content-Type": "application/json"
//   },
// };

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });
