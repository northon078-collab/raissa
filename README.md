# 💖 Raissa Makeup — Site Oficial de Agendamento Online

Site moderno, elegante e mobile-first para a profissional da beleza **RAISSA MAKEUP**, focado no agendamento rápido de maquiagem, design de sobrancelhas e penteados com confirmação direta pelo WhatsApp.

---

## 🚀 Como Publicar o Site na Internet (Rápido e Gratuito)

Você pode colocar este site no ar em **menos de 2 minutos** de forma 100% gratuita utilizando qualquer um dos serviços abaixo:

### Opção 1: Netlify (Mais fácil — Arrastar e Soltar)
1. Acesse [app.netlify.com/drop](https://app.netlify.com/drop) (crie uma conta gratuita se não tiver).
2. Arraste a pasta **`dist`** gerada neste projeto diretamente para o navegador.
3. O Netlify publicará o site instantaneamente e gerará um link público (ex: `raissa-makeup.netlify.app`).
4. Se quiser, você pode conectar seu domínio próprio (ex: `raissamakeup.com.br`) nas configurações do Netlify.
5. *Dica sobre o Netlify Drawer*: O código já contém regras CSS para esconder qualquer badge/widget do Netlify para não cobrir o botão de agendamento. Se preferir desativar pelo painel do Netlify, vá em: *Site configuration > Deploy settings > Deploy previews > Desativar Netlify Drawer*.

### Opção 2: Vercel (Ideal para projetos React/Vite)
1. Acesse [vercel.com](https://vercel.com) e conecte sua conta (Google ou GitHub).
2. Importe a pasta ou repositório do projeto.
3. A Vercel detectará automaticamente o **Vite** e configurará o comando `npm run build` e pasta de saída `dist`.
4. Clique em **Deploy**. Pronto!

### Opção 3: Hospedagem Tradicional (Hostinger, cPanel, Locaweb, etc.)
1. No painel da sua hospedagem, abra o **Gerenciador de Arquivos** e vá para a pasta `public_html`.
2. Envie o conteúdo que está dentro da pasta **`dist`** (o arquivo `index.html` e a pasta `assets`).
3. O site já estará disponível no seu domínio!

---

## 💻 Como Rodar o Projeto no seu Computador

Caso queira abrir o código no VS Code ou rodar em sua máquina:

### 1. Pré-requisitos
- Ter o **Node.js** (versão 18 ou superior) instalado no computador ([nodejs.org](https://nodejs.org/)).

### 2. Instalação
No terminal da pasta do projeto, execute:
```bash
npm install
```

### 3. Rodar em Modo de Desenvolvimento (para testar no navegador)
```bash
npm run dev
```
Abra o navegador no endereço indicado (geralmente `http://localhost:3000`).

### 4. Gerar Versão Final de Produção (pasta `dist`)
```bash
npm run build
```
Os arquivos prontos e otimizados para a internet serão gerados dentro da pasta **`dist`**.

---

## ⚙️ Configurações e Dados da Profissional

Caso queira alterar preços, serviços, horários ou contatos no futuro:

- **WhatsApp e Instagram**:
  - Número cadastrado: `5518996732692` ((18) 99673-2692)
  - Instagram: `@raissa_makeup._` (`https://www.instagram.com/raissa_makeup._/`)
  - Localizados em: `src/data/defaultData.ts`

- **Horários de Atendimento**:
  - Manhã: `09:30` às `11:30`
  - Almoço: `11:30` às `13:30` (pausa sem agendamentos)
  - Tarde: `13:30` às `18:30`
  - Dias de funcionamento: Terça a Sábado
  - Localizados em: `src/data/defaultData.ts` e `src/utils/formatters.ts`

- **Catálogo de Serviços**:
  - Todos os serviços com nomes, categorias, preços e descrições estão em: `src/data/defaultData.ts`

---

## ✨ Destaques do Projeto

- **100% Livre de Fotos Genéricas**: Design sofisticado com tipografia nobre (*Cormorant Garamond* e *Plus Jakarta Sans*), tons de rosa (*blush*, *rosa vibrante* e *champagne*).
- **Multi-Serviços**: Clientes podem selecionar vários serviços juntos no mesmo agendamento com soma automática do valor.
- **Botão Fixo Acompanhando a Rolagem**: Botão de avanço sempre fixado na base do celular com aceleração por hardware.
- **Mensagem Formatada no WhatsApp**: Texto completo enviado pronto para a cliente só apertar "Enviar".
