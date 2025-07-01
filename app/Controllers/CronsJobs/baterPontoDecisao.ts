
export default class BaterPontoController {
  public async getBaterPonto() {
    var random = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    const data = new Date();
    const dataComFuso = new Date(data.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const ano = dataComFuso.getFullYear();
    const mes = (dataComFuso.getMonth() + 1).toString().padStart(2, '0');
    const dia = dataComFuso.getDate().toString().padStart(2, '0');
    const hora = dataComFuso.getHours().toString().padStart(2, '0');
    const minuto = dataComFuso.getMinutes().toString().padStart(2, '0');

    const dataFormatada = `${ano}-${mes}-${dia}`;

    console.log(`${dataFormatada}T${hora}:${minuto}:${random}-03:00`)

    const url = 'https://apiweb.registroponto.com.br/api/v2/clockings';
    const body = {
      "externalIp": "187.62.237.86",
      "clockingFontedData": "Web"
    };

    try {
      const loginUrl = 'https://apiweb.registroponto.com.br/api/v1/auth/login';
      const loginBody = {
        login: 'weberth.lima@decisaosistemas.com.br',
        password: 'crudrusp2',
      };

      const loginResponse = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7,es;q=0.6',
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
          'Origin': 'https://colaborador.registroponto.com.br',
          'Pragma': 'no-cache',
          'Priority': 'u=1, i',
          'Referer': 'https://colaborador.registroponto.com.br/',
          'Sec-CH-UA': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
          'Sec-CH-UA-Mobile': '?0',
          'Sec-CH-UA-Platform': '"macOS"',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-site',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
        },
        body: JSON.stringify(loginBody),
      });

      const loginData: any = await loginResponse.json();

      if (!loginResponse.ok || !loginData.token) {
        console.error('Erro ao obter token:', loginData);
        return;
      }
      const token = loginData.token;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7,es;q=0.6',
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
          'Origin': 'https://colaborador.registroponto.com.br',
          'Pragma': 'no-cache',
          'Priority': 'u=1, i',
          'Referer': 'https://colaborador.registroponto.com.br/',
          'Sec-CH-UA': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
          'Sec-CH-UA-Mobile': '?0',
          'Sec-CH-UA-Platform': 'Windows',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-site',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
          'X-Api-Version': 'v2',
          'X-Internal-Client': '',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log('Ponto registrado:', data);
    } catch (error) {
      console.error('Erro ao registrar o ponto:', error);
    }
  }
}