package com.empresa.proyecto.dto.response;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Maestra implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer idItem;
	private Integer idTabla;
	private String codigo;
	private String nombre;
	private String descripcion;

}
