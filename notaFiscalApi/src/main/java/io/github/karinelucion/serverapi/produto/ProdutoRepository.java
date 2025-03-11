package io.github.karinelucion.serverapi.produto;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.RequestScoped;
import java.util.List;

@RequestScoped
public class ProdutoRepository implements PanacheRepository<Produto> {
    public List<Produto> buscarPorDescricao(String descricao) {
        return find("LOWER(descricao) LIKE LOWER(?1)", "%" + descricao.toLowerCase() + "%").list();
    }

}
