
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

    const url = 'https://pontogo-api.herokuapp.com/add-point?company-token-pg=pvMFZKLoI9CpkjHCcm6y&employee-token-pg=97Z4hhrMARnCX8w7QIzB';
    const body = {
      date: `${dataFormatada}T${hora}:${minuto}:${random}-03:00`,
      latitude: -15.6593449,
      longitude: -48.1956026,
      userData: {
        device: "Desktop",
        gatewayMac: null,
        ip: "",
        operatingSystem: "Mac OS 10"
      }
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7,es;q=0.6',
          'Connection': 'keep-alive',
          'Content-Type': 'application/json',
          'Origin': 'https://beta.pontogo.app',
          'Referer': 'https://beta.pontogo.app/',
          'Authorization': 'B514A58B-E7BE-42D6-7205-9645FD3CBC7C',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
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