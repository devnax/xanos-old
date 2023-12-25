#!/usr/bin/env node

import { Command } from "commander";
const program = new Command();
import serve from "./cli/serve.js";

program.name("XANOS").description("Usages");

program
  .command("serve")
  .description("run the development server")
  .option("--port <number>", "server port")
  .action(serve);

program
  .command("build")
  .description("build xanos for production")
  .action((str, options) => {});

program
  .command("start")
  .description("run the production server")
  .option("--port", "server port")
  .action((str, options) => {});

program
  .command("install")
  .description("install the xanos")
  .action((str, options) => {});

program
  .command("install-app")
  .description("install xanos app from server")
  .action((str, options) => {});

program
  .command("uninstall-app")
  .description("install xanos app from server")
  .action((str, options) => {});

program
  .command("create-app")
  .description("create new app")
  .action((str, options) => {});

program.parse();
