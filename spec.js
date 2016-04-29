var Nightmare = require('nightmare')
var nightmare = Nightmare({ show: true })

nightmare
  .goto('http://localhost:8080/')
  .click('#single-button')
  .wait('#room2')
  .click('#room2')
  .wait(1000)
  .type('input[id="cusNameID"]', 'Chanwit')
  .type('input[placeholder="เบอร์โทร"]', '0805629799')
  .click('#btnSub')
  .wait('td#datereser-0')
  .evaluate(function () {
    return document.querySelector('td#datereser-0').innerHTML
  })
  .end()
  .then(function (result) {
    console.log(result)
  })
