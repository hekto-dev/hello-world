const { exec } = require("child_process");
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

exports.handler =  async function(event, context) {
  const customExec = promisify(exec)
  let result, output;

  try {
    await customExec(`rm -rf /tmp/*`, { stdio: "inherit" })
    output =  await customExec(`terraform apply && terraform output -json > /tmp/hekto.output.json`, { stdio: "inherit", cwd: process.cwd(), env: {
      ...process.env,
      TF_VAR_name: event.name
    } })
    console.log({output})
    result = JSON.parse(fs.readFileSync(path.join('/', 'tmp', 'hekto.output.json'), 'utf-8'))
  } catch(e) {
    console.log(e)
    throw e
  }

  return {
    result,
    output
  };
}