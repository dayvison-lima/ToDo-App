# ✅ ToDo App - Lista de Tarefas Fullstack

Aplicacao **Fullstack** de gerenciamento de tarefas, com autenticacao segura via JWT, redefinicao de senha por e-mail, e uma interface moderna e responsiva usando **Next.js + Django + Tailwind CSS**.

---

## 🧰 Tecnologias Utilizadas

### 🖙 Backend (API)

- **Django 5.1.7**
- **Django REST Framework**
- **Simple JWT**
- **django-cors-headers**
- **PostgreSQL**
- Deploy: **Render**

### 🖜 Frontend

- **Next.js 15.2.2**
- **Tailwind CSS 3**
- **Axios**
- Deploy: **Render**

---

## ✨ Funcionalidades

- 🔐 Cadastro, login e logout de usuarios
- 📧 Redefinicao de senha por e-mail
- ✅ Autenticacao JWT com refresh automatico
- 📝 CRUD completo de tarefas
- 🔒 Protecao de rotas privadas
- 🌃 Modo escuro incluso
- 🚀 Deploy completo com dominio na nuvem
- 📱 Responsivo e elegante

---

## 🚀 Como Executar o Projeto Localmente

### ⚙️ 1. Clonar o repositório

```bash
git clone [https://github.com/seu-usuario/ToDo-App.git](https://github.com/dayvison-lima/ToDo-App)
cd ToDo-App
```

---

## 📦 Backend (Django + DRF)

### 📁 Navegue até a pasta:

```bash
cd backend
```

### 📌 Crie e ative o ambiente virtual:

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 📥 Instale as dependencias:

```bash
pip install -r requirements.txt
```

### 🛠️ Configure as variaveis de ambiente

Crie um arquivo `.env`:

```env
DEBUG=True
SECRET_KEY=sua-chave-secreta
EMAIL_HOST_USER=seu@email.com
EMAIL_HOST_PASSWORD=sua-senha-de-app
```

### 🗓️ Migrations e superusuario

```bash
python manage.py migrate
python manage.py createsuperuser
```

### ▶️ Execute o servidor:

```bash
python manage.py runserver
```

O backend estara disponivel em: [**http://127.0.0.1:8000**](http://127.0.0.1:8000)

---

## 💻 Frontend (Next.js)

### 📁 Navegue até a pasta:

```bash
cd ../frontend-next
```

### 📥 Instale as dependencias:

```bash
npm install
```

### ⚙️ Configure as variaveis de ambiente:

Crie um arquivo `.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000/api
```

### ▶️ Execute o frontend:

```bash
npm run dev
```

O frontend estara disponivel em: [**http://localhost:3000**](http://localhost:3000)

---

## 🔐 Endpoints da API

| Verbo  | Rota                           | Descricao                      |
| ------ | ------------------------------ | ------------------------------ |
| POST   | `/api/token/`                  | Login e geracao de token       |
| POST   | `/api/token/refresh/`          | Refresh do token JWT           |
| POST   | `/api/usuarios/`               | Cadastro de usuario            |
| GET    | `/api/tarefas/`                | Lista de tarefas (privado)     |
| POST   | `/api/tarefas/`                | Criacao de tarefa              |
| PUT    | `/api/tarefas/<id>/`           | Atualizacao de tarefa          |
| DELETE | `/api/tarefas/<id>/`           | Exclusao de tarefa             |
| POST   | `/api/password-reset/`         | Envio de e-mail de redefinicao |
| POST   | `/api/password-reset/confirm/` | Confirmacao de nova senha      |

---

## 🔑 Autenticacao JWT

- Tokens armazenados no `localStorage`
- `Axios Interceptors` atualizam tokens automaticamente
- Expiracao segura e redirecionamento automatico para login

---

## 🌍 Deploy

- 🟢 Backend hospedado no **Render**
- 🕒 Frontend hospedado no **Vercel**
- 🗄️ Banco de dados: **PostgreSQL**

---

## 🧠 Autor

Projeto desenvolvido por **Dayvison Lima** 🚀

---

## 📜 Licenca

Distribuido sob a licenca [MIT](LICENSE).

---

🌟 Gostou? Deixe uma estrela no projeto ou contribua com melhorias!
