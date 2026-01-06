HairHub - Sistema de Agendamento Web para Barbearias

O HairHub é um sistema web de agendamento desenvolvido com o objetivo de criar uma base sólida, simples e escalável para o gerenciamento de horários em barbearias e pequenos negócios de serviços. O projeto foi pensado desde o início para evoluir de uma aplicação local para uma solução online completa, respeitando boas práticas de organização de código e separação de responsabilidades.

A aplicação foi construída utilizando tecnologias web puras, priorizando clareza, controle total da lógica e facilidade de manutenção. Todo o fluxo de agendamento — da escolha do serviço até o armazenamento dos dados — é tratado de forma estruturada, evitando dependências excessivas e permitindo fácil migração para um backend mais robusto no futuro.

Arquitetura e Abordagem Técnica

O projeto segue uma arquitetura modular, onde cada parte do sistema possui uma responsabilidade bem definida:

- O Frontend é desenvolvido com HTML5, CSS3 e JavaScript puro, sem frameworks, permitindo total controle da lógica de interface e do fluxo de dados.
- O estado da aplicação e os agendamentos são gerenciados por um módulo central (storage.js), que atua como um banco de dados temporário local, facilitando testes, validações e simulações reais de uso.
- A separação entre criação, listagem e cancelamento de agendamentos garante que o sistema permaneça organizado, legível e pronto para escalar.

A lógica de horários foi construída respeitando regras reais de negócio, como intervalos fixos de atendimento e prevenção de conflitos, garantindo consistência mesmo sem um banco de dados externo.

Backend e Preparação para Escala

O HairHub já possui uma estrutura de backend em Node.js, criada para permitir a futura migração dos dados locais para um banco de dados real. Essa abordagem permite que o sistema funcione hoje de forma simples, mas já esteja preparado para:

- Persistência em banco de dados
- Autenticação de usuários
- Integração com APIs externas
-Publicação em ambientes de produção

O backend foi organizado com foco em clareza e compatibilidade com plataformas de deploy modernas, como Render, facilitando a publicação online e testes em ambiente real.

Tecnologias Utilizadas

- HTML5 - estrutura da aplicação
- CSS3 - layout, responsividade e experiência visual
- JavaScript (Vanilla JS) - lógica de negócio e manipulação de dados
- Node.js - backend e preparação para API
- Git & GitHub - versionamento e controle do projeto
- LocalStorage - persistência temporária de dados no frontend
- Render - ambiente de deploy para o backend

Visão do Projeto

O HairHub não é apenas um sistema de agendamento funcional, mas um projeto em evolução, desenvolvido com foco em aprendizado prático, arquitetura limpa e preparação para crescimento. Ele foi pensado para ser expandido gradualmente, sem refatorações complexas, mantendo uma base estável e compreensível.

Resumo

O HairHub é um sistema web de agendamento construído com JavaScript puro e Node.js, focado em organização, controle de horários e escalabilidade. A aplicação já funciona de forma completa em ambiente local, com estrutura preparada para backend e publicação online, servindo como base sólida para futuras integrações, autenticação de usuários e persistência em banco de dados real.
