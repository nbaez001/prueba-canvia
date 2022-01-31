package com.empresa.proyecto.dto.response;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class FacturaDetalle implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private Double precio;
	private Double cantidad;
	private Double subTotal;
	private String codigo;
	private String nombre;

	private Long idUsuarioCrea;
	private Long idUsuarioMod;

}
