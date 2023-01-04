const request = require('superagent');

exports.allAccess = (req, res) => {
    res.status(200).send("Please first login!");
};

exports.userAccess = (req, res) => {
    let off = req.query.offset
    request.get(`https://randomuser.me/api/?page=${off}&results=10`)
    .then((data) => {
        let jsonObject = JSON.parse(data.text);
        
        const nextApod = {
            id: off,
            name: `${jsonObject.results[0].name.title} ${jsonObject.results[0].name.first} ${jsonObject.results[0].name.last}`,
            email: jsonObject.results[0].email,
            phone: jsonObject.results[0].phone,
            url: jsonObject.results[0].picture.large
        };
        res.status(200).send(nextApod);
        
    })
    .catch((err) => {
        res.status(500).send({ message: err.message });
    });
};
