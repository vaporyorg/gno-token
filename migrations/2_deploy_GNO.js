/* global artifacts */
/* eslint no-undef: "error" */
const contract = require('truffle-contract')

// const Math = artifacts.require('Math')
const TokenGNO = artifacts.require('TokenGNO')
const Math = contract(require('@gnosis.pm/util-contracts/build/contracts/Math'))

const INITIAL_TOKEN_AMOUNT = 10e6 // 10M

module.exports = function (deployer) {
  Math.setProvider(deployer.provider)

  return Math
    .deployed()
    .then(math => {
      return deployer.link(Math, TokenGNO)
    })
    .then(() => {
      return deployer.deploy(TokenGNO, INITIAL_TOKEN_AMOUNT * 1e18)
    })
}
