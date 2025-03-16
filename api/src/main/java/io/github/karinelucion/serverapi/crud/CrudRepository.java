package io.github.karinelucion.serverapi.crud;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

import javax.enterprise.context.RequestScoped;
import java.util.List;

@RequestScoped
public class CrudRepository<T> implements PanacheRepositoryBase<T, Long> {

    public List<T> buscarPorCampo(String campo, String valor) {
        return find(String.format("LOWER(%s) LIKE LOWER(?1)", campo), "%" + valor.toLowerCase() + "%").list();
    }

    public List<T> buscarPorValorExato(String campo, Object valor) {
        return find(campo + " = ?1", valor).list();
    }
}
