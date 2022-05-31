let checkMark = document.getElementsByClassName("fa fa-check-square-o");
let trash = document.getElementsByClassName("fa fa-trash");

Array.from(checkMark).forEach(function(element) {
  element.addEventListener('click', function(){
    const _id = this.parentNode.parentNode.id
    console.log(_id)
    const checked = this.parentNode.parentNode.classList.toggle('done')
    fetch('track', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        '_id': _id,
        'checked': checked
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
    .catch(console.error)
  });
});


Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const _id = this.parentNode.parentNode.id
    console.log(_id)
    fetch('track', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        '_id': _id
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});
























// Array.from(trash).forEach(function(element) {
//   element.addEventListener('click', function(){
//     const msg = this.parentNode.parentNode.childNodes[1].innerText
//     // const author = this.parentNode.parentNode.childNodes[3].innerText
//     fetch('bookNotesMsg', {
//       method: 'delete',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         'msg': msg,
//         // 'author': author
//       })
//     }).then(function (response) {
//       window.location.reload()
//     })
//   });
// });


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
