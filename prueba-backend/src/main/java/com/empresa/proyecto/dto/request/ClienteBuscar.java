package com.empresa.proyecto.dto.request;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ClienteBuscar implements Serializable {
	private static final long serialVersionUID = 1L;

	private String nombre;
	private Integer flgActivo;
	private Integer index;
	private Integer size;

}
