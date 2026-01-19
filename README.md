# 🔐 Password Manager (Node.js + MongoDB)

Um **gerenciador de senhas em linha de comando (CLI)** desenvolvido em **Node.js**, utilizando **MongoDB** para persistência de dados e **bcrypt** para criptografia da senha mestre.

Projeto com foco educacional para praticar **autenticação**, **hashing de senhas** e **integração com banco de dados**.

---

## 📌 Funcionalidades

- 🔑 Criação de senha mestre
- 🔐 Autenticação com senha criptografada
- 📂 Armazenamento de múltiplas senhas
- 👀 Visualização das senhas salvas
- ✏️ Criação e atualização de senhas
- 🗄️ Persistência com MongoDB
- 💻 Interface via terminal (CLI)

---

## 🛠️ Tecnologias Utilizadas

- Node.js
- MongoDB
- bcrypt
- prompt-sync
- ES Modules

---

## 📁 Estrutura do Banco de Dados

### 📂 Banco

### 📄 Coleções

#### auth
Armazena o hash da senha mestre.

```json
{
  "type": "auth",
  "hash": "<senha_criptografada>"
}
```

### passwords
Armazena as senhas dos servições

```json
{
  "source": "github",
  "password": "minhaSenha123"
}
```

##🚀 Como Executar o Projeto

###1️⃣ Pré-requisitos
- Node.js
 MongoDB rodando em localhost:27017

### 2️⃣ Clonar o repositório
``` git clone https://github.com/seu-usuario/seu-repositorio.git```

### 3️⃣ Instalar dependências
```npm install```

### 4️⃣ Executar a aplicação
```node index```


## 🔄 Fluxo de Funcionamento

1. Conecta ao MongoDB  
2. Verifica se existe uma senha mestre  

### Se não existir:
- Solicita a criação da senha mestre
- Criptografa a senha usando bcrypt
- Salva o hash no banco de dados

### Se existir:
- Solicita a senha mestre
- Valida a senha utilizando `bcrypt.compare`
- Exibe o menu principal

---

## 📜 Menu de Opções

```text
1. View passwords
2. Manage new password
3. Verify password
4. Exit
```

👨‍💻 Autor
Luiggy Alves
- Estudante de Ciência da Computação na Universidade Federal do Amazonas
- Projeto desenvolvido como parte dos desafios propostos no livro: "Aprenda Node.js com Projetos reais", de Jonathan Wexler


