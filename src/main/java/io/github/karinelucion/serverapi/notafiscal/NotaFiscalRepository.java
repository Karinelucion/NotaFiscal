package io.github.karinelucion.serverapi.notafiscal;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.RequestScoped;

@RequestScoped
public class NotaFiscalRepository implements PanacheRepository<NotaFiscal> {
}
