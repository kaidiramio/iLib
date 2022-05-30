module.exports = function(app, passport, db) {

const {ObjectId} = require('mongodb') //gives access to _id in mongodb

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // app.get('/', (req, res) => {
    //    // name of array is result inside this scope
    //   db.collection('symptoms').find().toArray((err, result) => {
    //     if (err) return console.log(err)
    //     res.render('index.ejs', {symptoms: result})
    //   })
    // })

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('bookNotesMsg').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('profile.ejs', {
            user : req.user,
            messages: result
          })
        })
    });
    
     // LIBRARY SECTION =========================
    app.get('/library', function(req, res) {
      db.collection('symptoms').find().toArray((err, result) => {
        if (err) return console.log(err)
        res.render('library.ejs', {
          user : req.user,//use to give profile name
          symptoms: result
        })
      })
    });

    // *********** ADD BOOK (think I need a book.js for all book routes and same w/Author) **************
    app.get('/addBook', function(req, res) {
      db.collection('symptoms').find().toArray((err, result) => {
        if (err) return console.log(err)
        res.render('addBook.ejs', {
          user : req.user,//use to give profile name
          symptoms: result
        })
      })
    });



    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// message board PROFILE PAGE (DESIRED BOOK NOTES)routes ===============================================================
app.post('/bookNotes', (req, res) => {
  db.collection('bookNotesMsg').save({date: req.body.date, title: req.body.msg, authors: req.body.author}, (err, result) => {
    if (err) return console.log(err)
     console.log('saved to database')
    res.redirect('/profile')
  })
})

app.post('/profile', (req, res) => {
  db.collection('bookNotesMsg').insertOne({date: req.body.date, title: req.body.msg, authors: req.body.author}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

// app.delete('/delete', (req, res) => {
//   db.collection('bookNotesMsg').findOneAndDelete({_id: new mongoose.mongo.ObjectID(req.body.id)}, (err, result) => {
//     if (err) return res.send(500, err)
//     res.send('Message deleted!')
//   })
// })

app.delete('/bookNotesMsg', (req, res) => {
  db.collection('bookNotesMsg').findOneAndDelete({title: req.body.msg, authors: req.body.author}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

// message board TRACK SYMPTOMS PAGE routes ===============================================================
// app.post('/symptomsCheck', (req, res) => {
//   db.collection('symptoms').insertOne(
//     // targeting name in our ejs - boolean t/f and set by default to false
//     {date: req.body.date, 
//       msg: req.body.msg, 
//       pain: req.body.pain,
//       fatigue: req.body.fatigue,
//       moodS: req.body.moodS,
//       mobility: req.body.mobility,
//       checked: false}, (err, result) => {
//     if (err) return console.log(err)
//     console.log('saved to database')
//     res.redirect('/library')
//   })
// })

// app.put('/symptomsCheck', (req, res) => {
//   db.collection('symptoms')
//   // big ups to Kelly C for some help.
//   .findOneAndUpdate({ _id: ObjectId(req.body._id) }, {
//     $set: {
//       checked: req.body.checked,
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: false
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })

// app.delete('/symptomsCheck', (req, res) => {
//   db.collection('symptoms').findOneAndDelete({_id: ObjectId(req.body._id)}, (err, result) => {
//     if (err) return res.send(500, err)
//     res.send('order deleted!')
//   })
// })

// ***************** ADD BOOK page ***************
app.route('/api/books')
.get(function (req, res){
  //response should be array of book objects

})

.post(function (req, res){
  let title = req.body.title;
  //response could contain new book object including _id and title for now 
})

.delete(function(req, res){
  //if successful response could be 'complete delete successful'
});

app.route('/api/books/:id')
.get(function (req, res){
  let bookid = req.params.id;
  //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
})

.post(function(req, res){
  let bookid = req.params.id;
  let comment = req.body.comment;
  //json res format same as .get I think.........
})

.delete(function(req, res){
  let bookid = req.params.id;
  //if successful response will be 'delete successful'
});



// =============================================================================
// AUTHENTICATE (FIRST LOGIN) don't touch this and sign up ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
