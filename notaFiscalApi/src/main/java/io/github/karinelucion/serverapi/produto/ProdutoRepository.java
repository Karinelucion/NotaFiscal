package io.github.karinelucion.serverapi.produto;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.RequestScoped;

@RequestScoped
public class ProdutoRepository implements PanacheRepository<Produto> {
}
