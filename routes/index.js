const request = require('request');
const express = require('express');
const cheerio = require('cheerio');

const router = express.Router();
const baseProductsUrl = "https://looplist-product-sample.herokuapp.com/products/";

// coding challenge
router.get('/api/products/:id', function(req, res, next) {
  request(baseProductsUrl + req.params.id, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(body);
      res.send({
        title: $("title").text(),
        name: $("h2.product-name").text(),
        image: $("div.product-image-group img").attr("src"),
        description: $("div.card:contains('Description:')").find("p").text() // could also select 4th card
      })
    } else {
      res.status(503).send({ // service unavailable
        message: "Sorry, unable to fetch product page"
      })
    }
  })
});

module.exports = router;
