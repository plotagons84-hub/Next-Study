export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const targetUrl = 'https://pw.primestudy.site' + url.pathname + url.search;

    const response = await fetch(targetUrl, {
      method: request.method,
      headers: { 
        'host': 'pw.primestudy.site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
      }
    });

    let body = await response.text();

    // SERVER-SIDE REPLACEMENT (Ye 100% kaam karega)
    body = body.replace(/Prime Study/g, 'Next Study');
    body = body.replace(/https:\/\/t\.me\/prime-study-link/g, 'https://t.me/nextmodeapk');
    
    // Logo ko replace karna
    body = body.replace(/logo-url-yahan-dalo/g, 'https://kommodo.ai/i/BuQxmJIkeEWv0kl0UiQz');

    return new Response(body, {
      status: response.status,
      headers: { "Content-Type": "text/html" }
    });
  }
};
