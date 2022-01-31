package com.empresa.proyecto.dto.response;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Factura implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private Long idCliente;
	private String nroComprobante;
	private Double monto;
	private Date fecha;

	private List<FacturaDetalle> listaDetalle;

	private Integer flgActivo;
	private String nomCliente;
	private Long idUsuarioCrea;
	private Long idUsuarioMod;

}
