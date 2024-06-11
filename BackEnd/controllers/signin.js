const handleSignIn = (db, bcrypt) => (req, res) => {
    const { username, password } = req.body;
    db.select('name', 'hash').from('login')
        .where('name', '=', username)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('name', '=', username)
                    .then(user => {
                        res.json(user[0]);
                    })
                    .catch(err => res.status(400).json('Server is down try again later'));
            } else {
                res.status(400).json('Error logging in');
            }
        })
        .catch(() => res.status(400).json('Error Logging in'));
}

export default handleSignIn;