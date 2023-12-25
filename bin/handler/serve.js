import { XANOS_DIR, excute } from "../helpers.js";

const serve = async (opt) => {
  if (opt.port) {
    process.env.PORT = opt.port;
  }
  excute("node", [`${XANOS_DIR}/server/server.dev.js`]);

  //load config file
  // watch apps dir
};

export default serve;
