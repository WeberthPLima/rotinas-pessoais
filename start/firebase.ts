import admin from 'firebase-admin'
import fs from 'fs'

// Caminho para a chave de serviço que você baixou do Firebase
const serviceAccount = JSON.parse(
  fs.readFileSync('./FirebaseConnect.json', 'utf-8')
)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'hospi-e00b8.appspot.com', // substitua pelo seu bucket
})

export const bucket = admin.storage().bucket()
