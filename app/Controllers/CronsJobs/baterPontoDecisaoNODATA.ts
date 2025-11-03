import FeriadosModell from "App/Models/FeriadosModell";

const colors = {
  Vermelho: '\x1b[31m',
  Verde: '\x1b[32m',
  Amarelo: '\x1b[33m',
  Azul: '\x1b[34m',
  Magenta: '\x1b[35m',
  Ciano: '\x1b[36m',
  Branco: '\x1b[37m',
}


export default class BaterPontoNODATAController {
  public async getBaterPonto(hora, minuto) {
    minuto = minuto.toString().padStart(2, '0');
    var random = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    const data = new Date();
    const dataComFuso = new Date(data.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const ano = dataComFuso.getFullYear();
    const mes = (dataComFuso.getMonth() + 1).toString().padStart(2, '0');
    const dia = dataComFuso.getDate().toString().padStart(2, '0');

    const dataFormatada = `${ano}-${mes}-${dia}`;


    console.log(`${dataFormatada}T${hora}:${minuto}:${random}-03:00`)

    const feriado = await FeriadosModell.query().where('data', dataFormatada).first();
    if (feriado) {
      console.log(colors.Magenta, 'Hoje é feriado: PONTO NÃO REGISTRADO');
      return feriado;
    }

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

    const url = 'https://apiweb.registroponto.com.br/api/v2/clockings';
    const body = {
      "externalIp": "187.62.237.86",
      "clockingFontedData": "Web"
    };

    try {
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
      // console.log(response)
      const data = await response.json();
      console.log('Ponto registrado:', data);
      // Fazendo o logout:
      try {
        const logoutUrl = 'https://colaborador.registroponto.com.br/login?_rsc=4414t';

        await fetch(logoutUrl, {
          method: 'GET',
          headers: {
            'accept': '*/*',
            'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7,es;q=0.6',
            'cache-control': 'no-cache',
            'pragma': 'no-cache',
            'priority': 'u=1, i',
            'referer': 'https://colaborador.registroponto.com.br/painel',
            'rsc': '1',
            'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'sentry-trace': 'c217b1e684634771b586556938ee0bcd-b9b83ea02aef15a6-1',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
          },
          // No curl tinha cookies (-b) mas no fetch, a gestão de cookies depende do contexto (navegador ou Node).
          // Em Node.js, se o cookie for necessário, precisa ser passado no header 'cookie', algo como:
          // 'cookie': '_clck=1oorn4g%7C2%7Cfx9%7C0%7C2007; _clsk=lama8g%7C1751454395315%7C4%7C1%7Ca.clarity.ms%2Fcollect'
        });

        console.log(colors.Ciano, 'Logout realizado com sucesso');
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    } catch (error) {
      console.error('Erro ao registrar o ponto:', error);
      console.error('Body error:', body);
    }
  }
}