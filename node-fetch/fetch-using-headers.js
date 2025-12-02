import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';

(async () => {
  const proxyData = new HttpsProxyAgent('https://username:password@geo.iproyal.com:12321');
  const options = {
    agent: proxyData,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15',
    }
  };

  const scrape = await fetch('https://ipv4.icanhazip.com/', options);
  const html = await scrape.text();
  console.log(html);
})();
