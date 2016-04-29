/* global describe, it */
require('mocha-generators').install()
var Nightmare = require('nightmare')
var expect = require('chai').expect

describe('test reservation', function () {
  it('test 24-25', function * () {
    this.timeout(15000)
    var nightmare = Nightmare()
    var value = yield nightmare
    .goto('http://localhost:8080/')
    .type('input[id="cusNameID"]', 'Chanwit')
    .type('input[placeholder="เบอร์โทร"]', '0805629799')
    .click('#btnSub')
    .evaluate(function () {
      return document.querySelector('td#datereser-0').innerHTML
    })
    expect(value).to.equal('24/04/2016 - 26/04/2016')
  })
})
