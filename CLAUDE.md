@instrucoes/projeto-guide.md

# Regras de Desenvolvimento Frontend

## Sempre Fazer Primeiro
- **Invocar a skill `frontend-design`** antes de escrever qualquer código frontend, toda sessão, sem exceções.

## Referência Visual
- Não há Figma neste projeto. A referência vem de prints de sites em `screenshots/referencias/`.
- Usar os prints apenas como inspiração de layout/estrutura/UX — nunca copiar identidade visual, textos ou imagens de terceiros.
- Onde não houver referência clara, seguir os tokens definidos em `instrucoes/projeto-guide.md` (Design System) e o bom senso de um design "moderno, premium, minimalista" conforme o PRD.
- Tirar screenshot do output, comparar com a referência/expectativa, corrigir diferenças, tirar novo screenshot. No mínimo 2 rodadas de comparação por seção.

## Servidor Local
- **Sempre servir em localhost** — nunca tirar screenshot de URL `file:///`.
- Iniciar o servidor: `npx serve . -p 3000`
- Iniciar em background antes de qualquer screenshot.
- Se o servidor já estiver rodando, não iniciar uma segunda instância.

## Fluxo de Screenshot
- Sempre tirar screenshot via localhost: `http://localhost:3000`
- Analisar a imagem e comparar com a referência/expectativa.
- Ser específico nas comparações: espaçamento/padding, tamanho/peso/line-height da fonte, cores (hex exato), alinhamento, border-radius, sombras, tamanho das imagens.

## Stack de Desenvolvimento
- **HTML5 / CSS3 / JavaScript ES6+ vanilla** — HTML e CSS sempre em arquivos separados.
- **GSAP** para animações e scroll reveal.
- **SwiperJS** para sliders/carrosséis (pacotes em destaque, galeria, depoimentos).
- **Sanity** como CMS headless (pacotes, destinos, promoções, blog, depoimentos, dados institucionais).
- **Supabase** como backend (reservas, clientes, formulários, histórico).
- **Mercado Pago ou Asaas** para pagamentos — nunca processar/armazenar dados de cartão no frontend/backend próprio.
- **Vercel** para hospedagem/deploy.
- Fonte via Google Fonts conforme definido no projeto-guide.md.
- Imagens placeholder até assets reais existirem: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsivo (desktop, notebook, tablet, mobile).
- CSS customizado (tokens, overrides de marca) sempre em arquivos separados (`tokens.css`).

## Assets do Projeto
- Sempre verificar a pasta `assets/` antes de começar.
- Se assets existirem, usá-los. Não usar placeholders onde há assets reais.
- Cores: usar apenas os tokens definidos em `instrucoes/projeto-guide.md`. Nunca inventar cores.

## Guardrails Anti-Genérico
- **Cores:** usar exclusivamente os tokens do design system do projeto. Nunca paletas padrão de frameworks.
- **Sombras:** nunca sombra flat. Usar sombras em camadas, com tint de cor e baixa opacidade.
- **Tipografia:** tracking negativo em headings grandes, line-height generoso no body. Nunca misturar fontes não definidas.
- **Animações:** animar apenas `transform` e `opacity`. Nunca `transition-all`. Easing suave (GSAP).
- **Estados interativos:** todo elemento clicável precisa de hover, focus-visible e active. Sem exceções.
- **Espaçamento:** usar tokens de `tokens.css`, não valores aleatórios.
- **Profundidade:** sistema de camadas (base → elevado → flutuante) em cards e modais.

## SEO Técnico (obrigatório por página)
Title, Meta Description, Canonical, Open Graph, Twitter Cards, Schema.org, Breadcrumb, Robots, Sitemap, URLs amigáveis.

## Segurança
- Sanitizar e validar todos os formulários (front + back).
- Variáveis de ambiente para chaves/segredos — nunca hardcoded.
- Nunca armazenar dados de cartão ou financeiros — tudo via gateway.
- Headers seguros e proteção CSRF nas rotas de formulário/reserva.

## Regras Absolutas
- Não adicionar seções, features ou conteúdo que não estejam na estrutura definida no PRD (`instrucoes/projeto-guide.md`)
- Não "melhorar" a estrutura de conteúdo do PRD por conta própria — validar com o usuário antes de qualquer desvio
- Não parar após um único screenshot de verificação
- Não usar `transition-all`
- HTML e CSS sempre em arquivos separados
- Não inventar cores fora dos tokens
- Fora de escopo V1: área do cliente, fidelidade, app, chat interno, marketplace, multiempresa, múltiplos idiomas, afiliados

## Fluxo de Desenvolvimento por Página
1. Invocar a skill `frontend-design`
2. Verificar `screenshots/referencias/` como inspiração visual (se houver)
3. **Apresentar plano de ação** — seções, ordem de execução, componentes. Aguardar aprovação antes de escrever código.
4. Após aprovação: criar a página (começar sempre pelo Style Guide)
5. Após cada seção: tirar screenshot, comparar, corrigir diferenças
6. Repetir para cada página
