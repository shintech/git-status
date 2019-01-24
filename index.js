const fs = require('fs')
const path = require('path')
const logger = require('winston-color')
const chalk = require('chalk')
const yaml = require('js-yaml')
const { promisify } = require('util')

const PWD = process.cwd()
const _package = path.join(PWD, 'package.json')
const config = path.join(PWD, 'version.yml')

const stat = promisify(fs.stat)

checkForPkg()

async function checkForPkg () {
  let result

  try {
    await stat(_package)
    result = true
  } catch (err) {
    result = false
  }

  if (result) {
    const pkg = require(_package)
    info(pkg.name, pkg.version)
  } else {
    checkForYaml()
  }
}

function checkForYaml () {
  try {
    const v = yaml.safeLoad(fs.readFileSync(config, 'utf8'))
    info(v.name, v.version)
  } catch (err) {
    if (err && err.path === config) {

    } else {
      throw new Error(err)
    }
  }
}

function info (name, version) {
  logger.info(`package: ${chalk.yellow(name)} - version: ${chalk.green(version)}`)
}
