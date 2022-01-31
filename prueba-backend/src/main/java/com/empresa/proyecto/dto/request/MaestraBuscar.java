package com.empresa.proyecto.dto.request;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MaestraBuscar implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer idTabla;
}
