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
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMzY4NDIiLCJqdGkiOiJhZTE1YzVlYS1mZTkxLTQ3MjMtOTc2ZC0zZWY0MGEzYWQ0ZmUiLCJleHAiOjE3NTEzNzk5NzgsImlzcyI6InJlZ2lzdHJvcG9udG8tcG9udG93ZWItYXBpIiwiYXVkIjoicmVnaXN0cm9wb250by1wb250b3dlYi1hcGkifQ.UbWjFgtqtZWS2NqTzUSC1phpXrT51n57Fv8RaD2pYfw',
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
          'X-Api-Version': 'v2',
          'X-Internal-Client': '',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log('Ponto registrado:', data);
    } catch (error) {
      console.error('Erro ao registrar o ponto:', error);
      console.error('Body error:', body);
    }
  }
}