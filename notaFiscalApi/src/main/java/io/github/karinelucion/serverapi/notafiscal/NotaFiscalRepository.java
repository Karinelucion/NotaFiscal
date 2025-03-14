package io.github.karinelucion.serverapi.notafiscal;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.RequestScoped;

@RequestScoped
public class NotaFiscalRepository implements PanacheRepository<NotaFiscal> {
    public NotaFiscal findByIdWithItens(Long id) {
        return find("SELECT n FROM NotaFiscal n LEFT JOIN FETCH n.itens WHERE n.id = ?1", id).firstResult();
    }
}
