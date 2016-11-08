/**
 * Created by Brandon Roy on 07/11/2016.
 */


app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/home',
    failureRedirect : '/login',
    failureFlash : true
}));