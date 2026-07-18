# Motocar — Oficina de Motos e Motopeças

Site completo para a **Motocar**, oficina de motos e loja de motopeças em Presidente Epitácio — SP.

## Tecnologias

- **Next.js 16** com App Router
- **TypeScript** (strict mode)
- **React 19**
- **Tailwind CSS v4**
- **shadcn/ui** (Radix UI + Tailwind)
- **Lucide Icons**
- **Supabase** (Auth, Database, Storage)
- **React Hook Form** + **Zod**
- **ESLint** + **Prettier**

## Funcionalidades

- E-commerce de peças e acessórios para motos
- Catálogo digital com orçamento pelo WhatsApp
- Site institucional da oficina
- Agendamento de serviços
- Blog com SEO local
- Painel administrativo completo
- Fallback local sem Supabase

## Estrutura do Projeto

```
src/
├── app/
│   ├── (account)/minha-conta/   # Área do cliente
│   ├── (functionality)/          # Carrinho, checkout, busca, agendamento
│   ├── (institutional)/          # Sobre, contato, blog, políticas
│   ├── (store)/                  # Produtos, categorias, marcas, ofertas
│   ├── admin/                    # Painel administrativo
│   └── api/                      # API routes (futuro)
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── layout/                   # Header, Footer, MegaMenu
│   ├── shared/                   # WhatsAppButton, Breadcrumbs, etc.
│   ├── product/                  # ProductCard, ProductActions
│   ├── cart/                     # CartDrawer
│   └── admin/                    # Admin components
├── lib/
│   ├── supabase/                 # Clientes Supabase
│   ├── utils.ts                  # Utilitários
│   ├── constants.ts              # Configurações da empresa
│   ├── store.ts                  # Estado global (carrinho, favoritos)
│   ├── data.ts                   # Camada de dados (Supabase + fallback)
│   └── demo-data.ts              # Dados de demonstração
├── hooks/                        # Hooks customizados
└── types/                        # Tipos TypeScript
```

## Páginas Implementadas

- `/` — Homepage com hero, categorias, produtos, serviços
- `/produtos` — Listagem de produtos com filtros
- `/produtos/[slug]` — Detalhe do produto
- `/categorias/[slug]` — Produtos por categoria
- `/marcas` — Todas as marcas
- `/marcas/[slug]` — Produtos por marca
- `/ofertas` — Produtos em promoção
- `/novidades` — Novidades
- `/servicos` — Serviços da oficina
- `/servicos/[slug]` — Detalhe do serviço
- `/agendamento` — Agendamento de serviços
- `/carrinho` — Carrinho de compras
- `/checkout` — Finalização do pedido
- `/favoritos` — Lista de desejos
- `/busca` — Busca de produtos
- `/minha-conta` — Painel do cliente
- `/blog` — Lista de artigos
- `/blog/[slug]` — Detalhe do artigo
- `/sobre` — Sobre a empresa
- `/contato` — Página de contato
- Políticas: privacidade, troca, entrega, termos, pagamentos
- `/admin` — Painel administrativo (dashboard, produtos, pedidos, etc.)
- `/404` — Página não encontrada

## Como Configurar

### 1. Clone e instale

```bash
npm install
```

### 2. Configure as variáveis de ambiente

Copie o `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Edite as variáveis conforme necessário:

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL do site (ex: https://motocar.com.br) |
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anônima do Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave de serviço do Supabase |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número do WhatsApp com DDI (ex: 5518999999999) |
| `NEXT_PUBLIC_GOOGLE_MAPS_URL` | URL do Google Maps |
| `NEXT_PUBLIC_ENABLE_ONLINE_CHECKOUT` | Habilita checkout online (true/false) |

> **Importante:** O site funciona **sem Supabase** usando dados de demonstração. Apenas configure o Supabase quando for publicar.

### 3. Desenvolvimento

```bash
npm run dev
```

### 4. Build de produção

```bash
npm run build
npm run start
```

## Configurar Supabase

1. Crie uma conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. No SQL Editor, execute as migrations para criar as tabelas
4. Copie a URL e as chaves para o `.env.local`
5. Configure as políticas RLS (Row Level Security)

### Tabelas Principais

- `profiles` — Perfis de usuário
- `admin_users` — Administradores
- `customers` — Clientes
- `categories` — Categorias de produtos
- `brands` — Marcas
- `products` — Produtos
- `product_images` — Imagens dos produtos
- `product_variants` — Variações dos produtos
- `product_compatibilities` — Compatibilidade de peças
- `services` — Serviços da oficina
- `orders` — Pedidos
- `appointments` — Agendamentos
- `banners` — Banners da homepage
- `posts` — Artigos do blog
- `newsletter_subscribers` — Assinantes da newsletter
- `site_settings` — Configurações do site

## Configurar WhatsApp

1. Defina `NEXT_PUBLIC_WHATSAPP_NUMBER` no `.env.local` com o número completo (DDI + DDD + número, apenas dígitos)
   - Exemplo: `NEXT_PUBLIC_WHATSAPP_NUMBER=5518999999999`
2. O botão flutuante e os links de WhatsApp usarão este número
3. As mensagens são personalizadas conforme a página

## Publicar na Vercel

1. Faça push do repositório para o GitHub
2. Acesse [vercel.com](https://vercel.com) e importe o repositório
3. Configure as variáveis de ambiente na Vercel
4. Clique em **Deploy**
5. Pronto! O site estará no ar

## Dados que a Motocar precisa fornecer

- [ ] **Logotipo oficial** (SVG ou PNG com fundo transparente)
- [ ] **Número do WhatsApp** correto
- [ ] **Instagram oficial**
- [ ] **Fotos da loja e oficina** para banners e serviços
- [ ] **Fotos dos produtos reais**
- [ ] **Logotipos das marcas** (ou autorização para usar)
- [ ] **CNPJ correto**
- [ ] **Texto institucional definitivo**
- [ ] **Depoimentos reais de clientes**
- [ ] **Domínio próprio** (ex: motocar.com.br)

## Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento
npm run build    # Build de produção
npm run start    # Iniciar servidor de produção
npm run lint     # Verificar lint
npm run typecheck # Verificar tipos TypeScript
```
