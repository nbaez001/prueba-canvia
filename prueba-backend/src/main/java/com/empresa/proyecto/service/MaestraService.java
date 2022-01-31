package com.empresa.proyecto.service;

import java.util.List;

import com.empresa.proyecto.dto.request.MaestraBuscar;
import com.empresa.proyecto.dto.response.Maestra;
import com.empresa.proyecto.dto.response.OutResponse;

public interface MaestraService {

	public OutResponse<List<Maestra>> listarMaestra(MaestraBuscar c);
}
