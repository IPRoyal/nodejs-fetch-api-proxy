import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';

(async () => {
  const proxyData = new HttpsProxyAgent('https://username:password@geo.iproyal.com:12321');
  const scrape = await fetch('https://ipv4.icanhazip.com/', { agent: proxyData });
  const html = await scrape.text();
  console.log(html);
})();
