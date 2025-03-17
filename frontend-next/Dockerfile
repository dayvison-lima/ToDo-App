# Usa a imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos essenciais primeiro (para melhor aproveitamento do cache)
COPY package*.json ./

# Instala as dependências antes de copiar o restante
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Garante que a build do Next.js seja feita corretamente
RUN npm run build

# Expõe a porta 3000
EXPOSE 3000

# Comando para rodar o frontend
CMD ["npm", "run", "start"]
