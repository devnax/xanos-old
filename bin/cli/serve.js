import {
  XANOS_DIR,
  XANOS_BUILD_DIR,
  APPS_DIR,
  spawn,
  execSync,
} from "../helpers.js";
// import dynamicImport from "../inc/dynamicImport.js";
import esbuild from "esbuild";

const skipFilesPlugin = () => {
  return {
    name: "skip-files-plugin",
    setup(build) {
      const pattern = `^${APPS_DIR}/([^/]+)/([^/]+)\\.(js|jsx|ts|tsx)$`;
      build.onLoad({ filter: new RegExp(pattern) }, async (args) => {
        const [appName, filename] = args.path
          .replace(APPS_DIR + "/", "")
          .split("/");
      });
    },
  };
};

const serve = async (opt) => {
  if (opt.port) {
    process.env.PORT = opt.port;
  }

  // dynamicImport();

  execSync(`rm -rf ${XANOS_BUILD_DIR}`);

  const ctx = esbuild.context({
    entryPoints: [`${APPS_DIR}/**/*.js`],
    outdir: `${XANOS_BUILD_DIR}/apps`,
    format: "esm",
    platform: "node",
    outbase: "apps",
    plugins: [skipFilesPlugin()],
  });

  (await ctx).watch();

  esbuild.buildSync({
    entryPoints: [`${XANOS_DIR}/server/**/*.js`],
    outdir: `${XANOS_BUILD_DIR}/server`,
    format: "esm",
    platform: "node",
  });

  esbuild.buildSync({
    entryPoints: [`${XANOS_DIR}/client/**/*.js`],
    outdir: `${XANOS_BUILD_DIR}/client`,
    format: "esm",
    platform: "node",
  });

  spawn("node", [
    "--trace-warnings",
    "--experimental-specifier-resolution=node",
    `${XANOS_BUILD_DIR}/server/server.dev.js`,
  ]);

  //load config file
  // watch apps dir
};

export default serve;
