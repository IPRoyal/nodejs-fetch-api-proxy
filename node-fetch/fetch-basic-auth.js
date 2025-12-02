const { HttpsProxyAgent } = require('https-proxy-agent');

(async () => {
  const proxyAgent = new HttpsProxyAgent('http://username:password@proxy.example.com:8080');
  const response = await fetch('https://ipv4.icanhazip.com/', { agent: proxyAgent });
  const html = await response.text();
  console.log(html);
})();
