const { SocksProxyAgent } = require('socks-proxy-agent');

(async () => {
  const proxyAgent = new SocksProxyAgent('socks5://username:password@proxy.example.com:1080');
  const response = await fetch('https://ipv4.icanhazip.com/', { agent: proxyAgent });
  const html = await response.text();
  console.log(html);
})();
