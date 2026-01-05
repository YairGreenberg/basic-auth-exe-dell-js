// Source - https://stackoverflow.com/q
// Posted by georgesamper, modified by community. See post 'Timeline' for change history
// Retrieved 2026-01-05, License - CC BY-SA 3.0

//A module containing this login function:

function(credentials,req,res) {

    //"credentials" is containing email and password from login form

    var query = 'SELECT password, email FROM users WHERE email = ? LIMIT 1';

    client.query(query,[credentials.email], function(err, results) {

        if (results[0]) {

            //Compare passwords
        if (bcrypt.compareSync(credentials.password, results[0].password)) {

                //Set session data and redirect to restricted area

            }
        }
    });
}
