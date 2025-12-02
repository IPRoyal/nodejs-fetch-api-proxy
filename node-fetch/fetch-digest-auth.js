const DigestFetch = require('digest-fetch');
const { HttpsProxyAgent } = require('https-proxy-agent');

const client = new DigestFetch('username', 'password');

(async () => {
  const proxyAgent = new HttpsProxyAgent('http://proxy.example.com:8080'); // optional proxy
  const response = await client.fetch('https://protected.example.com', { agent: proxyAgent });
  const data = await response.text();
  console.log(data);
})();
