# Usa a imagem oficial do Python 3.11
FROM python:3.11

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos para dentro do container
COPY requirements.txt /app/

# Instala as dependências do Django
RUN pip install --no-cache-dir --upgrade pip \
    && pip install -r requirements.txt

# Copia todo o código para dentro do container
COPY . /app/

# Expõe a porta do Django
EXPOSE 8000

# Comando para rodar o servidor Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
