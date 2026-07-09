exports.handler = async (event, context) => {
  const targetUrl = 'https://pwthor.live' + event.path;

  const response = await fetch(targetUrl, {
    method: event.httpMethod,
    headers: { 
      ...event.headers, 
      'host': 'pwthor.live',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36' 
    }
  });

  let body = await response.text();

  // Branding aur Telegram links ko badlo
  body = body.replace(/PW THOR/g, 'Next Study');
  body = body.replace(/https:\/\/t\.me\/[^"\s]+/g, 'https://t.me/nextmodeapk');

  // Logo Inject karo
  const logo = `<div style="position:fixed; top:10px; right:10px; z-index:9999;">
                  <img src="https://kommodo.ai/i/BuQxmJIkeEWv0kl0UiQz" width="50">
                </div>`;
  body = body.replace('</body>', logo + '</body>');

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: body
  };
};
