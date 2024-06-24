const http = require("http");
const httpProxy = require("http-proxy");
const cors = require("cors");

const proxy = httpProxy.createProxyServer({});
const target = "https://ge2019.electoral-reform.org.uk";

const server = http.createServer((req, res) => {
  cors()(req, res, () => {
    proxy.web(req, res, { target, changeOrigin: true });
  });
});

console.log("Proxy server running on http://localhost:8080");
server.listen(8080);
