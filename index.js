var path = require('path')
var dir = process.argv[2]
var _package = path.join(dir, 'package.json')
var config = path.join(dir, 'version.yml')
var fs = require('fs')
const logger = require('winston-color')
const chalk = require('chalk')
const yaml = require('js-yaml')

checkForPkg()

function checkForPkg () {
  fs.stat(_package, (err, res) => {
    if (err && err.path === _package) {
      checkForYaml()
      return
    } else if (err) {
      throw new Error(err)
    }

    const pkg = require(_package)
    info(pkg.name, pkg.version)
  })
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
