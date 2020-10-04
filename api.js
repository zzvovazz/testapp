const { Op } = require("sequelize");
const express = require('express');
var cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());
app.use(require('compression')());

const User = require('./dto/user.js');
const Dates = require('./dto/dates.js');
app.get('/users', async (req, res) => {
    if (req.query.s) {
        return res.send(await User.findAll({
            'where': {
                [Op.or]: [
                    { first_name: { [Op.like]: '%' + req.query.s + '%' } },
                    { last_name: { [Op.like]: '%' + req.query.s + '%' } },
                ]
            }
        }));
    }
    return res.send([]);
});

app.get('/dates', async (req, res) => {
    return res.send(await Dates.findAll());
});

app.listen(8081);