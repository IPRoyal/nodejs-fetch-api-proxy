# Node-Fetch Proxy Tutorial for 2025

Node-Fetch is a popular library that brings the Fetch API to Node.js. With it, you can connect to pages, send post data, and request contents, which makes it a suitable tool for many tasks, including Node.js web scraping. In addition, Node.js includes default support for the fetch function since v18.

But there’s a problem. Out of the box, there’s no node-fetch proxy option. Therefore, you can get blocked quickly when using only your own IP address.

## How Do I Use a Node-Fetch Proxy?

There are two main ways to use a node-fetch proxy. You can use a code library that creates a custom user agent, or you can use a [reverse proxy](https://iproyal.com/blog/all-you-need-to-know-about-reverse-proxy-servers/).

### How to Use Https-Proxy-Agent

One of the options to implement a node fetch proxy is to use a code library for a custom user agent. A popular library to implement this is [https-proxy-agent by Nathan Rajlich](https://github.com/TooTallNate/node-https-proxy-agent/)

In terms of implementation, it’s quite simple. You just need to install node-fetch (you don’t need it if you are running NodeJS v18 or higher) and https-proxy-agent

You can check the current version of Node with the node -v command
```shell
node -v
```

A good way to install nodejs is by using [NVM](https://github.com/nvm-sh/nvm). Once NVM is installed use the following command to install a specific nodejs version (make sure its higher than 18 to run the code in this guide)
```bash
nvm install 22.20 
```

Run the npm init command to create a new Node.js project.
```shell
npm init
```
Alternatively, you can use the following package.json file
```json
{
  "name": "nodejs-fetch-with-proxy",
  "type": "module",
  "version": "1.0.0",
  "description": "Use nodejs fetch to make requests with a proxy",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "https-proxy-agent": "^7.0.6",
    "node-fetch": "^3.3.2"
  }
}

```

Finally, create a file called index.js and open it in your favorite code editor.
```bash
touch index.js
```

If you used the provided package.json file, you can install dependencies by running the following command 
```shell
npm install
```

Otherwise, you can install each dependency manually
```shell
npm install node-fetch
npm install https-proxy-agent
```

Then, in your index.js file, use the HttpsProxyAgent as the agent parameter of your fetch request. Like this:

```js
import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';

(async () => {
    const proxyAgent = new HttpsProxyAgent('http://geo.iproyal.com:12321');
    const scrape = await fetch('https://ipv4.icanhazip.com/', { agent: proxyAgent });
    const html = await scrape.text();
    console.log(html);
})();
```

Notice that this code doesn't use any proxy server authentication. So if you want to use it this way, you need to whitelist your own IP address.

You can pass the authentication details to HttpsProxyAgent using a few methods. The simplest one is using the username and password as plain text in your request, like this:

```js
import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';

(async () => {
    const proxyData = new HttpsProxyAgent('https://username:password@geo.iproyal.com:12321');
    const scrape = await fetch('https://ipv4.icanhazip.com/', { agent: proxyData });
    const html = await scrape.text();
    console.log(html);
})();
```

Other options for node-fetch proxy authentication with https-proxy-agent also exist, such as using auth or custom headers.

A working example can be found [here](node-fetch/fetch-with-https-proxy-agent.js)


### Web Scraping Without Getting Blocked

Although web scraping is legal and very useful, many sites try to block it. They use a few tools to do it, but two of the biggest points are the IP address and the headers.

They check if a single IP address is performing a large number of requests or if they are done around the same time. This is a telling sign that it's a bot and not a real user.

Regarding the headers, they check if the request metadata looks like a request made from a real browser. If you don't use any parameters, a bot will just request the URL without sending any information.

However, a real user sends a lot of data about themselves, such as browser, version, language and more. Therefore, requests without this metadata are quite suspicious.

You can fix the IP detection by using IPRoyal's [residential proxy service](https://iproyal.com/residential-proxies/). With it, you connect using different IP addresses from real residential users around the world. Website owners won't be able to tell that two different requests with different IP addresses are from the same user, so you'll be left alone.

In addition to authenticated requests, you can whitelist an IP address if you want. This feature allows you to use your proxy server without sending a username and password.

To improve your scraping efforts, follow these [best web scraping practices](https://iproyal.com/blog/best-web-scraping-practises/):
* Rotate IPs regularly. Use services that offer multiple residential IPs to reduce the chance of bans.
* Handle CAPTCHAs. Use headless browsers or CAPTCHA-solving services.
* Implement retry logic. If a request fails, set up a retry logic that waits for a bit and then tries again.
* Respect robots.txt. It reduces your risk of getting blocked or blacklisted.

## Proxy Authentication Methods

When using a proxy, it’s important to use the right authentication method depending on your proxy server setup. Here’s an overview for basic, digest, and SOCKS5 authentication with credentials in a node-fetch module context.

### 1. Basic Authentication (Username/Password)

```js
const { HttpsProxyAgent } = require('https-proxy-agent');

(async () => {
  const proxyAgent = new HttpsProxyAgent('http://username:password@proxy.example.com:8080');
  const response = await fetch('https://ipv4.icanhazip.com/', { agent: proxyAgent });
  const html = await response.text();
  console.log(html);
})();
```


A working example can be found [here](node-fetch/fetch-basic-auth.js)

### 2. Digest Authentication

Digest needs extra handling. You can use digest-fetch to help

```js
const DigestFetch = require('digest-fetch');
const { HttpsProxyAgent } = require('https-proxy-agent');

const client = new DigestFetch('username', 'password');

(async () => {
  const proxyAgent = new HttpsProxyAgent('http://proxy.example.com:8080'); // optional proxy
  const response = await client.fetch('https://protected.example.com', { agent: proxyAgent });
  const data = await response.text();
  console.log(data);
})();
```

A working example can be found [here](node-fetch/fetch-digest-auth.js)


### 3. SOCKS5 Proxy Authentication

To use SOCKS5, you can use socks-proxy-agent:

```js
const { SocksProxyAgent } = require('socks-proxy-agent');

(async () => {
  const proxyAgent = new SocksProxyAgent('socks5://username:password@proxy.example.com:1080');
  const response = await fetch('https://ipv4.icanhazip.com/', { agent: proxyAgent });
  const html = await response.text();
  console.log(html);
})();
```

A working example can be found [here](node-fetch/fetch-socks-auth.js)


## Node-Fetch Proxy User Agents

You can set user agents via the options argument in your node fetch proxy call. So instead of the simple fetch request:

```js
const scrape = await fetch('https://ipv4.icanhazip.com/');
```

You can do it using the options argument after the URL:

```js
const scrape = await fetch('https://ipv4.icanhazip.com/', { headers: { /** request headers here **/ }});
```

Therefore, in addition to user agents, you can use other header arguments. Here is a code sample using node-fetch proxy and custom user agents at the same time:

```js
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
```

A working example can be found [here](node-fetch/fetch-using-headers.js)

In this case, we are using just the user-agent, but you can pass any headers you want.

## Conclusion
Now you have a better understanding of how to use node fetch proxies to scrape websites without getting blocked. In addition, you saw how you could use custom headers to make your scraping functions even better.

Now you can connect your scraper with a parser and extract data from any site you want.


## FAQ

### ReferenceError: fetch is not defined or Fetch is not defined javascript

This happens when Node doesn't find the fetch function. If you are running Node.js under v18, you will need to install node fetch or other similar module.

If that's the case, make sure that you have installed node fetch and that you have included in your script using:

```js
const fetch = require('node-fetch');
```

### Node fetch timeout

If you are facing timeout issues or if you want to add a timeout option, you can use a timoutpromise, or use a library such as hpagent to manually control timeouts.

### Error: Cannot find module ‘node-fetch' after running ‘npm install node-fetch'

Before installing node-fetch make sure that npm itself is up to date. Try something like this:

```shell
npm install -g npm
npm cache clean
npm update
```

Another option is to install it locally, instead of globally:
```shell
npm i node-fetch
```

And you could try this:
```js
import fetch from 'node-fetch';
```

Instead of using require. Or you can try to load it like this:
```js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
```

### What Is Fetch in Node.js?

Fetch in Node.js is a library that works just like the [Fetch API](https://iproyal.com/blog/how-to-make-http-requests-in-nodejs-using-fetch-api/) for browsers. The difference is that the API is only available on the client side, while Node.js Fetch is available on the backend.

### Is Node-Fetch the Same as Fetch?

window.fetch(), also known as fetch, is a client-side function. Therefore, you can run it from your browser. Node-fetch is a backend library available in [Node.js](https://binary-studio.com/hire-node-js-developers/). You can run it programmatically from your Node.js server.
