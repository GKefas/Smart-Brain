const handleRegister = (req, res, db, bcrypt) => {
    const { email, username, password } = req.body;
    const hash = bcrypt.hashSync(password);
    let valid = true;
    db.select('name', 'email').from('users')
        .then(data => {
            let error = '';
            console.log(error)
            data.forEach(user => {
                if (username === user.name) {
                    error = 'Username already used';

                }
                if (email === user.email && error === '') {
                    error = 'Email already exists';
                }
            });
            if (error !== '')
                res.status(400).json(error);
            else {
                db.transaction(trx => {
                    trx.insert({
                        hash: hash,
                        name: username
                    })
                        .into('login')
                        .returning('name')
                        .then(loginUsername => {
                            trx('users')
                                .returning('*')
                                .insert({
                                    email: email,
                                    name: loginUsername[0].name,
                                    joined: new Date()
                                })
                                .then(user => res.json(user[0]));
                        })
                        .then(trx.commit)
                        .catch(trx.rollback)
                })

                    .catch(err => res.status(400).json(err));
            }


        })
        .catch(err => res.status(400).json('unable to register'));
}

export default handleRegister;