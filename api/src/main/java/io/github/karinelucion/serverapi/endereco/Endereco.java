package io.github.karinelucion.serverapi.endereco;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Entity
@Table(name = "endereco")
@SequenceGenerator(name = "seq_endereco", sequenceName = "seq_endereco", allocationSize = 1)
public class Endereco {
    @Id
    @GeneratedValue(generator = "seq_endereco", strategy = GenerationType.SEQUENCE)
    @Column(name = "enderecoid")
    private long id;

    @NotNull
    @Size(max = 8)
    @Column(name = "cep")
    private String cep;

    @NotNull
    @Size(max = 255)
    @Column(name = "logradouro")
    private String logradouro;

    @Size(max = 255)
    @Column(name = "complemento")
    private String complemento;

    @Size(max = 100)
    @Column(name = "bairro")
    private String bairro;

    @Size(max = 100)
    @Column(name = "cidade")
    @NotNull
    private String localidade;

    @Size(max = 2)
    @Column(name = "uf")
    @NotNull
    private String uf;

    @Size(max = 10)
    @Column(name = "numero")
    private String numero;
}