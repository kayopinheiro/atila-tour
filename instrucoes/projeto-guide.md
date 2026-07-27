# Átila Tour — Projeto Web

## Sobre o projeto
Website institucional para a Átila Tour, agência de viagens de pequeno porte. Foco em gerar vendas, apresentar pacotes turísticos e facilitar contato com clientes. NÃO é um marketplace (tipo Decolar/Booking/CVC) — é uma plataforma própria de gerenciamento de pacotes, reservas e conteúdo institucional.

## Skill obrigatória
**Sempre invocar a skill `frontend-design` antes de implementar qualquer página ou componente visual.**

## Referência visual
Sem Figma neste projeto. A referência visual virá de **prints de sites de referência**, salvos em `screenshots/referencias/`. Antes de desenvolver qualquer seção, verificar se há prints relevantes nessa pasta e usá-los como inspiração de layout/estrutura — sem copiar conteúdo ou identidade visual de terceiros.

### Referências avaliadas

**Tripvana (tripvana-agency.webflow.io)** — estrutura enxuta, usada como inspiração de layout/tom visual. Cobre bem: hero+slider, cards de pacotes em destaque, depoimentos, blog, FAQ, footer, roteiro dia a dia e galeria na página do pacote. **Não tem** e precisa ser adicionado ao reproduzir a estrutura: barra de busca com filtros no hero, seção/página de Destinos, seção/página de Promoções, filtros laterais na listagem de pacotes (só tem tabs por categoria), parcelamento e vagas restantes nos cards, "o que não está incluso", seleção de datas, disponibilidade/selo ESGOTADO, preço promocional + entrada detalhados, pacotes relacionados, seção de Diferenciais, e fluxo de reserva completo (a referência só tem um formulário simples sem seleção de pagamento nem confirmação automática). Usar apenas como inspiração de layout — todas as funcionalidades do PRD abaixo são obrigatórias independente do que a referência tiver ou não.

## Stack

### Frontend
- HTML5 / CSS3 / JavaScript ES6+ (vanilla)
- GSAP — animações
- SwiperJS — sliders/carrosséis

### CMS
- **Sanity** — Pacotes, Destinos, Promoções, Blog, Depoimentos, Informações da empresa

### Backend
- **Supabase** — Reservas, Clientes, Formulários, Histórico

### Pagamentos
- **Mercado Pago** ou **Asaas** (definir qual)
- Nunca armazenar dados de cartão — todo processamento acontece no gateway

### Hospedagem
- **Vercel**

### Integrações adicionais
Resend (email transacional), WhatsApp (Click-to-Chat/API), Google Maps, Google Analytics, Google Tag Manager, Meta Pixel

## Estrutura de arquivos
```
atila-tour/
├── instrucoes/
│   └── projeto-guide.md      ← este arquivo
├── assets/                   ← logos, ícones, imagens
├── screenshots/
│   └── referencias/          ← prints de sites de referência (inspiração visual)
├── CLAUDE.md                 ← @import instrucoes/projeto-guide.md
└── [arquivos do projeto conforme desenvolvimento]
```

## Fonte de verdade

| O quê | Onde buscar |
|---|---|
| Layout, espaçamentos, hierarquia | screenshots/referencias/ + decisões de design a definir |
| Cores (hex exatos) | seção Design System abaixo (a definir) |
| Tipografia | seção Design System abaixo (a definir) |
| Logos e imagens | pasta assets/ |
| Estrutura de conteúdo/páginas | seção Estrutura do Site (PRD) abaixo |

## Design System

Cores extraídas diretamente das 3 variantes oficiais do logo em `assets/` (fundo claro, fundo azul sólido, fundo azul-marinho escuro). A marca usa um gradiente de azul no wordmark "Atila" + um ponto laranja de destaque sobre o "i". O restante do sistema (surface, texto, bordas) foi derivado para combinar com esse azul, mantendo o tom "moderno, premium, minimalista" do PRD.

### Cores
| Token | Hex | Uso |
|---|---|---|
| --color-primary | #01348E | azul sólido oficial (fundo da variante `logo-fundo-azul.png`) — cor primária de marca: botões primários, header, links, ícones ativos |
| --color-primary-dark | #002D87 | polo escuro do gradiente do wordmark — hover/active de botões primários, texto sobre fundo claro |
| --color-primary-light | #0149BC | polo claro do gradiente do wordmark — hover claro, detalhes, estados de foco |
| --gradient-primary | linear-gradient(135deg, #002D87, #0149BC) | reproduzir o gradiente do logo em elementos de destaque (ex: botão principal do hero, ícone ativo) |
| --color-navy | #010D24 | azul-marinho quase preto (fundo de `logo-fundo-escuro.png`) — footer, seções escuras, overlay de imagens no hero |
| --color-accent | #FD9E0A | laranja do ponto do logo — CTAs, badges de preço/promoção, estados de hover, ícone de destaque |
| --color-background | #FFFFFF | fundo padrão das seções claras |
| --color-surface | #F5F6F8 | cinza-azulado bem claro — seções alternadas, cards elevados |
| --color-text | #0A0F1A | texto principal (quase preto, tom azulado, combina com --color-navy) |
| --color-text-muted | #5C6472 | texto secundário, legendas, metadados |
| --color-border | #E2E5EA | bordas sutis em cards e inputs |

**Uso do logo:** `logo-fundo-claro.png` sobre `--color-background`/`--color-surface`; `logo-fundo-azul.png` como avatar/selo/redes sociais sobre `--color-primary`; `logo-fundo-escuro.png` sobre `--color-navy` (header transparente sobre hero, footer). Nunca aplicar o logo colorido sobre fundos que não tenham contraste suficiente.

### Tipografia
**Família:** Manrope (Google Fonts) — única família, pesos 400/500/700/800. Sem mistura de fontes.

**Títulos** (Body + H1 a H6):

| Estilo | Tamanho | Peso | Line-height |
|---|---|---|---|
| Display (hero) | 64px (40px mobile) | 800 | 105% · tracking -2% |
| Body (título em peso regular) | 16px | 400 | 160% |
| H1 | 48px (32px mobile) | 800 | 110% · tracking -1.5% |
| H2 | 32px (26px mobile) | 700 | 115% · tracking -1% |
| H3 | 22px | 700 | 120% |
| H4 | 20px | 700 | 120% |
| H5 | 18px | 700 | 120% |
| H6 | 16px | 700 | 120% |

**Textos** (Large, Medium, Regular, Small e Tiny — corpo de texto e legendas, não usar para títulos):

| Estilo | Tamanho | Peso | Line-height |
|---|---|---|---|
| Large | 18px | 400 | 160% |
| Medium | 17px | 400 | 160% |
| Regular | 16px | 400 | 160% |
| Small | 14px | 500 | 150% |
| Tiny | 12px | 500 | 150% |

### Grid
- **Desktop:** container 1280px, 12 colunas, gutter 24px
- **Tablet:** container fluido, margin 32px, gutter 20px
- **Mobile:** margin 20px, gutter 16px, coluna única

### Padrões observados nas referências (para reproduzir com os tokens acima, não copiar cores/fontes originais)
- Hero full-bleed com imagem/overlay + headline grande + barra de busca (Traivels e Triplio têm; usar como base de layout já que é requisito obrigatório do PRD)
- Cards de pacote: imagem com badge de preço/rating sobreposto, botão com seta (Island, Tripvana)
- Seção "Diferenciais"/"Why choose us": grid de ícone + título + descrição curta (Tripferry, Island)
- Blocos de destaque em cor sólida escura contrastando com seções brancas (Tripferry, Tripvana)
- Depoimentos em slider, com foto pequena + nome + avaliação em estrelas
- Footer escuro com colunas de links + redes sociais

## Convenções de classes
- **Seção:** `.section` + `.section--dark` / `.section--light`
- **Botão:** `.btn` + `.btn--primary` / `.btn--secondary` + `.btn--sm` / `.btn--lg`
- **Card:** `.card` + `.card--pacote` / `.card--destino` / `.card--depoimento` / `.card--diferencial`
- **Grid:** `.grid` + `.grid-[cols]`
- **Scroll reveal (GSAP):** `data-reveal` + `data-reveal="left|right|scale"`

## Estrutura do Site (escopo V1)

### Menu principal
Home · Pacotes · Destinos · Promoções · Dicas de Viagem · Sobre · Contato

### Home
- Hero: imagem/vídeo + headline + subheadline + **barra de busca com filtros (destino, mês, faixa de preço, promoções) + botão "Buscar Pacotes" — obrigatória, mesmo que a referência visual usada não tenha esse elemento.**
- Pacotes em Destaque: 6–8 cards (foto, nome, local, dias, preço, parcelamento, vagas restantes, "Ver detalhes")
- Destinos Populares: grid
- Promoções: apenas pacotes promocionais
- Diferenciais: cards (atendimento personalizado, parcelamento facilitado, segurança, suporte WhatsApp, experiência comprovada)
- Depoimentos
- Blog: 3 últimos artigos + "Ver todos"
- FAQ: accordion com dúvidas frequentes (reserva, pagamento/parcelamento, cancelamento, segurança) — não estava no PRD original, adicionado a pedido do usuário; componente já disponível no style guide
- CTA: "Falar pelo WhatsApp"
- Footer: contato, endereço, redes sociais, horário, links úteis

### Página de Pacotes
Filtros laterais (destino, mês, faixa de preço, promoções) + grid de cards

### Página do Pacote
Hero (imagem, preço, parcelamento, dias, destino, botão Reservar) → Resumo → Incluso/Não incluso → Roteiro por dia → Hotel → Datas disponíveis → Disponibilidade (vagas / selo ESGOTADO) → Pagamento (preço, preço promo, entrada, parcelamento) → Galeria → 4 pacotes relacionados

### Fluxo de Reserva
Reservar → formulário → seleção de pagamento → gateway → pagamento aprovado → email + WhatsApp automáticos → equipe entra em contato

### Página Destinos
Lista de destinos → clique mostra pacotes daquele destino

### Página Promoções
Somente pacotes em promoção

### Blog ("Dicas de Viagem")
Categorias: Destinos, Economia, Documentação, Roteiros, Gastronomia, Eventos, Hotéis. Cada artigo pode relacionar pacotes.

### Sobre
História, missão, valores, equipe

### Contato
WhatsApp, telefone, email, mapa, formulário

## CMS (Sanity) — Schemas necessários

**Pacotes:** título, slug, resumo, descrição, categoria, status, imagem principal, galeria, país/estado/cidade/destino, data saída/retorno, qtd dias, preço original, preço promocional, entrada, qtd parcelas, valor parcela, vagas total/disponível, em promoção, hotel, roteiro, lista incluso/não incluso, documentação necessária, política de cancelamento, observações, SEO, publicado

**Destinos:** nome, slug, imagem, descrição, SEO

**Blog:** título, slug, imagem, categoria, autor, conteúdo, pacotes relacionados, SEO, publicado

**Promoções:** pacote, desconto, data inicial, data final

**Depoimentos:** nome, cidade, foto, nota, comentário

## Banco de Dados (Supabase) — Tabelas necessárias
Clientes, Reservas, Pagamentos, Formulários, Newsletter

## SEO — obrigatório em todas as páginas
Title, Meta Description, Canonical, Open Graph, Twitter Cards, Schema.org, Breadcrumb, Robots, Sitemap, URLs amigáveis

## Performance — meta mínima Lighthouse
Performance 95+ · Accessibility 95+ · Best Practices 95+ · SEO 100
Lazy load, compressão de imagens, code split, minificação, preload, prefetch, cache

## Acessibilidade
WCAG AA — contraste adequado, ARIA labels, alt em imagens, focus states, navegação por teclado

## Segurança
Sanitizar formulários, validação front+back, variáveis de ambiente, headers seguros, proteção CSRF, nunca armazenar dados financeiros

## Assets disponíveis

### Logos
- `assets/logo-fundo-claro.png` — logo colorido (gradiente azul + ponto laranja), usar sobre fundos claros (`--color-background` / `--color-surface`)
- `assets/logo-fundo-azul.png` — logo branco + ponto laranja sobre `--color-primary` sólido, usar como avatar/selo/redes sociais
- `assets/logo-fundo-escuro.png` — logo branco + ponto laranja sobre fundo `--color-navy`, usar em header sobre hero, footer, seções escuras

## Fora do escopo (V1)
Área do cliente, programa de fidelidade, app, chat interno, marketplace, multiempresa, múltiplos idiomas, sistema de afiliados

## Regras absolutas
- Não inventar cores — usar apenas os tokens definidos na seção Design System (a preencher)
- Não usar outra fonte além da definida
- Não adicionar seções que não existam nesta estrutura (PRD)
- Todo elemento clicável deve ter estado hover, focus-visible e active
- Nunca armazenar dados de cartão/financeiros — tudo via gateway (Mercado Pago/Asaas)

## Fluxo de desenvolvimento por página
1. Invocar a skill `frontend-design`
2. Verificar prints em `screenshots/referencias/` como inspiração (se houver)
3. **Apresentar plano de ação da página** — seções, ordem de execução, componentes envolvidos. Aguardar aprovação do usuário antes de escrever qualquer código.
4. Após aprovação: criar a página (começar pelo Style Guide)
5. Após cada seção: verificar no preview local
6. Corrigir diferenças antes de avançar para a próxima seção
7. Repetir para cada página seguinte
