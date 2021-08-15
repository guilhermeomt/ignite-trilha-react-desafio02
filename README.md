O segundo desafio consistiu em implementar uma série de funcionalidades que estavam faltando em uma aplicação React, visando aplicar os conceitos aprendidos durante o segundo módulo. A aplicação (Rocketshoes) é uma página simples que simula um ecommerce, na qual o usuário pode adicionar e remover produtos do carrinho.

<img src=".github/assets/preview.gif" />

Para solucionar o desafio, foi necessário implementar um hook [```useCart```](src/hooks/useCart.tsx) para gerenciar todas as ações relacionadas ao carrinho e fornecer, aos componentes e páginas da aplicação, maneiras de manipular o carrinho. Dentre estas ações, podemos citar a função ```addProduct```, que é responsável por adicionar um produto ao carrinho, no entanto, antes de adicionar é necessário realizar algumas verificações:

- O produto não pode ser adicionado caso a quantidade no carrinho ultrapasse a quantidade existente desse produto no estoque (Obs.: A quantidade do estoque é obtida através de uma chamada à API)
- Se o produto já não está no carrinho deve-se incrementá-lo e, caso não esteja, adicioná-lo

Vale ressaltar que dentro do hook [```useCart```](src/hooks/useCart.tsx) está o contexto ```CartContext```, que, por sua vez, possui o intuito de compartilhar os estados e funções referentes ao carrinho entre todos os componentes da aplicação.

Com o hook pronto, bastou implementar o código dos componentes e das páginas associados ao uso do [```useCart```](src/hooks/useCart.tsx).


